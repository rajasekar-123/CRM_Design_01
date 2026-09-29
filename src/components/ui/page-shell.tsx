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
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actionLabel && (
        <button
          onClick={action}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150"
          style={{
            background: "hsl(var(--primary))",
            color: "#fff",
            boxShadow: "0 4px 16px hsl(var(--primary) / 0.35)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
      className="relative rounded-2xl p-5 overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 2px 12px hsl(0 0% 0% / 0.15)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = "hsl(var(--primary) / 0.3)"
        el.style.boxShadow = "0 8px 32px hsl(var(--primary) / 0.1)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = "hsl(var(--border))"
        el.style.boxShadow = "0 2px 12px hsl(0 0% 0% / 0.15)"
      }}
    >
      <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full opacity-20" style={{ background: gradient, filter: "blur(16px)" }} />
      <div className="flex items-start justify-between mb-3 relative z-10">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: gradient }}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="text-2xl font-bold relative z-10" style={{ color: "hsl(var(--foreground))" }}>
        {value}
      </div>
      {sub && (
        <div className="text-xs mt-1 relative z-10" style={{ color: "hsl(var(--muted-foreground))" }}>
          {sub}
        </div>
      )}
    </div>
  )
}

export function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
        {title}
      </h2>
      {action && (
        <button
          className="flex items-center gap-1 text-xs font-semibold"
          style={{ color: "hsl(var(--primary))" }}
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
    <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead style={{ background: "hsl(var(--muted))", borderBottom: "1px solid hsl(var(--border))" }}>
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "hsl(var(--muted-foreground))" }}
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
                className="transition-colors duration-100"
                style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted) / 0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-6 py-4">
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
