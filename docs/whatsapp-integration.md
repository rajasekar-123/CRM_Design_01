# WhatsApp Cloud API Integration Guide

This guide details the production architecture for the WhatsApp Cloud API integration implemented in this CRM.

## Architecture Overview

The system uses the **Meta WhatsApp Cloud API** (Graph API) to receive real-time webhooks and send messages to customers.

### Incoming Flow
`Customer WhatsApp` → `Meta Graph API` → `POST /api/v1/whatsapp/webhook` → `WhatsApp Service` → `PostgreSQL` → `CRM UI`

### Outgoing Flow
`CRM UI` → `WhatsApp Service` → `POST Meta Graph API` → `Customer WhatsApp`

---

## 1. Meta Business Setup

To make this integration functional, you must configure a Meta App.

1. Go to the [Meta for Developers](https://developers.facebook.com/) dashboard.
2. Create a new App of type **Business**.
3. Add the **WhatsApp** product to your app.
4. Inside the WhatsApp settings, click **API Setup** to obtain your temporary/permanent **Access Token**, **Phone Number ID**, and **WhatsApp Business Account ID**.

## 2. Environment Variables

Create or update your `.env` file in the root directory based on `.env.example`:

```env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_waba_id
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
WHATSAPP_VERIFY_TOKEN=your_custom_secure_string
META_APP_SECRET=your_app_secret_from_meta_dashboard
WHATSAPP_API_VERSION=v19.0
DATABASE_URL="postgresql://user:password@localhost:5432/crm"
```
> **Security Note:** Never expose these credentials to the frontend or commit them to version control.

## 3. Webhook Configuration

To receive incoming messages and delivery statuses:

1. In the Meta App Dashboard, navigate to **WhatsApp > Configuration**.
2. Click **Edit** under Webhooks.
3. Enter your Callback URL (e.g., `https://your-domain.com/api/v1/whatsapp/webhook`).
4. Enter the `WHATSAPP_VERIFY_TOKEN` you defined in your `.env`.
5. Subscribe to the `messages` webhook field.

> **Local Development:** Meta requires an HTTPS URL. Use a tool like **ngrok** (`ngrok http 3000`) to expose your local Next.js server, and use the ngrok URL in the Meta dashboard.

## 4. Database Setup (Prisma)

The application uses Prisma ORM to interact with the database.

1. Ensure dependencies are installed:
   ```bash
   npm install @prisma/client prisma
   ```
2. Apply the database migrations to create the required tables (`Customer`, `Lead`, `WhatsAppConversation`, `WhatsAppMessage`):
   ```bash
   npx prisma db push
   # OR for production: npx prisma migrate dev
   ```

## 5. Security & Features Implemented

* **Signature Validation:** Webhook requests are verified using `X-Hub-Signature-256` to prevent spoofing.
* **Lead Routing:** The `WhatsAppService` intercepts incoming messages and uses basic NLP parsing to automatically classify leads into `SALES`, `SERVICE`, `RENTAL`, or `AMC` based on message context.
* **De-duplication:** All incoming WhatsApp Message IDs are strictly enforced as unique in the database to prevent duplicate lead creation if Meta resends webhooks.
* **Graceful Fallbacks:** The `db.ts` client is wrapped in a try/catch block so that your application boots perfectly even if Prisma is not fully configured yet.
