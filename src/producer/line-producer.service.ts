import { Injectable, Logger } from '@nestjs/common';
import type { messagingApi, webhook } from '@line/bot-sdk';
import { flexMessage } from './messages/flex-message';

@Injectable()
export class LineProducerService {
  createReplyMessages(event: webhook.Event): messagingApi.Message[] {
    if (event.type === 'message' && event.message.type === 'text') {
      const userId = event.source?.userId ?? 'unknown';

      return [
        {
          type: 'text',
          text: `Echo: ${event.message.text}\n\nYour userId: ${userId}`,
        },
      ];
    }

    return [];
  }

  createFlexPushMessage(): messagingApi.FlexMessage {
    return flexMessage;
  }
}
