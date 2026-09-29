import type { ServiceTicket, RentalContract, AMCContract, Product } from "@/types"

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

// ──────────────────────────────────────────────────────────────
// Service Tickets
// ──────────────────────────────────────────────────────────────

export async function getServiceTickets(): Promise<ServiceTicket[]> {
  await delay()
  return [
    {
      id: "TKT-1042",
      ticketNumber: "TKT-1042",
      customerId: "CUST-001",
      customerName: "Apex Corporation",
      issue: "Server Rack Cooling Failure",
      assetName: "Enterprise Server Rack Alpha",
      technicianName: "Mike Johnson",
      priority: "high",
      status: "in_progress",
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "TKT-1043",
      ticketNumber: "TKT-1043",
      customerId: "CUST-002",
      customerName: "Global Tech Solutions",
      issue: "Network Switch Configuration",
      technicianName: "Sarah Connor",
      priority: "medium",
      status: "assigned",
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "TKT-1044",
      ticketNumber: "TKT-1044",
      customerId: "CUST-004",
      customerName: "Nexus Trading",
      issue: "Routine Maintenance",
      priority: "low",
      status: "created",
      createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}

// ──────────────────────────────────────────────────────────────
// Rentals
// ──────────────────────────────────────────────────────────────

export async function getRentalContracts(): Promise<RentalContract[]> {
  await delay()
  return [
    {
      id: "RNT-331",
      contractNumber: "RNT-331",
      customerId: "CUST-001",
      customerName: "Apex Corporation",
      equipment: "Heavy Duty Generator 500kVA",
      startDate: new Date(Date.now() - 15 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 15 * 86400000).toISOString(),
      periodType: "monthly",
      ratePerPeriod: 12000,
      status: "active",
      createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "RNT-332",
      contractNumber: "RNT-332",
      customerId: "CUST-003",
      customerName: "Summit Industries",
      equipment: "Forklift Series X",
      startDate: new Date(Date.now() - 5 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 2 * 86400000).toISOString(),
      periodType: "weekly",
      ratePerPeriod: 1500,
      status: "expiring_soon",
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "RNT-333",
      contractNumber: "RNT-333",
      customerId: "CUST-005",
      customerName: "BuildRight Const.",
      equipment: "Scaffolding Tower Sets (10x)",
      startDate: new Date(Date.now() + 5 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 35 * 86400000).toISOString(),
      periodType: "monthly",
      ratePerPeriod: 3500,
      status: "quotation",
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}

// ──────────────────────────────────────────────────────────────
// AMCs
// ──────────────────────────────────────────────────────────────

export async function getAMCContracts(): Promise<AMCContract[]> {
  await delay()
  return [
    {
      id: "AMC-120",
      contractNumber: "AMC-120",
      customerId: "CUST-001",
      customerName: "Apex Corporation",
      equipment: "Data Center Cooling System",
      planName: "Platinum Support 24/7",
      startDate: new Date(Date.now() - 200 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 165 * 86400000).toISOString(),
      annualValue: 45000,
      visitFrequency: 12,
      visitsDone: 6,
      status: "active",
      nextVisitDate: new Date(Date.now() + 15 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 210 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "AMC-121",
      contractNumber: "AMC-121",
      customerId: "CUST-002",
      customerName: "Global Tech Solutions",
      equipment: "Office Workstations (50x)",
      planName: "Standard NBD Support",
      startDate: new Date(Date.now() - 350 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 15 * 86400000).toISOString(),
      annualValue: 12000,
      visitFrequency: 4,
      visitsDone: 4,
      status: "expiring",
      createdAt: new Date(Date.now() - 360 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "AMC-115",
      contractNumber: "AMC-115",
      customerId: "CUST-003",
      customerName: "Summit Industries",
      equipment: "Industrial HVAC System",
      planName: "Gold Support",
      startDate: new Date(Date.now() - 400 * 86400000).toISOString(),
      endDate: new Date(Date.now() - 35 * 86400000).toISOString(),
      annualValue: 28000,
      visitFrequency: 4,
      visitsDone: 4,
      status: "expired",
      createdAt: new Date(Date.now() - 410 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}

// ──────────────────────────────────────────────────────────────
// Inventory
// ──────────────────────────────────────────────────────────────

export async function getInventory(): Promise<Product[]> {
  await delay()
  return [
    {
      id: "PRD-001",
      sku: "HW-SVR-01",
      name: "Enterprise Server Rack",
      category: "Hardware",
      unitPrice: 15000,
      costPrice: 11000,
      stock: 12,
      minStock: 5,
      status: "in_stock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "PRD-002",
      sku: "HW-LPT-05",
      name: "Developer Laptop Pro",
      category: "Hardware",
      unitPrice: 2500,
      costPrice: 1800,
      stock: 4,
      minStock: 10,
      status: "low_stock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "PRD-003",
      sku: "SW-LIC-01",
      name: "Cloud Storage License (1TB)",
      category: "Software",
      unitPrice: 120,
      costPrice: 50,
      stock: 999,
      minStock: 0,
      status: "in_stock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "PRD-004",
      sku: "SP-CBL-10",
      name: "Cat6 Ethernet Cable (100m)",
      category: "Spare Parts",
      unitPrice: 85,
      costPrice: 40,
      stock: 0,
      minStock: 50,
      status: "out_of_stock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}
