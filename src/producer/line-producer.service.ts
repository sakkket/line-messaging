import { Injectable, Logger } from '@nestjs/common';
import type { messagingApi, webhook } from '@line/bot-sdk';
import { flexMessage } from './messages/flex-message';
import { LlmResponseService } from 'src/llm/llm-response.service';

@Injectable()
export class LineProducerService {

  constructor(
    private readonly llmResponse: LlmResponseService
  ){}

  async createReplyMessages(event: webhook.Event): Promise<messagingApi.Message[]> {
    if (event.type === 'message' && event.message.type === 'text') {
      const userId = event.source?.userId ?? 'unknown';
      const llmResponse:string = await this.llmResponse.generateResponse(event.message.text);

      return [
        {
          type: 'text',
          text: llmResponse,
        },
      ];
    }

    return [];
  }

  createFlexPushMessage(): messagingApi.FlexMessage {
    return flexMessage;
  }
}
