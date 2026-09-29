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
        "relative overflow-hidden bg-[#151B2B] rounded-[20px] p-6 flex items-center gap-5 border border-[#1E2536] shadow-lg transition-shadow",
        className
      )}
    >
      {/* Icon */}
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0", iconBg)}>
        <Icon className={cn("w-7 h-7 text-white")} strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0">
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
          {label}
        </span>
        <span className="text-white text-[28px] font-bold leading-none truncate">
          {value}
        </span>

        {/* Trend or Alert */}
        <div className="text-xs font-medium flex items-center gap-1.5 flex-wrap mt-2">
          {trend !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5",
                trend >= 0 ? "text-[#00AC56]" : "text-[#D0004B]"
              )}
            >
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}%
              <span className="text-slate-500 ml-1 font-normal">this month</span>
            </span>
          )}
          {alert && (
            <span className={cn("inline-flex items-center rounded-md text-[10px] uppercase tracking-wider font-bold", alertVariant)}>
              {alert}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
