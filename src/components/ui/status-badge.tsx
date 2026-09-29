"use client"

import { cn } from "@/lib/utils"
import type { StatusVariant } from "@/constants/status-maps"

// ──────────────────────────────────────────────────────────────
// StatusBadge — semantic pill component driven by status-maps
// ──────────────────────────────────────────────────────────────

const variantClasses: Record<StatusVariant, string> = {
  green:  "bg-emerald-50  text-emerald-700  ring-emerald-200  dark:bg-emerald-950/40  dark:text-emerald-400  dark:ring-emerald-800",
  amber:  "bg-amber-50    text-amber-700    ring-amber-200    dark:bg-amber-950/40    dark:text-amber-400    dark:ring-amber-800",
  red:    "bg-red-50      text-red-700      ring-red-200      dark:bg-red-950/40      dark:text-red-400      dark:ring-red-800",
  blue:   "bg-blue-50     text-blue-700     ring-blue-200     dark:bg-blue-950/40     dark:text-blue-400     dark:ring-blue-800",
  purple: "bg-purple-50   text-purple-700   ring-purple-200   dark:bg-purple-950/40   dark:text-purple-400   dark:ring-purple-800",
  indigo: "bg-indigo-50   text-indigo-700   ring-indigo-200   dark:bg-indigo-950/40   dark:text-indigo-400   dark:ring-indigo-800",
  gray:   "bg-slate-100   text-slate-600    ring-slate-200    dark:bg-slate-800       dark:text-slate-300    dark:ring-slate-700",
}

interface StatusBadgeProps {
  label: string
  variant: StatusVariant
  className?: string
}

export function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset whitespace-nowrap",
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
