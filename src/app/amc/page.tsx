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
import { AMC_STATUS_CONFIG } from "@/constants/status-maps"

import { Plus, BadgeCheck, AlertCircle, RefreshCw, Filter, MoreHorizontal, FileText, ShieldAlert } from "lucide-react"
import type { AMCContract } from "@/types"

export default function AMCPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.amc.list(),
    queryFn: operationsService.getAMCContracts,
  })

  const totalActive = data?.filter(c => c.status === "active" || c.status === "expiring").length || 0
  const expiringCount = data?.filter(c => c.status === "expiring").length || 0
  const annualRevenue = data?.filter(c => c.status === "active" || c.status === "expiring").reduce((acc, curr) => acc + curr.annualValue, 0) || 0

  const columns: TableColumn<AMCContract>[] = [
    {
      key: "id",
      label: "Contract ID",
      render: (row) => <MonoId value={row.contractNumber} />,
    },
    {
      key: "customer",
      label: "Customer & Plan",
      render: (row) => (
        <div>
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-0.5">
            <UserAvatar name={row.customerName} size="xs" />
            {row.customerName}
          </div>
          <div className="text-xs flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <FileText className="w-3.5 h-3.5" />
            {row.planName || "Standard AMC"}
          </div>
        </div>
      ),
    },
    {
      key: "equipment",
      label: "Covered Equipment",
      render: (row) => <span className="text-sm">{row.equipment}</span>,
    },
    {
      key: "visits",
      label: "Maintenance Visits",
      align: "center",
      render: (row) => (
        <div className="text-sm">
          <div className="font-medium text-slate-700 dark:text-slate-300">
            {row.visitsDone} / {row.visitFrequency}
          </div>
          {row.nextVisitDate && row.status !== "expired" && row.status !== "cancelled" && (
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
              Next: {formatDate(row.nextVisitDate)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "value",
      label: "Annual Value",
      align: "right",
      render: (row) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {formatCurrency(row.annualValue)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => {
        const config = AMC_STATUS_CONFIG[row.status]
        return (
          <div className="flex flex-col items-center gap-1">
            <StatusBadge label={config.label} variant={config.variant} />
            {row.status !== "cancelled" && row.status !== "expired" && (
              <span className={`text-[10px] font-medium ${daysUntil(row.endDate) <= 30 ? 'text-red-500' : 'text-slate-500'}`}>
                {daysUntil(row.endDate)}d left
              </span>
            )}
          </div>
        )
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
        title="AMC Management" 
        subtitle="Annual Maintenance Contracts & Schedules"
        action={<PrimaryButton icon={Plus}>New AMC</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Active Contracts"
          value={totalActive.toString()}
          icon={BadgeCheck}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Annual Recurring Revenue"
          value={formatCompact(annualRevenue)}
          icon={RefreshCw}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Expiring (Next 30 Days)"
          value={expiringCount.toString()}
          alert={expiringCount > 0 ? "Renewals Due" : undefined}
          alertType="warning"
          icon={ShieldAlert}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/40"
        />
      </div>

      {/* Data Table */}
      {isLoading ? (
        <TableSkeleton rows={5} columns={7} />
      ) : isError || !data ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <TableCard
          title="AMC Contracts"
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
