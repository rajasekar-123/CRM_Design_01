import crypto from 'crypto';
import { db } from '../lib/db';

export class WhatsAppService {
  private readonly verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
  private readonly appSecret = process.env.META_APP_SECRET;
  private readonly accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  private readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  private readonly apiVersion = process.env.WHATSAPP_API_VERSION || 'v19.0';

  /**
   * Validate Meta webhook challenge
   */
  public verifyWebhook(mode: string, token: string, challenge: string): string | null {
    if (mode === 'subscribe' && token === this.verifyToken) {
      return challenge;
    }
    return null;
  }

  /**
   * Validate webhook payload signature using X-Hub-Signature-256
   */
  public validateSignature(payload: string, signature: string | null): boolean {
    if (!this.appSecret || !signature) return false;

    const hmac = crypto.createHmac('sha256', this.appSecret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    
    // Use timingSafeEqual to prevent timing attacks
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  }

  /**
   * Send outgoing WhatsApp Message (Template or Text)
   */
  public async sendMessage(to: string, messageData: any): Promise<any> {
    if (!this.accessToken || !this.phoneNumberId) {
      console.warn("WhatsApp credentials not configured. Skipping sendMessage.");
      return;
    }

    try {
      const response = await fetch(`https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          ...messageData,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Meta API Error:', data);
        throw new Error(data.error?.message || 'Meta API request failed');
      }
      return data;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  /**
   * Core Webhook Processor
   */
  public async processWebhook(body: any): Promise<void> {
    // Acknowledge webhook immediately, process in background or async
    try {
      if (body.object !== 'whatsapp_business_account') return;

      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.value && change.value.messages) {
            // Process Incoming Messages
            await this.processIncomingMessage(change.value);
          } else if (change.value && change.value.statuses) {
            // Process Status Updates (Sent, Delivered, Read, Failed)
            await this.processStatusUpdate(change.value);
          }
        }
      }
    } catch (error) {
      console.error('Error processing WhatsApp webhook:', error);
    }
  }

  /**
   * Handle incoming messages (Lead capture routing)
   */
  private async processIncomingMessage(value: any) {
    const message = value.messages[0];
    const contact = value.contacts?.[0];
    const phoneNumber = message.from;
    const whatsappMessageId = message.id;

    // 1. Deduplication check
    const existingMessage = await db.whatsAppMessage.findUnique({
      where: { whatsappMessageId }
    });
    if (existingMessage) return; // Already processed

    // 2. Identify or Create Customer
    let customer = await db.customer.findUnique({
      where: { phone: phoneNumber }
    });

    if (!customer) {
      customer = await db.customer.create({
        data: {
          name: contact?.profile?.name || phoneNumber,
          phone: phoneNumber,
          source: 'WHATSAPP'
        }
      });
    }

    // 3. Find or Create Conversation
    let conversation = await db.whatsAppConversation.findFirst({
      where: { customerId: customer.id }
    });

    if (!conversation) {
      conversation = await db.whatsAppConversation.create({
        data: {
          customerId: customer.id,
          phoneNumber,
          phoneNumberId: value.metadata?.phone_number_id,
        }
      });
    } else {
      await db.whatsAppConversation.update({
        where: { id: conversation.id },
        data: { lastMessageAt: new Date() }
      });
    }

    // 4. Store Message
    const text = message.type === 'text' ? message.text.body : '';
    await db.whatsAppMessage.create({
      data: {
        conversationId: conversation.id,
        whatsappMessageId,
        direction: 'INBOUND',
        messageType: message.type,
        messageText: text,
        status: 'RECEIVED',
        timestamp: new Date(parseInt(message.timestamp) * 1000)
      }
    });

    // 5. Intelligent Lead Capture Flow (Simple guided rule system)
    await this.handleLeadRouting(customer.id, phoneNumber, text);
  }

  /**
   * Handle Status Updates (Sent, Delivered, Read, Failed)
   */
  private async processStatusUpdate(value: any) {
    const statusObj = value.statuses[0];
    const whatsappMessageId = statusObj.id;
    const status = statusObj.status.toUpperCase(); // SENT, DELIVERED, READ, FAILED

    const message = await db.whatsAppMessage.findUnique({
      where: { whatsappMessageId }
    });

    if (message) {
      await db.whatsAppMessage.update({
        where: { id: message.id },
        data: { status }
      });
    }
  }

  /**
   * Basic NLP / Routing Logic for capturing Lead requirement
   */
  private async handleLeadRouting(customerId: string, phoneNumber: string, text: string) {
    const lowerText = text.toLowerCase();
    
    // Extremely basic intent classification
    let leadType = 'SALES'; // default
    if (lowerText.includes('service') || lowerText.includes('repair') || lowerText.includes('broken') || lowerText.includes('maintenance')) {
      leadType = 'SERVICE';
    } else if (lowerText.includes('rent') || lowerText.includes('lease')) {
      leadType = 'RENTAL';
    } else if (lowerText.includes('amc') || lowerText.includes('contract')) {
      leadType = 'AMC';
    }

    // Check if there is already a recent NEW lead for this customer
    const recentLeads = await db.lead.findFirst({
      where: { customerId, status: 'NEW' }
    });

    if (!recentLeads) {
      // Create new lead from WhatsApp
      await db.lead.create({
        data: {
          customerId,
          source: 'WHATSAPP',
          leadType,
          requirement: text.substring(0, 200), // snippet
          status: 'NEW',
          priority: 'normal'
        }
      });
    }
  }
}

export const whatsappService = new WhatsAppService();
