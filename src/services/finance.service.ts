import type { Quotation, Invoice, Payment } from "@/types"

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

// ──────────────────────────────────────────────────────────────
// Quotations
// ──────────────────────────────────────────────────────────────

export async function getQuotations(): Promise<Quotation[]> {
  await delay()
  return [
    {
      id: "QT-2026-001",
      quoteNumber: "QT-2026-001",
      customerId: "CUST-001",
      customerName: "Apex Corporation",
      subject: "Annual Server Maintenance Contract",
      items: [
        { productId: "SRV-01", productName: "Platinum Support Level", quantity: 1, unitPrice: 25000, total: 25000 }
      ],
      subtotal: 25000,
      tax: 2500,
      discount: 0,
      total: 27500,
      status: "approved",
      validUntil: new Date(Date.now() + 15 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "QT-2026-002",
      quoteNumber: "QT-2026-002",
      customerId: "CUST-005",
      customerName: "BuildRight Const.",
      subject: "Equipment Rental - 3 Months",
      items: [
        { productId: "RNT-01", productName: "Heavy Excavator", quantity: 2, unitPrice: 8000, total: 16000 }
      ],
      subtotal: 16000,
      tax: 1600,
      discount: 1000,
      total: 16600,
      status: "sent",
      validUntil: new Date(Date.now() + 5 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "QT-2026-003",
      quoteNumber: "QT-2026-003",
      customerId: "CUST-002",
      customerName: "Global Tech Solutions",
      subject: "Bulk Developer Hardware",
      items: [
        { productId: "HW-01", productName: "Laptops", quantity: 50, unitPrice: 2500, total: 125000 }
      ],
      subtotal: 125000,
      tax: 12500,
      discount: 5000,
      total: 132500,
      status: "expired",
      validUntil: new Date(Date.now() - 2 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 40 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}

// ──────────────────────────────────────────────────────────────
// Invoices
// ──────────────────────────────────────────────────────────────

export async function getInvoices(): Promise<Invoice[]> {
  await delay()
  return [
    {
      id: "INV-998",
      invoiceNumber: "INV-2026-0998",
      customerId: "CUST-001",
      customerName: "Apex Corporation",
      description: "Q3 Software Licensing",
      items: [
        { productId: "LIC-01", productName: "Enterprise License", quantity: 1, unitPrice: 12500, total: 12500 }
      ],
      subtotal: 12500,
      tax: 1250,
      discount: 0,
      total: 13750,
      status: "overdue",
      issuedDate: new Date(Date.now() - 45 * 86400000).toISOString(),
      dueDate: new Date(Date.now() - 15 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "INV-999",
      invoiceNumber: "INV-2026-0999",
      customerId: "CUST-002",
      customerName: "Global Tech Solutions",
      description: "Hardware Procurement",
      items: [
        { productId: "HW-05", productName: "Workstations", quantity: 10, unitPrice: 1500, total: 15000 }
      ],
      subtotal: 15000,
      tax: 1500,
      discount: 0,
      total: 16500,
      status: "sent",
      issuedDate: new Date(Date.now() - 5 * 86400000).toISOString(),
      dueDate: new Date(Date.now() + 25 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "INV-1000",
      invoiceNumber: "INV-2026-1000",
      customerId: "CUST-003",
      customerName: "Summit Industries",
      description: "Monthly AMC Charge",
      items: [
        { productId: "SRV-AMC", productName: "AMC Standard", quantity: 1, unitPrice: 2000, total: 2000 }
      ],
      subtotal: 2000,
      tax: 200,
      discount: 0,
      total: 2200,
      status: "paid",
      issuedDate: new Date(Date.now() - 15 * 86400000).toISOString(),
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString(),
      paidAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}

// ──────────────────────────────────────────────────────────────
// Payments
// ──────────────────────────────────────────────────────────────

export async function getPayments(): Promise<Payment[]> {
  await delay()
  return [
    {
      id: "PAY-501",
      paymentNumber: "RCG-2026-501",
      customerId: "CUST-003",
      customerName: "Summit Industries",
      invoiceId: "INV-1000",
      invoiceNumber: "INV-2026-1000",
      amount: 2200,
      method: "bank_transfer",
      status: "cleared",
      transactionRef: "TRX-8854-992",
      paidAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "PAY-502",
      paymentNumber: "RCG-2026-502",
      customerId: "CUST-004",
      customerName: "Nexus Trading",
      invoiceId: "INV-982",
      invoiceNumber: "INV-2026-0982",
      amount: 14500,
      method: "cheque",
      status: "pending",
      transactionRef: "CHQ-004521",
      paidAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "PAY-503",
      paymentNumber: "RCG-2026-503",
      customerId: "CUST-001",
      customerName: "Apex Corporation",
      invoiceId: "INV-950",
      invoiceNumber: "INV-2026-0950",
      amount: 45000,
      method: "card",
      status: "bounced",
      transactionRef: "STRIPE-err_992",
      paidAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}
