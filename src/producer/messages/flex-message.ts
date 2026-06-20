import type { messagingApi } from '@line/bot-sdk';

export const flexMessage: messagingApi.FlexMessage = {
  type: 'flex',
  altText: 'Hello from LINE Flex Message!',
  contents: {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXJ8ZW58MHx8fHwxNzgxODUwOTIwfDA&ixlib=rb-4.1.0&fit=max&q=80',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          type: 'text',
          text: 'LINE Flex Message POC',
          weight: 'bold',
          size: 'xl',
          color: '#1DB446',
        },
        {
          type: 'text',
          text: 'This card was sent via the LINE Messaging API using NestJS.',
          wrap: true,
          color: '#666666',
          size: 'sm',
        },
        {
          type: 'separator',
          margin: 'md',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'md',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: 'Saket',
                  color: '#888888',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: 'Learning LINE',
                  size: 'sm',
                  color: '#111111',
                  flex: 2,
                  weight: 'bold',
                },
              ],
            },
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: 'Runtime',
                  color: '#888888',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: 'NestJS + TypeScript',
                  size: 'sm',
                  color: '#111111',
                  flex: 2,
                  weight: 'bold',
                },
              ],
            },
          ],
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          style: 'primary',
          color: '#1DB446',
          action: {
            type: 'uri',
            label: 'LINE Developers Docs',
            uri: 'https://developers.line.biz/en/docs/messaging-api/',
          },
        },
      ],
    },
  },
};
