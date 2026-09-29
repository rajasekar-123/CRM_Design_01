// ──────────────────────────────────────────────────────────────
// Core API response wrapper types
// ──────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

// ──────────────────────────────────────────────────────────────
// Shared primitive types
// ──────────────────────────────────────────────────────────────

export type ID = string

export interface Timestamps {
  createdAt: string
  updatedAt: string
}

export interface SoftDelete {
  deletedAt?: string | null
}

export interface AuditFields extends Timestamps {
  createdBy?: string
  updatedBy?: string
}

// ──────────────────────────────────────────────────────────────
// Common enums / union types
// ──────────────────────────────────────────────────────────────

export type PriorityLevel = 'low' | 'normal' | 'medium' | 'high' | 'urgent'

export type LeadSource =
  | 'website'
  | 'referral'
  | 'cold_call'
  | 'linkedin'
  | 'exhibition'
  | 'email'
  | 'other'

// ──────────────────────────────────────────────────────────────
// Customer
// ──────────────────────────────────────────────────────────────

export type CustomerType = 'enterprise' | 'sme' | 'individual' | 'government'
export type CustomerStatus = 'active' | 'inactive' | 'prospect' | 'churned'

export interface Customer extends Timestamps, SoftDelete {
  id: ID
  name: string
  contactPerson: string
  email: string
  phone: string
  alternatePhone?: string
  city: string
  state?: string
  country?: string
  address?: string
  type: CustomerType
  status: CustomerStatus
  totalBusiness: number
  notes?: string
}

// ──────────────────────────────────────────────────────────────
// Lead
// ──────────────────────────────────────────────────────────────

export type LeadStage =
  | 'new'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost'

export interface Lead extends Timestamps {
  id: ID
  name: string
  company: string
  email: string
  phone?: string
  source: LeadSource
  stage: LeadStage
  value: number
  currency?: string
  assignedTo?: string
  notes?: string
  customerId?: ID
  closedAt?: string
}

// ──────────────────────────────────────────────────────────────
// Sales Order
// ──────────────────────────────────────────────────────────────

export type OrderStatus = 'draft' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface SalesOrder extends Timestamps {
  id: ID
  orderNumber: string
  customerId: ID
  customerName: string
  items: OrderItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: OrderStatus
  salesRep?: string
  notes?: string
  deliveredAt?: string
}

export interface OrderItem {
  productId: ID
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

// ──────────────────────────────────────────────────────────────
// Quotation
// ──────────────────────────────────────────────────────────────

export type QuotationStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'expired' | 'converted'

export interface Quotation extends Timestamps {
  id: ID
  quoteNumber: string
  customerId: ID
  customerName: string
  subject: string
  items: OrderItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: QuotationStatus
  validUntil: string
  notes?: string
  convertedToOrderId?: ID
}

// ──────────────────────────────────────────────────────────────
// Inventory / Product
// ──────────────────────────────────────────────────────────────

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued'

export interface Product extends Timestamps {
  id: ID
  sku: string
  name: string
  category: string
  description?: string
  unitPrice: number
  costPrice: number
  stock: number
  minStock: number
  unit?: string
  status: StockStatus
}

// ──────────────────────────────────────────────────────────────
// Service
// ──────────────────────────────────────────────────────────────

export type TicketStatus =
  | 'created'
  | 'assigned'
  | 'accepted'
  | 'scheduled'
  | 'in_progress'
  | 'waiting_for_parts'
  | 'completed'
  | 'closed'

export interface ServiceTicket extends Timestamps {
  id: ID
  ticketNumber: string
  customerId: ID
  customerName: string
  issue: string
  description?: string
  assetId?: ID
  assetName?: string
  technicianId?: ID
  technicianName?: string
  priority: PriorityLevel
  status: TicketStatus
  scheduledDate?: string
  completedAt?: string
  sla?: string
  resolution?: string
}

// ──────────────────────────────────────────────────────────────
// Rental
// ──────────────────────────────────────────────────────────────

export type RentalStatus = 'enquiry' | 'quotation' | 'active' | 'expiring_soon' | 'completed' | 'terminated'
export type RentalPeriodType = 'daily' | 'weekly' | 'monthly'

export interface RentalContract extends Timestamps {
  id: ID
  contractNumber: string
  customerId: ID
  customerName: string
  equipment: string
  startDate: string
  endDate: string
  periodType: RentalPeriodType
  ratePerPeriod: number
  securityDeposit?: number
  status: RentalStatus
  notes?: string
}

// ──────────────────────────────────────────────────────────────
// AMC
// ──────────────────────────────────────────────────────────────

export type AMCStatus = 'active' | 'expiring' | 'expired' | 'renewed' | 'cancelled'

export interface AMCContract extends Timestamps {
  id: ID
  contractNumber: string
  customerId: ID
  customerName: string
  equipment: string
  planName?: string
  startDate: string
  endDate: string
  annualValue: number
  visitFrequency: number        // visits per year
  visitsDone: number
  status: AMCStatus
  nextVisitDate?: string
  notes?: string
}

// ──────────────────────────────────────────────────────────────
// Invoice
// ──────────────────────────────────────────────────────────────

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

export interface Invoice extends Timestamps {
  id: ID
  invoiceNumber: string
  customerId: ID
  customerName: string
  description: string
  items: OrderItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: InvoiceStatus
  issuedDate: string
  dueDate: string
  paidAt?: string
  notes?: string
}

// ──────────────────────────────────────────────────────────────
// Payment
// ──────────────────────────────────────────────────────────────

export type PaymentStatus = 'pending' | 'cleared' | 'bounced' | 'refunded'
export type PaymentMethod = 'bank_transfer' | 'cheque' | 'upi' | 'cash' | 'card'

export interface Payment extends Timestamps {
  id: ID
  paymentNumber: string
  customerId: ID
  customerName: string
  invoiceId: ID
  invoiceNumber: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  transactionRef?: string
  paidAt: string
  notes?: string
}

// ──────────────────────────────────────────────────────────────
// Dashboard
// ──────────────────────────────────────────────────────────────

export interface DashboardKPIs {
  totalRevenue: number
  revenueGrowth: number
  totalSales: number
  salesGrowth: number
  activeServiceTickets: number
  urgentTickets: number
  activeRentals: number
  expiringRentals: number
  activeAMC: number
  expiringAMC: number
  pendingPayments: number
  overdueInvoices: number
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  sales: number
}

export interface PipelineDataPoint {
  stage: string
  count: number
  value: number
}

export interface TicketStatusDataPoint {
  status: string
  count: number
  color: string
}

export interface ActivityItem {
  id: ID
  type: 'lead' | 'service' | 'rental' | 'amc' | 'payment' | 'invoice'
  title: string
  description: string
  timestamp: string
}
