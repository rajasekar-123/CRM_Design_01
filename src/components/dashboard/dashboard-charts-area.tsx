"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as dashboardService from "@/services/dashboard.service"

import { RevenueChart, PipelineChart, StatusDonutChart } from "@/components/charts/dashboard-charts"
import { SectionHeader } from "@/components/ui/page-primitives"
import { ErrorState } from "@/components/ui/data-states"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react"

// Simple loading skeleton for a chart card
function ChartSkeleton({ height = "h-[350px]" }: { height?: string }) {
  return (
    <div className={`w-full ${height} bg-slate-50 dark:bg-slate-800/50 rounded animate-pulse`} />
  )
}

export function DashboardChartsArea() {
  const { data: revenueData, isLoading: isLoadingRevenue, isError: isErrorRev } = useQuery({
    queryKey: QUERY_KEYS.dashboard.revenue(),
    queryFn: dashboardService.getRevenueData,
  })

  const { data: pipelineData, isLoading: isLoadingPipeline } = useQuery({
    queryKey: QUERY_KEYS.dashboard.pipeline(),
    queryFn: dashboardService.getPipelineData,
  })

  const { data: ticketData, isLoading: isLoadingTickets } = useQuery({
    queryKey: QUERY_KEYS.dashboard.activity(), // Reusing activity key scope for simplicity here
    queryFn: dashboardService.getTicketStatusData,
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      
      {/* Left Column: Revenue (span 2) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <SectionHeader
            title="Revenue Growth"
            action={
              <select className="text-xs bg-slate-50 dark:bg-slate-800 border-none rounded-md px-2 py-1 text-slate-600 dark:text-slate-300 outline-none">
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            }
          />
          {isLoadingRevenue ? (
            <ChartSkeleton height="h-[350px]" />
          ) : isErrorRev || !revenueData ? (
            <ErrorState />
          ) : (
            <div className="mt-4 -ml-4">
              <RevenueChart data={revenueData} height={350} />
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Mini charts */}
      <div className="space-y-6">
        
        {/* Pipeline */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <SectionHeader
            title="Sales Pipeline"
            action={<button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><MoreHorizontal className="w-4 h-4" /></button>}
          />
          {isLoadingPipeline ? (
            <ChartSkeleton height="h-[200px]" />
          ) : pipelineData ? (
            <div className="mt-2">
              <PipelineChart data={pipelineData} height={200} />
            </div>
          ) : null}
        </div>

        {/* Tickets */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <SectionHeader
            title="Service Tickets"
            action={<button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><MoreHorizontal className="w-4 h-4" /></button>}
          />
          {isLoadingTickets ? (
            <ChartSkeleton height="h-[200px]" />
          ) : ticketData ? (
            <div className="mt-2">
              <StatusDonutChart data={ticketData} height={200} />
            </div>
          ) : null}
        </div>

      </div>
    </div>
  )
}
