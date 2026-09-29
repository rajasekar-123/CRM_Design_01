"use client"

import { cn } from "@/lib/utils"
import { FileX2 } from "lucide-react"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ElementType
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  title = "No records found",
  description = "There are no items matching your current filters.",
  icon: Icon = FileX2,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

interface LoadingStateProps {
  rows?: number
  columns?: number
  className?: string
}

export function TableSkeleton({ rows = 5, columns = 5, className }: LoadingStateProps) {
  return (
    <div className={cn("w-full animate-pulse", className)}>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3.5 flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-3 bg-slate-200 dark:bg-slate-700 rounded flex-1" style={{ opacity: i === 0 ? 1 : 0.7 }} />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, ri) => (
          <div key={ri} className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex gap-4 items-center">
            {Array.from({ length: columns }).map((_, ci) => (
              <div
                key={ci}
                className="h-4 bg-slate-100 dark:bg-slate-800 rounded flex-1"
                style={{ opacity: ci === 0 ? 1 : 0.6, maxWidth: ci === 0 ? '140px' : undefined }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 animate-pulse">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-24" />
              <div className="h-7 bg-slate-100 dark:bg-slate-800 rounded w-32" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Something went wrong",
  description = "Failed to load data. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-4">
        <FileX2 className="w-7 h-7 text-red-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  )
}
