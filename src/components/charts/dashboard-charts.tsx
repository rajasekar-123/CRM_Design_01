"use client"

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  Legend
} from "recharts"
import { cn } from "@/lib/utils"

const TOOLTIP_STYLE = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--card-foreground))",
  fontSize: "12px",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
}

// ──────────────────────────────────────────────────────────────
// Revenue Chart (Area)
// ──────────────────────────────────────────────────────────────

export function RevenueChart({ data, height = 350 }: { data: any[]; height?: number }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(250 80% 65%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(250 80% 65%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(205 80% 58%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(205 80% 58%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ fontSize: 13, fontWeight: 600 }} />
          <Legend wrapperStyle={{ paddingTop: 20, fontSize: 12 }} iconType="circle" />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(250 80% 65%)" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
          <Area type="monotone" dataKey="sales" name="Sales" stroke="hsl(205 80% 58%)" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// Pipeline Funnel Chart (Horizontal Bar)
// ──────────────────────────────────────────────────────────────

export function PipelineChart({ data, height = 250 }: { data: any[]; height?: number }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
          <XAxis type="number" hide />
          <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} width={90} />
          <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.5)" }} contentStyle={TOOLTIP_STYLE} />
          <Bar dataKey="value" name="Pipeline Value" fill="hsl(221 83% 53%)" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsl(221 83% ${53 + index * 6}%)`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// Donut Chart (e.g. for Service Tickets)
// ──────────────────────────────────────────────────────────────

export function StatusDonutChart({ data, height = 250 }: { data: any[]; height?: number }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
            nameKey="status"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--foreground))" }} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
