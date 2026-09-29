// ──────────────────────────────────────────────────────────────
// App Routes — single source of truth for all navigation paths
// ──────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',

  // Core
  DASHBOARD: '/',
  CRM: '/crm',
  LEADS: '/leads',
  SALES: '/sales',
  QUOTATIONS: '/quotations',
  ORDERS: '/orders',
  INVENTORY: '/inventory',

  // Operations
  SERVICE: '/service',
  RENTAL: '/rental',
  AMC: '/amc',

  // Finance & More
  CUSTOMERS: '/customers',
  INVOICES: '/invoices',
  PAYMENTS: '/payments',
  REPORTS: '/reports',

  // System
  AI_COPILOT: '/ai',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

// ──────────────────────────────────────────────────────────────
// Navigation structure (used by Sidebar)
// ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: AppRoute | string
  iconName: string
}

export interface NavGroup {
  label: string | null
  items: NavItem[]
}
