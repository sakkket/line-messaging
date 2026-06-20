import { Injectable, Logger } from '@nestjs/common';
import type { messagingApi, webhook } from '@line/bot-sdk';
import { flexMessage } from './messages/flex-message';
import { LlmResponseService } from 'src/llm/llm-response.service';

@Injectable()
export class LineProducerService {
  private readonly logger = new Logger(LineProducerService.name);

  constructor(
    private readonly llmResponse: LlmResponseService
  ){}

  async createReplyMessages(event: webhook.Event): Promise<messagingApi.FlexMessage[]> {
    if (event.type === 'message' && event.message.type === 'text') {
      const userId = event.source?.userId ?? 'unknown';
      this.logger.log(`Sending user query:: ${event.message.text} to LLM userId:: ${userId}`);
      const llmResponse:string = await this.llmResponse.generateResponse(event.message.text);
      this.logger.log(`Received Response :: ${llmResponse} from LLM userId:: ${userId} user query:: ${event.message.text}`);
      return [
  {
    type: 'flex',
    altText: 'Saket Labs Assistant',
    contents: {
      type: 'bubble',
      size: 'giga',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: '🤖 Saket Labs Assistant',
            weight: 'bold',
            size: 'lg',
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'text',
            text: llmResponse,
            wrap: true,
            size: 'md',
            margin: 'md',
          },
        ],
      },
    },
  },
];
    }

    return [];
  }

  createFlexPushMessage(): messagingApi.FlexMessage {
    return flexMessage;
  }
}
