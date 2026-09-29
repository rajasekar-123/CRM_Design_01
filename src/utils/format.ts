// ──────────────────────────────────────────────────────────────
// Utility functions — formatting, dates, currency
// ──────────────────────────────────────────────────────────────

/**
 * Format a number as currency (INR/USD)
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a compact number (e.g. 1200000 → $1.2M)
 */
export function formatCompact(value: number, prefix = '$'): string {
  if (value >= 1_000_000) return `${prefix}${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${prefix}${(value / 1_000).toFixed(0)}K`
  return `${prefix}${value}`
}

/**
 * Format a date string to a readable format
 */
export function formatDate(
  date?: string | Date | null,
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }
): string {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d?.getTime() || NaN)) return '—'
  return d.toLocaleDateString('en-IN', options)
}

/**
 * Format a date as relative time (e.g. "2 hours ago")
 */
export function formatRelativeTime(date?: string | Date | null): string {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - (d?.getTime() || 0)
  if (isNaN(diffMs)) return '—'

  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffSec < 60) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay === 1) return 'Yesterday'
  if (diffDay < 7) return `${diffDay}d ago`
  return formatDate(d)
}

/**
 * Calculate days until a date
 */
export function daysUntil(date?: string | Date | null): number {
  if (!date) return 0
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = (d?.getTime() || 0) - now.getTime()
  if (isNaN(diffMs)) return 0
  
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Get initials from a name (max 2 chars)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/**
 * Format a percentage with sign
 */
export function formatPercent(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

/**
 * Truncate a string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '…'
}

/**
 * Generate a deterministic avatar color from a name
 */
export function getAvatarColor(name: string): string {
  const colors = [
    'hsl(250 80% 65%)',
    'hsl(160 60% 45%)',
    'hsl(205 80% 55%)',
    'hsl(38 92% 55%)',
    'hsl(350 75% 58%)',
    'hsl(270 60% 58%)',
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

/**
 * Slugify a string for URL use
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * Deep clone a value (JSON-safe)
 */
export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}
