/**
 * webhook.js
 * POC: Minimal LINE webhook server — receives events and prints user IDs.
 *
 * Use this to discover your LINE user ID:
 *   1. Expose this server publicly via ngrok: npx ngrok http 3000
 *   2. Set the ngrok HTTPS URL as your Webhook URL in the LINE console
 *      (e.g. https://xxxx.ngrok-free.app/webhook)
 *   3. Enable "Use webhook" in the console
 *   4. Add your bot as a LINE friend and send it any message
 *   5. Your userId will be printed here — copy it into .env as TARGET_USER_ID
 *
 * Run: node webhook.js
 */

require("dotenv").config();
const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken,
});

const app = express();

// LINE middleware validates the X-Line-Signature header
app.post(
  "/webhook",
  line.middleware(config),
  (req, res) => {
    const events = req.body.events;

    events.forEach((event) => {
      console.log("\n📨  Event received:", event.type);

      if (event.source) {
        console.log("   Source type:", event.source.type);
        if (event.source.userId) {
          console.log("   ✅ userId:", event.source.userId);
          console.log("   👉 Copy this into your .env as TARGET_USER_ID");
        }
      }

      // Echo back whatever text the user sends (helpful for testing)
      if (event.type === "message" && event.message.type === "text") {
        client
          .replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: `Echo: ${event.message.text}\n\nYour userId: ${event.source.userId}`,
              },
            ],
          })
          .catch((err) => console.error("Reply error:", err.message));
      }
    });

    res.sendStatus(200);
  }
);

// Health check
app.get("/", (req, res) => res.send("LINE webhook server is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  Webhook server running at http://localhost:${PORT}/webhook`);
  console.log("   Next: expose with ngrok → npx ngrok http 3000");
});
