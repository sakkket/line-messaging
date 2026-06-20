import { Controller, Get, HttpCode, Logger, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import type { webhook } from '@line/bot-sdk';
import { LineDeliveryService } from '../delivery/line-delivery.service';
import { LineProducerService } from '../producer/line-producer.service';

interface LineWebhookBody {
  destination?: string;
  events?: webhook.Event[];
}

@Controller()
export class LineWebhookController {
  private readonly logger = new Logger(LineWebhookController.name);

  constructor(
    private readonly producer: LineProducerService,
    private readonly delivery: LineDeliveryService,
  ) {}

  @Get()
  healthCheck(): string {
    return 'LINE NestJS webhook server is running';
  }

  @Post('webhook')
  @HttpCode(200)
  async webhook(@Req() request: Request): Promise<{ ok: true }> {
    const body = request.body as LineWebhookBody;
    const events = body.events ?? [];

    this.logWebhookRequest(request, body, events);

    await Promise.all(events.map((event) => this.handleEvent(event)));

    return { ok: true };
  }

  private async handleEvent(event: webhook.Event): Promise<void> {
    const messages = await this.producer.createReplyMessages(event);

    if (messages.length === 0 || !('replyToken' in event) || !event.replyToken) {
      return;
    }

    try {
      await this.delivery.reply(event.replyToken, messages);
    } catch (error) {
      this.logger.error('Failed to reply to LINE event', error);
    }
  }

  private logWebhookRequest(
    request: Request,
    body: LineWebhookBody,
    events: webhook.Event[],
  ): void {
    const signature = request.header('x-line-signature');

    this.logger.log(
      `LINE webhook received: destination=${body.destination ?? 'unknown'}, events=${events.length}, signature=${
        signature ? 'present' : 'missing'
      }`,
    );

    events.forEach((event, index) => {
      this.logger.log(`LINE webhook event[${index}]: ${JSON.stringify(event, null, 2)}`);
    });
  }
}
