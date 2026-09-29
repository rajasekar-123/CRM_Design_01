"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

// ──────────────────────────────────────────────────────────────
// DataTable — Simple, reusable table with consistent styling
// ──────────────────────────────────────────────────────────────

export interface TableColumn<T> {
  key: string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  render: (row: T, index: number) => ReactNode
}

interface DataTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string
  className?: string
  onRowClick?: (row: T) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn("rounded-xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right"
                  )}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody 
            className="divide-y divide-slate-100 dark:divide-slate-800/60"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {data.map((row, index) => (
              <motion.tr
                variants={itemVariants}
                key={keyExtractor(row, index)}
                className={cn(
                  "bg-transparent transition-colors duration-150",
                  onRowClick 
                    ? "cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-800/50 hover:shadow-[inset_2px_0_0_0_#2563eb]" 
                    : "hover:bg-slate-50/30 dark:hover:bg-slate-800/30"
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-5 py-4 text-slate-700 dark:text-slate-300",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right"
                    )}
                  >
                    {col.render(row, index)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// TableCard — DataTable wrapped in a card with header
// ──────────────────────────────────────────────────────────────

interface TableCardProps<T> {
  title: string
  columns: TableColumn<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string
  action?: ReactNode
  onRowClick?: (row: T) => void
  className?: string
}

export function TableCard<T>({
  title,
  columns,
  data,
  keyExtractor,
  action,
  onRowClick,
  className,
}: TableCardProps<T>) {
  return (
    <div className={cn("bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm", className)}>
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800/60">
        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">{title}</h3>
        {action}
      </div>
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        onRowClick={onRowClick}
        className="border-0 rounded-none shadow-none bg-transparent dark:bg-transparent backdrop-blur-none"
      />
    </div>
  )
}
