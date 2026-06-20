/**
 * send-flex.js
 * POC: Send a LINE Flex Message using the Messaging API (push message)
 *
 * Prerequisites:
 *   1. Copy .env.example to .env and fill in your credentials
 *   2. Add your bot as a LINE friend to get a user ID via webhook.js
 *   3. Run: node send-flex.js
 */

require("dotenv").config();
const line = require("@line/bot-sdk");

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// ─── Flex Message Definition ──────────────────────────────────────────────────
// This is a "bubble" container — a single card-style message.
// Docs: https://developers.line.biz/en/docs/messaging-api/flex-message-elements/
const flexMessage = {
  type: "flex",
  altText: "Hello from LINE Flex Message!", // shown in notification / non-flex clients
  contents: {
    type: "bubble",
    hero: {
      type: "image",
      url: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXJ8ZW58MHx8fHwxNzgxODUwOTIwfDA&ixlib=rb-4.1.0&fit=max&q=80",
      size: "full",
      aspectRatio: "20:13",
      aspectMode: "cover",
    },
    body: {
      type: "box",
      layout: "vertical",
      spacing: "md",
      contents: [
        {
          type: "text",
          text: "LINE Flex Message POC",
          weight: "bold",
          size: "xl",
          color: "#1DB446",
        },
        {
          type: "text",
          text: "This card was sent via the LINE Messaging API using Node.js.",
          wrap: true,
          color: "#666666",
          size: "sm",
        },
        {
          type: "separator",
          margin: "md",
        },
        {
          type: "box",
          layout: "vertical",
          margin: "md",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: "Saket",
                  color: "#888888",
                  size: "sm",
                  flex: 1,
                },
                {
                  type: "text",
                  text: "Learning Line",
                  size: "sm",
                  color: "#111111",
                  flex: 2,
                  weight: "bold",
                },
              ],
            },
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: "Runtime",
                  color: "#888888",
                  size: "sm",
                  flex: 1,
                },
                {
                  type: "text",
                  text: "Node.js",
                  size: "sm",
                  color: "#111111",
                  flex: 2,
                  weight: "bold",
                },
              ],
            },
          ],
        },
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          style: "primary",
          color: "#1DB446",
          action: {
            type: "uri",
            label: "LINE Developers Docs",
            uri: "https://developers.line.biz/en/docs/messaging-api/",
          },
        },
      ],
    },
  },
};

// ─── Send the message ─────────────────────────────────────────────────────────
async function main() {
  const targetUserId = process.env.TARGET_USER_ID;

  if (!targetUserId || targetUserId === "your_line_user_id_here") {
    console.error(
      "❌  TARGET_USER_ID is not set.\n" +
        "   Start webhook.js, add your bot as a LINE friend, then send it a message.\n" +
        "   Your user ID will be printed in the webhook console."
    );
    process.exit(1);
  }

  try {
    const response = await client.pushMessage({
      to: targetUserId,
      messages: [flexMessage],
    });
    console.log("✅  Flex message sent!");
    console.log("   Request ID:", response.sentMessages[0].id);
  } catch (err) {
    console.error("❌  Failed to send message:", err.statusCode, err.originalError?.response?.data);
  }
}

main();
