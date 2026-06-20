import { Injectable, Logger } from '@nestjs/common';
import * as line from '@line/bot-sdk';
import { LineConfigService } from '../config/line-config.service';

type LineMessage = line.messagingApi.Message;

@Injectable()
export class LineDeliveryService {
  private readonly logger = new Logger(LineDeliveryService.name);
  private readonly client: line.messagingApi.MessagingApiClient;

  constructor(config: LineConfigService) {
    this.client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: config.channelAccessToken,
    });
  }

  async showLoadingAnimation(userId: string){
    await this.client.showLoadingAnimation({
      chatId: userId,
      loadingSeconds: 20,
    });
  }

  async reply(replyToken: string, messages: LineMessage[]): Promise<void> {
    await this.client.replyMessage({ replyToken, messages });
  }

  async push(to: string, messages: LineMessage[]): Promise<void> {
    const response = await this.client.pushMessage({ to, messages });
    const messageIds = response.sentMessages.map((message) => message.id).join(', ');
    this.logger.log(`Pushed LINE message(s): ${messageIds}`);
  }
}
