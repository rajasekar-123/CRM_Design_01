// ──────────────────────────────────────────────────────────────
// TanStack Query key factories
// Centralized to prevent typos and enable cache invalidation
// ──────────────────────────────────────────────────────────────

export const QUERY_KEYS = {
  // Dashboard
  dashboard: {
    all: ['dashboard'] as const,
    kpis: () => [...QUERY_KEYS.dashboard.all, 'kpis'] as const,
    revenue: () => [...QUERY_KEYS.dashboard.all, 'revenue'] as const,
    pipeline: () => [...QUERY_KEYS.dashboard.all, 'pipeline'] as const,
    activity: () => [...QUERY_KEYS.dashboard.all, 'activity'] as const,
  },

  // Customers
  customers: {
    all: ['customers'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.customers.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.customers.all, 'detail', id] as const,
  },

  // Leads
  leads: {
    all: ['leads'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.leads.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.leads.all, 'detail', id] as const,
    pipeline: () => [...QUERY_KEYS.leads.all, 'pipeline'] as const,
  },

  // Sales Orders
  sales: {
    all: ['sales'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.sales.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.sales.all, 'detail', id] as const,
  },

  // Quotations
  quotations: {
    all: ['quotations'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.quotations.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.quotations.all, 'detail', id] as const,
  },

  // Orders
  orders: {
    all: ['orders'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.orders.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.orders.all, 'detail', id] as const,
  },

  // Inventory
  inventory: {
    all: ['inventory'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.inventory.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.inventory.all, 'detail', id] as const,
  },

  // Service Tickets
  service: {
    all: ['service'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.service.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.service.all, 'detail', id] as const,
  },

  // Rentals
  rentals: {
    all: ['rentals'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.rentals.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.rentals.all, 'detail', id] as const,
  },

  // AMC
  amc: {
    all: ['amc'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.amc.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.amc.all, 'detail', id] as const,
    expiring: () => [...QUERY_KEYS.amc.all, 'expiring'] as const,
  },

  // Invoices
  invoices: {
    all: ['invoices'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.invoices.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.invoices.all, 'detail', id] as const,
  },

  // Payments
  payments: {
    all: ['payments'] as const,
    list: (params?: Record<string, unknown>) => [...QUERY_KEYS.payments.all, 'list', params] as const,
    detail: (id: string) => [...QUERY_KEYS.payments.all, 'detail', id] as const,
  },
} as const
