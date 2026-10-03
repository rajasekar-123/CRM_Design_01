import { NextResponse } from 'next/server';
import { whatsappService } from '@/services/whatsapp.service';

/**
 * GET - Meta Webhook Verification
 * Used when setting up the webhook in the Meta App Dashboard
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode && token && challenge) {
    const verifiedChallenge = whatsappService.verifyWebhook(mode, token, challenge);
    if (verifiedChallenge) {
      return new NextResponse(verifiedChallenge, { status: 200 });
    }
  }

  return NextResponse.json({ error: 'Invalid verification token' }, { status: 403 });
}

/**
 * POST - Receive Webhook Events from Meta
 */
export async function POST(request: Request) {
  try {
    // 1. Get raw body for signature validation
    const rawBody = await request.text();
    const signature = request.headers.get('x-hub-signature-256');

    // 2. Validate Signature
    const isValid = whatsappService.validateSignature(rawBody, signature);
    
    // In strict production, reject if !isValid.
    // However, if META_APP_SECRET is not configured locally, we might want to bypass or warn
    if (!isValid && process.env.NODE_ENV === 'production') {
      console.error('Invalid WhatsApp Webhook Signature detected.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 3. Parse and process payload
    const payload = JSON.parse(rawBody);
    
    // Acknowledge immediately (do not block the response)
    // In a fully scaled architecture, we would push this to BullMQ or Redis
    // For this implementation, we process it async without awaiting the final DB write
    whatsappService.processWebhook(payload).catch((err) => {
      console.error("Background webhook processing failed:", err);
    });

    return NextResponse.json({ status: 'ok' }, { status: 200 });

  } catch (error) {
    console.error('Failed to parse WhatsApp Webhook payload:', error);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
