"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as financeService from "@/services/finance.service"
import { formatCurrency, formatCompact, formatDate, daysUntil } from "@/utils/format"

import { PageHeader, PrimaryButton, MonoId, UserAvatar } from "@/components/ui/page-primitives"
import { TableCard, type TableColumn } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { TableSkeleton, ErrorState } from "@/components/ui/data-states"
import { StatCard } from "@/components/ui/stat-card"
import { QUOTATION_STATUS_CONFIG } from "@/constants/status-maps"

import { Plus, FileText, CheckCircle2, Clock, Filter, MoreHorizontal, Calendar } from "lucide-react"
import type { Quotation } from "@/types"

export default function QuotationsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.quotations.list(),
    queryFn: financeService.getQuotations,
  })

  const totalQuotes = data?.length || 0
  const approvedQuotes = data?.filter(q => q.status === "approved" || q.status === "converted").length || 0
  const pendingValue = data?.filter(q => q.status === "sent" || q.status === "draft").reduce((acc, curr) => acc + curr.total, 0) || 0

  const columns: TableColumn<Quotation>[] = [
    {
      key: "id",
      label: "Quote ID",
      render: (row) => <MonoId value={row.quoteNumber} />,
    },
    {
      key: "subject",
      label: "Subject & Customer",
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-white mb-0.5">{row.subject}</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <UserAvatar name={row.customerName} size="xs" />
            <span>{row.customerName}</span>
          </div>
        </div>
      ),
    },
    {
      key: "dates",
      label: "Validity",
      render: (row) => (
        <div className="text-sm">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Until {formatDate(row.validUntil)}
          </div>
          {row.status !== "expired" && row.status !== "converted" && row.status !== "rejected" && (
            <div className={`mt-1 text-xs font-medium ${daysUntil(row.validUntil) <= 7 ? 'text-amber-500' : 'text-slate-500'}`}>
              {daysUntil(row.validUntil)} days left
            </div>
          )}
        </div>
      ),
    },
    {
      key: "total",
      label: "Total Amount",
      align: "right",
      render: (row) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {formatCurrency(row.total)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => {
        const config = QUOTATION_STATUS_CONFIG[row.status]
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
        title="Quotations" 
        subtitle="Manage proposals and sent quotes"
        action={<PrimaryButton icon={Plus}>Create Quote</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Quotations"
          value={totalQuotes.toString()}
          icon={FileText}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Approved / Converted"
          value={approvedQuotes.toString()}
          icon={CheckCircle2}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Pending Value"
          value={formatCompact(pendingValue)}
          icon={Clock}
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
          title="Recent Quotations"
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
