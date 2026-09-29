"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as dashboardService from "@/services/dashboard.service"

import { StatCard } from "@/components/ui/stat-card"
import { StatCardSkeleton, ErrorState } from "@/components/ui/data-states"
import { DollarSign, TrendingUp, Wrench, Car, FileBadge, Receipt } from "lucide-react"

import { formatCurrency, formatCompact } from "@/utils/format"

export function DashboardKPIs() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.dashboard.kpis(),
    queryFn: dashboardService.getDashboardKPIs,
  })

  if (isLoading) return <StatCardSkeleton count={6} />
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        label="Total Revenue"
        value={formatCompact(data.totalRevenue)}
        trend={data.revenueGrowth}
        icon={DollarSign}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBg="bg-blue-50 dark:bg-blue-950/40"
      />
      <StatCard
        label="Total Sales"
        value={formatCompact(data.totalSales)}
        trend={data.salesGrowth}
        icon={TrendingUp}
        iconColor="text-emerald-600 dark:text-emerald-400"
        iconBg="bg-emerald-50 dark:bg-emerald-950/40"
      />
      <StatCard
        label="Active Tickets"
        value={data.activeServiceTickets.toString()}
        alert={data.urgentTickets > 0 ? `${data.urgentTickets} Urgent` : undefined}
        alertType="danger"
        icon={Wrench}
        iconColor="text-amber-600 dark:text-amber-400"
        iconBg="bg-amber-50 dark:bg-amber-950/40"
      />
      <StatCard
        label="Active Rentals"
        value={data.activeRentals.toString()}
        alert={data.expiringRentals > 0 ? `${data.expiringRentals} Expiring` : undefined}
        alertType="warning"
        icon={Car}
        iconColor="text-teal-600 dark:text-teal-400"
        iconBg="bg-teal-50 dark:bg-teal-950/40"
      />
      <StatCard
        label="Active AMC"
        value={data.activeAMC.toString()}
        alert={data.expiringAMC > 0 ? `${data.expiringAMC} Expiring` : undefined}
        alertType="warning"
        icon={FileBadge}
        iconColor="text-purple-600 dark:text-purple-400"
        iconBg="bg-purple-50 dark:bg-purple-950/40"
      />
      <StatCard
        label="Pending Payments"
        value={formatCompact(data.pendingPayments)}
        alert={data.overdueInvoices > 0 ? `${data.overdueInvoices} Overdue` : undefined}
        alertType="danger"
        icon={Receipt}
        iconColor="text-rose-600 dark:text-rose-400"
        iconBg="bg-rose-50 dark:bg-rose-950/40"
      />
    </div>
  )
}
