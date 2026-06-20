# LINE Messaging API — NestJS TypeScript App

NestJS refactor of the original LINE Messaging API proof of concept.

The app is split into three service boundaries:

| Area | Responsibility |
|------|----------------|
| `consumer` | Receives and validates LINE webhook events at `POST /webhook` |
| `producer` | Converts LINE events into reply/push message payloads |
| `delivery` | Sends messages through the LINE Messaging API |

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

- `CHANNEL_ACCESS_TOKEN` — LINE console → your channel → Messaging API tab
- `CHANNEL_SECRET` — LINE console → your channel → Basic settings
- `TARGET_USER_ID` — your LINE user ID for push-message testing

## Run the Webhook Consumer

```bash
npm run start:dev
```

Expose the local server when testing with LINE:

```bash
npx ngrok http 3000
```

Then set the LINE webhook URL to:

```text
https://your-ngrok-domain.ngrok-free.app/webhook
```

The webhook validates `X-Line-Signature`, logs source details, and replies to text messages with an echo plus the sender's LINE user ID.

## Send the Flex Message

```bash
npm run send:flex
```

This uses the same Nest dependency graph, asks the producer for the Flex Message payload, and asks the delivery service to push it to `TARGET_USER_ID`.

## Build and Check

```bash
npm run typecheck
npm run build
```

## Project Structure

```text
src/
├── main.ts                         # Nest HTTP bootstrap and LINE middleware setup
├── send-flex.ts                    # CLI-style push message entry point
├── config/
│   ├── line.config.ts              # Environment loading and validation
│   └── line-config.service.ts      # Injectable LINE runtime config
├── consumer/
│   └── line-webhook.controller.ts  # Webhook HTTP edge
├── producer/
│   ├── line-producer.service.ts    # Event-to-message business logic
│   └── messages/flex-message.ts    # Reusable Flex Message payload
└── delivery/
    └── line-delivery.service.ts    # LINE Messaging API client wrapper
```

## Useful Links

- [Flex Message overview](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/)
- [Flex Message elements reference](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/)
- [Flex Message Simulator](https://developers.line.biz/flex-simulator/)
- [Push message API](https://developers.line.biz/en/reference/messaging-api/#send-push-message)
