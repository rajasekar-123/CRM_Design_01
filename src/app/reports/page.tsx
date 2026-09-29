"use client"

import { BarChart2, TrendingUp, DollarSign, Users, Wrench } from "lucide-react"
import { PageHeader, StatCard, SectionTitle } from "@/components/ui/page-shell"

const reportCards = [
  { label: "Revenue vs Target", pct: 91, color: "hsl(250 80% 65%)" },
  { label: "Lead Conversion", pct: 25, color: "hsl(205 80% 58%)" },
  { label: "Ticket Resolution", pct: 87, color: "hsl(160 60% 48%)" },
  { label: "AMC Renewal Rate", pct: 73, color: "hsl(38 92% 58%)" },
]

const topProducts = [
  { name: "Generator 500kVA", revenue: "$312,400", units: 74, share: 28 },
  { name: "HVAC Systems", revenue: "$198,700", units: 102, share: 18 },
  { name: "UPS Systems", revenue: "$164,200", units: 198, share: 15 },
  { name: "Cooling Towers", revenue: "$134,500", units: 22, share: 12 },
  { name: "Transformers", revenue: "$98,300", units: 48, share: 9 },
]

export default function ReportsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-12">
      <PageHeader title="Reports" subtitle="Business intelligence and performance analytics." actionLabel="Generate Report" />

      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="YTD Revenue" value="$1.12M" sub="91% of annual target" gradient="linear-gradient(135deg, hsl(250 80% 65%), hsl(280 70% 60%))" icon={DollarSign} />
        <StatCard label="YTD Growth" value="+18.4%" sub="vs same period last year" gradient="linear-gradient(135deg, hsl(160 60% 42%), hsl(175 55% 48%))" icon={TrendingUp} />
        <StatCard label="New Customers" value="284" sub="This year" gradient="linear-gradient(135deg, hsl(205 80% 55%), hsl(220 80% 60%))" icon={Users} />
        <StatCard label="Service SLA" value="94.2%" sub="Within target resolution" gradient="linear-gradient(135deg, hsl(38 92% 55%), hsl(30 90% 60%))" icon={Wrench} />
      </div>

      {/* Performance Metrics */}
      <div>
        <SectionTitle title="Performance vs Target" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportCards.map((r) => (
            <div key={r.label} className="bg-[#151B2B] rounded-[20px] p-6 border border-[#1E2536] shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-400">{r.label}</div>
              <div className="text-[32px] font-bold mb-5 text-white" style={{ color: r.color }}>{r.pct}%</div>
              <div className="h-2 rounded-full bg-[#1C2333]">
                <div className="h-full rounded-full transition-all" style={{ width: `${r.pct}%`, background: r.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionTitle title="Top Products by Revenue" />
          <div className="bg-[#151B2B] rounded-[20px] p-6 space-y-4 border border-[#1E2536] shadow-lg">
            {topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold w-4 text-slate-400">#{i + 1}</span>
                    <span className="text-[15px] font-bold text-white">{p.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[15px] font-bold text-white">{p.revenue}</div>
                    <div className="text-[11px] font-medium text-slate-400">{p.units} units</div>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-[#1C2333]">
                  <div className="h-full rounded-full bg-[#5932EA]" style={{ width: `${p.share * 3.2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle title="Monthly Revenue Trend" />
          <div className="bg-[#151B2B] rounded-[20px] p-6 h-[calc(100%-2.5rem)] border border-[#1E2536] shadow-lg">
            <div className="flex items-end justify-between gap-2 mt-6 h-48">
              {[
                { m: "Jan", v: 72 }, { m: "Feb", v: 84 }, { m: "Mar", v: 68 },
                { m: "Apr", v: 91 }, { m: "May", v: 88 }, { m: "Jun", v: 104 },
                { m: "Jul", v: 98 }, { m: "Aug", v: 112 }, { m: "Sep", v: 124 },
              ].map((d) => (
                <div key={d.m} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">${d.v}K</span>
                  <div className="w-full rounded-t-lg transition-colors bg-[#1C2333] group-hover:bg-[#5932EA]" style={{ height: `${(d.v / 130) * 100}%` }} />
                  <span className="text-[11px] font-medium text-slate-400">{d.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
