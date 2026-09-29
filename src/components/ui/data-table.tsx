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
    <div className={cn("rounded-[20px] border border-[#1E2536] overflow-hidden bg-[#151B2B] shadow-lg", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1C2333] border-b border-[#1E2536]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest",
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
                  "bg-transparent transition-colors duration-150 border-b border-[#1E2536]/50",
                  onRowClick 
                    ? "cursor-pointer hover:bg-[#1C2333] hover:shadow-[inset_2px_0_0_0_#5932EA]" 
                    : "hover:bg-[#1C2333]"
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-6 py-4 text-white",
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
    <div className={cn("bg-[#151B2B] rounded-[20px] border border-[#1E2536] shadow-lg", className)}>
      <div className="flex items-center justify-between px-6 py-6 border-b border-[#1E2536]">
        <h3 className="text-[22px] font-bold text-white">{title}</h3>
        {action}
      </div>
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        onRowClick={onRowClick}
        className="border-0 rounded-none shadow-none"
      />
    </div>
  )
}
