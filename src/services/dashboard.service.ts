// ──────────────────────────────────────────────────────────────
// Dashboard Service — mock data with typed interfaces
// Swap mock functions for apiClient calls when backend is ready
// ──────────────────────────────────────────────────────────────

import type {
  DashboardKPIs,
  RevenueDataPoint,
  PipelineDataPoint,
  TicketStatusDataPoint,
  ActivityItem,
} from '@/types'

// Simulated network delay (remove for production)
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  await delay()
  return {
    totalRevenue: 245890,
    revenueGrowth: 12.4,
    totalSales: 112450,
    salesGrowth: 8.1,
    activeServiceTickets: 134,
    urgentTickets: 45,
    activeRentals: 88,
    expiringRentals: 5,
    activeAMC: 56,
    expiringAMC: 3,
    pendingPayments: 18230,
    overdueInvoices: 15,
  }
}

export async function getRevenueData(): Promise<RevenueDataPoint[]> {
  await delay()
  return [
    { month: 'Apr', revenue: 68000, sales: 42000 },
    { month: 'May', revenue: 82000, sales: 54000 },
    { month: 'Jun', revenue: 74000, sales: 48000 },
    { month: 'Jul', revenue: 91000, sales: 61000 },
    { month: 'Aug', revenue: 88000, sales: 58000 },
    { month: 'Sep', revenue: 112000, sales: 74000 },
  ]
}

export async function getPipelineData(): Promise<PipelineDataPoint[]> {
  await delay()
  return [
    { stage: 'New',          count: 58, value: 420000 },
    { stage: 'Qualified',    count: 92, value: 680000 },
    { stage: 'Proposal',     count: 67, value: 520000 },
    { stage: 'Negotiation',  count: 43, value: 380000 },
    { stage: 'Closed Won',   count: 82, value: 1120000 },
  ]
}

export async function getTicketStatusData(): Promise<TicketStatusDataPoint[]> {
  await delay()
  return [
    { status: 'In Progress',       count: 64,  color: 'hsl(205 80% 58%)' },
    { status: 'Resolved',          count: 44,  color: 'hsl(160 60% 45%)' },
    { status: 'Waiting for Parts', count: 15,  color: 'hsl(38 92% 58%)'  },
    { status: 'Created',           count: 11,  color: 'hsl(215 15% 55%)' },
  ]
}

export async function getRecentActivity(): Promise<ActivityItem[]> {
  await delay()
  return [
    { id: '1', type: 'lead',    title: 'New Lead Assigned',       description: "Apex Corp assigned to John Doe",      timestamp: new Date(Date.now() - 2 * 3600000).toISOString() },
    { id: '2', type: 'service', title: 'Ticket #1042 Resolved',   description: "Maintenance completed by Mike",       timestamp: new Date(Date.now() - 24 * 3600000).toISOString() },
    { id: '3', type: 'rental',  title: 'Rental Booking #331',     description: "Equipment dispatched to site",        timestamp: new Date(Date.now() - 4 * 24 * 3600000).toISOString() },
    { id: '4', type: 'amc',     title: 'AMC #120 Renewed',        description: "Contract extended for 12 months",    timestamp: new Date(Date.now() - 9 * 24 * 3600000).toISOString() },
    { id: '5', type: 'payment', title: 'Payment Received',        description: "$12,500 received from Apex Corp",    timestamp: new Date(Date.now() - 11 * 24 * 3600000).toISOString() },
  ]
}
