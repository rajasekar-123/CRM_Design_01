"use client"

import { DashboardKPIs } from "@/components/dashboard/dashboard-kpis"
import { DashboardChartsArea } from "@/components/dashboard/dashboard-charts-area"
import { DashboardActivityFeed } from "@/components/dashboard/dashboard-activity-feed"
import { PageHeader, PrimaryButton } from "@/components/ui/page-primitives"
import { Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <PageHeader 
        title="Dashboard" 
        subtitle="Overview & Performance"
        action={
          <PrimaryButton icon={Plus}>
            New Record
          </PrimaryButton>
        }
      />

      {/* Top KPIs */}
      <DashboardKPIs />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Charts (takes 3/4 width on huge screens, full width elsewhere) */}
        <div className="xl:col-span-3">
          <DashboardChartsArea />
        </div>
        
        {/* Activity Feed (takes 1/4 width) */}
        <div className="xl:col-span-1">
          <DashboardActivityFeed />
        </div>
      </div>
      
    </div>
  )
}
