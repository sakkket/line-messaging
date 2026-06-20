# LINE Messaging API — Developer Setup Guide

A step-by-step guide for setting up LINE as a developer, creating a channel, obtaining credentials, and sending your first Flex Message using Node.js.

---

## 1. Create a LINE Developer Account

Go to [https://developers.line.biz/console/](https://developers.line.biz/console/) and sign in with your LINE account (or create a free LINE account first at line.me).

> **Note:** As of 2025, you can no longer create a Messaging API channel directly from the LINE Developers Console. The console will redirect you with the following message:
>
> *"It's no longer possible to create Messaging API channels directly from the LINE Developers Console. To create a Messaging API channel, create a LINE Official Account using the Create a LINE Official Account button, and then enable the use of the Messaging API on the LINE Official Account Manager."*
>
> The flow now goes through **LINE Official Account Manager** first.

---

## 2. Create a LINE Official Account

1. From the LINE Developers Console redirect page, click **"Create a LINE Official Account"**  
   — or go directly to [https://manager.line.biz/](https://manager.line.biz/)

2. Fill in the account details:
   - **Account name** — your bot's display name
   - **Business type / industry** — select the closest category
   - **Email address** — for notifications

3. Complete the registration. You now have a **LINE Official Account** — this becomes your bot.

---

## 3. Enable the Messaging API

Once inside LINE Official Account Manager ([manager.line.biz](https://manager.line.biz/)):

1. Select your account from the dashboard
2. Go to **Settings** (top-right gear icon)
3. Navigate to **Messaging API** in the left sidebar
4. Click **"Enable Messaging API"**
5. You will be prompted to **link or create a Provider** — a Provider is a grouping entity (e.g., your company or project name)
   - Create a new provider or select an existing one
6. Confirm — this creates a **Messaging API Channel** linked to your Official Account

After enabling, you will be redirected to the **LINE Developers Console** where your channel is now visible.

---

## 4. Obtain Credentials

All credentials are found in the **LINE Developers Console** at [https://developers.line.biz/console/](https://developers.line.biz/console/).

Select your **Provider → Channel**, then:

### Channel Secret
- Tab: **Basic settings**
- Field: **"Channel secret"**
- Copy the value — this is `CHANNEL_SECRET`

### Channel Access Token
- Tab: **Messaging API**
- Scroll to **"Channel access token (long-lived)"**
- Click **"Issue"** to generate it (done only once)
- Copy the value — this is `CHANNEL_ACCESS_TOKEN`

### Your LINE User ID (to receive push messages)
- Tab: **Basic settings**
- Scroll to the bottom
- Field: **"Your user ID"** — this is the LINE user ID of the account that owns the developer account
- Copy the value — this is `TARGET_USER_ID`

> This is your personal LINE account ID. To receive push messages sent to this ID, you must **add your Official Account as a friend** on LINE (use the QR code in the Messaging API tab).

---

## 5. Send Your First Flex Message (Node.js)

### Project Structure

```
LineMessaging/
├── send-flex.js       # Sends a Flex Message via push API
├── webhook.js         # Receives LINE events, echoes messages, prints user IDs
├── .env               # Your credentials (not committed to git)
├── .env.example       # Credential template
└── package.json
```

### Install Dependencies

```bash
npm install
```

Dependencies used:
- `@line/bot-sdk` — official LINE SDK for Node.js
- `dotenv` — loads credentials from `.env`
- `express` — used by `webhook.js`

### Configure `.env`

```bash
cp .env.example .env
```

```env
CHANNEL_ACCESS_TOKEN=your_channel_access_token_here
CHANNEL_SECRET=your_channel_secret_here
TARGET_USER_ID=your_line_user_id_here
```

### Run

```bash
node send-flex.js
```

If everything is configured correctly, you will see:

```
✅  Flex message sent!
   Request ID: <message-id>
```

And a Flex Message card will arrive in your LINE app.

---

## 6. What is a Flex Message?

Flex Messages are richly formatted messages built from a JSON layout tree. They render as interactive cards with images, text, buttons, and more.

```
bubble (container)
├── hero    → full-width image
├── body    → text, separators, key-value rows
└── footer  → action buttons (URI, postback, etc.)
```

Use the [LINE Flex Message Simulator](https://developers.line.biz/flex-simulator/) to design and preview layouts visually before coding them.

---

## 7. POC Code

> 📎 **[Attach zip file here: `line-messaging-poc.zip`]**  
> *(contains: `send-flex.js`, `webhook.js`, `.env.example`, `package.json`)*

---

## Reference Links

| Resource | URL |
|----------|-----|
| LINE Developers Console | https://developers.line.biz/console/ |
| LINE Official Account Manager | https://manager.line.biz/ |
| Messaging API getting started | https://developers.line.biz/en/docs/messaging-api/getting-started/ |
| Flex Message overview | https://developers.line.biz/en/docs/messaging-api/using-flex-messages/ |
| Flex Message Simulator | https://developers.line.biz/flex-simulator/ |
| Push message API reference | https://developers.line.biz/en/reference/messaging-api/#send-push-message |
