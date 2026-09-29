"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as operationsService from "@/services/operations.service"
import { formatCurrency, formatCompact, formatDate, daysUntil } from "@/utils/format"

import { PageHeader, PrimaryButton, MonoId, UserAvatar } from "@/components/ui/page-primitives"
import { TableCard, type TableColumn } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { TableSkeleton, ErrorState } from "@/components/ui/data-states"
import { StatCard } from "@/components/ui/stat-card"
import { RENTAL_STATUS_CONFIG } from "@/constants/status-maps"

import { Plus, Car, CalendarClock, CreditCard, Filter, MoreHorizontal, Calendar } from "lucide-react"
import type { RentalContract } from "@/types"

export default function RentalPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.rentals.list(),
    queryFn: operationsService.getRentalContracts,
  })

  const totalActive = data?.filter(r => r.status === "active" || r.status === "expiring_soon").length || 0
  const expiringCount = data?.filter(r => r.status === "expiring_soon").length || 0
  
  // Calculate approximate monthly revenue from active/expiring rentals
  const monthlyRevenue = data?.filter(r => r.status === "active" || r.status === "expiring_soon").reduce((acc, curr) => {
    let monthlyRate = curr.ratePerPeriod
    if (curr.periodType === 'daily') monthlyRate = curr.ratePerPeriod * 30
    if (curr.periodType === 'weekly') monthlyRate = curr.ratePerPeriod * 4
    return acc + monthlyRate
  }, 0) || 0

  const columns: TableColumn<RentalContract>[] = [
    {
      key: "id",
      label: "Contract ID",
      render: (row) => <MonoId value={row.contractNumber} />,
    },
    {
      key: "equipment",
      label: "Equipment & Customer",
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-white mb-0.5">{row.equipment}</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <UserAvatar name={row.customerName} size="xs" />
            <span>{row.customerName}</span>
          </div>
        </div>
      ),
    },
    {
      key: "dates",
      label: "Period",
      render: (row) => (
        <div className="text-sm">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {formatDate(row.startDate)} – {formatDate(row.endDate)}
          </div>
          {row.status !== "completed" && row.status !== "terminated" && row.status !== "enquiry" && row.status !== "quotation" && (
            <div className={`mt-1 text-xs font-medium ${daysUntil(row.endDate) <= 7 ? 'text-red-500' : 'text-slate-500'}`}>
              {daysUntil(row.endDate)} days remaining
            </div>
          )}
        </div>
      ),
    },
    {
      key: "rate",
      label: "Rate",
      align: "right",
      render: (row) => (
        <div className="text-sm">
          <div className="font-medium text-slate-900 dark:text-white">{formatCurrency(row.ratePerPeriod)}</div>
          <div className="text-xs text-slate-500 capitalize">per {row.periodType}</div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => {
        const config = RENTAL_STATUS_CONFIG[row.status]
        return <StatusBadge label={config.label} variant={config.variant} />
      },
    },
    {
      key: "actions",
      label: "",
      align: "right",
      width: "50px",
      render: () => (
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      ),
    },
  ]

  return (
    <div className="p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      <PageHeader 
        title="Rental Management" 
        subtitle="Manage equipment rental contracts and utilization"
        action={<PrimaryButton icon={Plus}>New Contract</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Active Contracts"
          value={totalActive.toString()}
          icon={Car}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Est. Monthly Revenue"
          value={formatCompact(monthlyRevenue)}
          icon={CreditCard}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Expiring Soon"
          value={expiringCount.toString()}
          alert={expiringCount > 0 ? "Requires Renewal" : undefined}
          alertType="warning"
          icon={CalendarClock}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
        />
      </div>

      {/* Data Table */}
      {isLoading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : isError || !data ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <TableCard
          title="All Contracts"
          columns={columns}
          data={data}
          keyExtractor={(row) => row.id}
          action={
            <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          }
        />
      )}

    </div>
  )
}
