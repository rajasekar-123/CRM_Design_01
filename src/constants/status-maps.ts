import {
  type LeadStage, type TicketStatus, type RentalStatus,
  type AMCStatus, type InvoiceStatus, type PaymentStatus,
  type OrderStatus, type QuotationStatus, type StockStatus,
  type CustomerStatus, type PaymentMethod
} from '@/types'

// ──────────────────────────────────────────────────────────────
// Status display maps — label, color variant, and description
// Single source of truth for all badge/pill rendering
// ──────────────────────────────────────────────────────────────

export type StatusVariant = 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'gray' | 'indigo'

export interface StatusConfig {
  label: string
  variant: StatusVariant
  description?: string
}

export const LEAD_STAGE_CONFIG: Record<LeadStage, StatusConfig> = {
  new:         { label: 'New',          variant: 'gray'   },
  qualified:   { label: 'Qualified',    variant: 'blue'   },
  proposal:    { label: 'Proposal',     variant: 'amber'  },
  negotiation: { label: 'Negotiation',  variant: 'purple' },
  closed_won:  { label: 'Closed Won',   variant: 'green'  },
  closed_lost: { label: 'Closed Lost',  variant: 'red'    },
}

export const TICKET_STATUS_CONFIG: Record<TicketStatus, StatusConfig> = {
  created:             { label: 'Created',            variant: 'gray'   },
  assigned:            { label: 'Assigned',           variant: 'blue'   },
  accepted:            { label: 'Accepted',           variant: 'indigo' },
  scheduled:           { label: 'Scheduled',          variant: 'purple' },
  in_progress:         { label: 'In Progress',        variant: 'blue'   },
  waiting_for_parts:   { label: 'Waiting for Parts',  variant: 'amber'  },
  completed:           { label: 'Completed',          variant: 'green'  },
  closed:              { label: 'Closed',             variant: 'gray'   },
}

export const RENTAL_STATUS_CONFIG: Record<RentalStatus, StatusConfig> = {
  enquiry:        { label: 'Enquiry',        variant: 'gray'  },
  quotation:      { label: 'Quotation',      variant: 'blue'  },
  active:         { label: 'Active',         variant: 'green' },
  expiring_soon:  { label: 'Expiring Soon',  variant: 'amber' },
  completed:      { label: 'Completed',      variant: 'gray'  },
  terminated:     { label: 'Terminated',     variant: 'red'   },
}

export const AMC_STATUS_CONFIG: Record<AMCStatus, StatusConfig> = {
  active:    { label: 'Active',    variant: 'green' },
  expiring:  { label: 'Expiring', variant: 'amber' },
  expired:   { label: 'Expired',  variant: 'red'   },
  renewed:   { label: 'Renewed',  variant: 'blue'  },
  cancelled: { label: 'Cancelled',variant: 'gray'  },
}

export const INVOICE_STATUS_CONFIG: Record<InvoiceStatus, StatusConfig> = {
  draft:     { label: 'Draft',    variant: 'gray'  },
  sent:      { label: 'Sent',     variant: 'blue'  },
  paid:      { label: 'Paid',     variant: 'green' },
  overdue:   { label: 'Overdue',  variant: 'red'   },
  cancelled: { label: 'Cancelled',variant: 'gray'  },
}

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, StatusConfig> = {
  pending:  { label: 'Pending',  variant: 'amber' },
  cleared:  { label: 'Cleared', variant: 'green' },
  bounced:  { label: 'Bounced', variant: 'red'   },
  refunded: { label: 'Refunded',variant: 'blue'  },
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  draft:       { label: 'Draft',       variant: 'gray'   },
  confirmed:   { label: 'Confirmed',   variant: 'blue'   },
  processing:  { label: 'Processing',  variant: 'purple' },
  shipped:     { label: 'Shipped',     variant: 'indigo' },
  delivered:   { label: 'Delivered',   variant: 'green'  },
  cancelled:   { label: 'Cancelled',   variant: 'red'    },
}

export const QUOTATION_STATUS_CONFIG: Record<QuotationStatus, StatusConfig> = {
  draft:      { label: 'Draft',     variant: 'gray'  },
  sent:       { label: 'Sent',      variant: 'blue'  },
  approved:   { label: 'Approved',  variant: 'green' },
  rejected:   { label: 'Rejected',  variant: 'red'   },
  expired:    { label: 'Expired',   variant: 'red'   },
  converted:  { label: 'Converted', variant: 'purple'},
}

export const STOCK_STATUS_CONFIG: Record<StockStatus, StatusConfig> = {
  in_stock:      { label: 'In Stock',     variant: 'green' },
  low_stock:     { label: 'Low Stock',    variant: 'amber' },
  out_of_stock:  { label: 'Out of Stock', variant: 'red'   },
  discontinued:  { label: 'Discontinued', variant: 'gray'  },
}

export const CUSTOMER_STATUS_CONFIG: Record<CustomerStatus, StatusConfig> = {
  active:   { label: 'Active',   variant: 'green' },
  inactive: { label: 'Inactive', variant: 'gray'  },
  prospect: { label: 'Prospect', variant: 'amber' },
  churned:  { label: 'Churned',  variant: 'red'   },
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  bank_transfer: 'Bank Transfer',
  cheque:        'Cheque',
  upi:           'UPI',
  cash:          'Cash',
  card:          'Card',
}

// Chart colors aligned with design system
export const CHART_COLORS = {
  primary:  'hsl(250 80% 65%)',
  blue:     'hsl(205 80% 58%)',
  emerald:  'hsl(160 60% 45%)',
  amber:    'hsl(38 92% 58%)',
  rose:     'hsl(350 75% 58%)',
  purple:   'hsl(270 60% 58%)',
  gray:     'hsl(215 15% 55%)',
} as const
