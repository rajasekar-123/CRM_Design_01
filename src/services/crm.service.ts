import type { Customer, Lead, SalesOrder } from "@/types"

// Simulated network delay
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

// ──────────────────────────────────────────────────────────────
// Customers
// ──────────────────────────────────────────────────────────────

export async function getCustomers(): Promise<Customer[]> {
  await delay()
  return [
    {
      id: "CUST-001",
      name: "Apex Corporation",
      contactPerson: "Michael Scott",
      email: "m.scott@apexcorp.com",
      phone: "+1 (555) 123-4567",
      city: "New York",
      type: "enterprise",
      status: "active",
      totalBusiness: 1250000,
      createdAt: new Date(Date.now() - 40 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "CUST-002",
      name: "Global Tech Solutions",
      contactPerson: "Sarah Jenkins",
      email: "sarah.j@globaltech.io",
      phone: "+1 (555) 987-6543",
      city: "San Francisco",
      type: "sme",
      status: "active",
      totalBusiness: 84000,
      createdAt: new Date(Date.now() - 120 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "CUST-003",
      name: "Summit Industries",
      contactPerson: "David Palmer",
      email: "d.palmer@summit.net",
      phone: "+1 (555) 456-7890",
      city: "Chicago",
      type: "enterprise",
      status: "inactive",
      totalBusiness: 450000,
      createdAt: new Date(Date.now() - 300 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}

// ──────────────────────────────────────────────────────────────
// Leads
// ──────────────────────────────────────────────────────────────

export async function getLeads(): Promise<Lead[]> {
  await delay()
  return [
    {
      id: "LD-2024-001",
      name: "Emma Watson",
      company: "NextGen Dynamics",
      email: "emma@nextgen.com",
      source: "website",
      stage: "new",
      value: 25000,
      assignedTo: "John Doe",
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      id: "LD-2024-002",
      name: "James Smith",
      company: "BlueOcean Retail",
      email: "jsmith@blueocean.net",
      source: "referral",
      stage: "proposal",
      value: 120000,
      assignedTo: "Jane Smith",
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    {
      id: "LD-2024-003",
      name: "Priya Patel",
      company: "Innovate AI",
      email: "priya@innovate.ai",
      source: "linkedin",
      stage: "negotiation",
      value: 85000,
      assignedTo: "John Doe",
      createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    },
    {
      id: "LD-2024-004",
      name: "Robert Chen",
      company: "Stellar Logistics",
      email: "rchen@stellar.co",
      source: "exhibition",
      stage: "qualified",
      value: 45000,
      assignedTo: "Jane Smith",
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    }
  ]
}

// ──────────────────────────────────────────────────────────────
// Sales Orders
// ──────────────────────────────────────────────────────────────

export async function getSalesOrders(): Promise<SalesOrder[]> {
  await delay()
  return [
    {
      id: "SO-1001",
      orderNumber: "ORD-2026-1001",
      customerId: "CUST-001",
      customerName: "Apex Corporation",
      items: [
        { productId: "P1", productName: "Enterprise Server Rack", quantity: 2, unitPrice: 15000, total: 30000 }
      ],
      subtotal: 30000,
      tax: 3000,
      discount: 0,
      total: 33000,
      status: "processing",
      salesRep: "Jane Smith",
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "SO-1002",
      orderNumber: "ORD-2026-1002",
      customerId: "CUST-002",
      customerName: "Global Tech Solutions",
      items: [
        { productId: "P2", productName: "Developer Laptops (10x)", quantity: 1, unitPrice: 25000, total: 25000 }
      ],
      subtotal: 25000,
      tax: 2500,
      discount: 1000,
      total: 26500,
      status: "delivered",
      salesRep: "John Doe",
      createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "SO-1003",
      orderNumber: "ORD-2026-1003",
      customerId: "CUST-004",
      customerName: "Nexus Trading",
      items: [
        { productId: "P3", productName: "Office Networking Gear", quantity: 1, unitPrice: 8500, total: 8500 }
      ],
      subtotal: 8500,
      tax: 850,
      discount: 0,
      total: 9350,
      status: "confirmed",
      salesRep: "Jane Smith",
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}
