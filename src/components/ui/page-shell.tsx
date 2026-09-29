"use client"

// Shared layout primitives reused across all pages

import { ArrowUpRight } from "lucide-react"

export function PageHeader({
  title,
  subtitle,
  action,
  actionLabel,
}: {
  title: string
  subtitle?: string
  action?: () => void
  actionLabel?: string
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#000000]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-1 text-slate-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {actionLabel && (
        <button
          onClick={action}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-150 bg-[#5932EA] text-white hover:bg-[#5932EA]/90 hover:shadow-lg hover:shadow-[#5932EA]/30"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export function StatCard({
  label,
  value,
  sub,
  gradient,
  icon: Icon,
}: {
  label: string
  value: string | number
  sub?: string
  gradient: string
  icon: React.ElementType
}) {
  return (
    <div
      className="relative rounded-[20px] p-6 overflow-hidden transition-shadow duration-200 bg-[#151B2B] border border-[#1E2536] shadow-lg hover:shadow-xl flex flex-col gap-4"
    >
      <div className="flex items-start justify-between relative z-10">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          {label}
        </span>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: gradient }}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <div>
        <div className="text-[28px] font-bold leading-tight text-white truncate">
          {value}
        </div>
        {sub && (
          <div className="text-xs mt-1 text-slate-400 font-medium">
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}

export function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-[22px] font-bold text-[#000000]">
        {title}
      </h3>
      {action && (
        <button
          className="flex items-center gap-1 text-xs font-semibold text-[#5932EA] hover:text-[#5932EA]/80"
        >
          {action} <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="rounded-[20px] overflow-hidden bg-[#151B2B] border border-[#1E2536] shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#1C2333] border-b border-[#1E2536]">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="transition-colors duration-100 border-b border-[#1E2536]/50 hover:bg-[#1C2333]"
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-6 py-4 text-white">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function StatusBadge({ label, variant }: { label: string; variant: "green" | "amber" | "red" | "blue" | "purple" | "gray" }) {
  const styles: Record<string, { bg: string; color: string; border: string }> = {
    green: { bg: "hsl(160 60% 45% / 0.12)", color: "hsl(160 60% 55%)", border: "hsl(160 60% 45% / 0.25)" },
    amber: { bg: "hsl(38 92% 58% / 0.12)", color: "hsl(38 92% 62%)", border: "hsl(38 92% 58% / 0.25)" },
    red: { bg: "hsl(350 75% 58% / 0.12)", color: "hsl(350 75% 68%)", border: "hsl(350 75% 58% / 0.25)" },
    blue: { bg: "hsl(205 80% 58% / 0.12)", color: "hsl(205 80% 68%)", border: "hsl(205 80% 58% / 0.25)" },
    purple: { bg: "hsl(250 80% 65% / 0.12)", color: "hsl(250 80% 75%)", border: "hsl(250 80% 65% / 0.25)" },
    gray: { bg: "hsl(215 15% 40% / 0.2)", color: "hsl(215 15% 65%)", border: "hsl(215 15% 40% / 0.3)" },
  }
  const s = styles[variant]
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {label}
    </span>
  )
}

export function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const colors = ["hsl(250 80% 65%)", "hsl(160 60% 45%)", "hsl(205 80% 55%)", "hsl(38 92% 55%)", "hsl(350 75% 58%)"]
  const color = colors[name.charCodeAt(0) % colors.length]
  const px = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"
  return (
    <div className={`${px} rounded-full flex items-center justify-center font-bold text-white shrink-0`}
      style={{ background: color }}>
      {initials}
    </div>
  )
}
