"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface StatCardProps {
  label: string
  value: string
  trend?: number        // +8.1 or -3.2 (percent change)
  alert?: string        // e.g. "45 Urgent"
  alertType?: "warning" | "danger" | "info"
  icon: LucideIcon
  iconColor?: string    // Tailwind text-* class
  iconBg?: string       // Tailwind bg-* class
  className?: string
}

export function StatCard({
  label,
  value,
  trend,
  alert,
  alertType = "warning",
  icon: Icon,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50",
  className,
}: StatCardProps) {
  const alertVariant = {
    warning: "text-amber-700 bg-amber-50 ring-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:ring-amber-800",
    danger:  "text-red-700   bg-red-50   ring-red-200   dark:text-red-400   dark:bg-red-950/40   dark:ring-red-800",
    info:    "text-blue-700  bg-blue-50  ring-blue-200  dark:text-blue-400  dark:bg-blue-950/40  dark:ring-blue-800",
  }[alertType]

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl border border-slate-200/60 dark:border-slate-800/60",
        "p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-shadow",
        className
      )}
    >
      {/* Subtle top gradient accent line based on iconBg color */}
      <div className={cn("absolute top-0 left-0 right-0 h-[2px] opacity-20", iconBg.replace('bg-', 'bg-gradient-to-r from-transparent via-').split(' ')[0] + ' to-transparent')} />

      {/* Icon */}
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm", iconBg, "dark:bg-opacity-20")}>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none tracking-tight">
          {value}
        </p>

        {/* Trend or Alert */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {trend !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded-md",
                trend >= 0 
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" 
                  : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
              )}
            >
              {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend >= 0 ? "+" : ""}{trend.toFixed(1)}%
            </span>
          )}
          {alert && (
            <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ring-1 ring-inset", alertVariant)}>
              {alert}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
