"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// SectionHeader — smaller heading for card/section titles
// ──────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-3", className)}>
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {title}
      </h2>
      {action}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// UserAvatar — deterministic colored avatar from name initials
// ──────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
]

interface UserAvatarProps {
  name: string
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
}

export function UserAvatar({ name, size = "sm", className }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const colorIndex = name.charCodeAt(0) % AVATAR_COLORS.length
  const colorClass = AVATAR_COLORS[colorIndex]

  const sizeClass = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }[size]

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold shrink-0",
        sizeClass,
        colorClass,
        className
      )}
    >
      {initials}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// MonoId — styled monospace ID for table cells
// ──────────────────────────────────────────────────────────────

export function MonoId({ value }: { value: string }) {
  return (
    <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
      {value}
    </span>
  )
}

// ──────────────────────────────────────────────────────────────
// PrimaryButton / SecondaryButton — consistent action buttons
// ──────────────────────────────────────────────────────────────

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  icon?: LucideIcon
}

export function PrimaryButton({ children, icon: Icon, className, ...props }: ActionButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold",
        "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        "dark:bg-blue-600 dark:hover:bg-blue-500",
        "transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  )
}

export function SecondaryButton({ children, icon: Icon, className, ...props }: ActionButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold",
        "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300",
        "dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
        "transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  )
}
