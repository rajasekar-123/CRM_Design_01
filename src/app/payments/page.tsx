"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as financeService from "@/services/finance.service"
import { formatCurrency, formatCompact, formatDate, formatRelativeTime } from "@/utils/format"

import { PageHeader, PrimaryButton, MonoId, UserAvatar } from "@/components/ui/page-primitives"
import { TableCard, type TableColumn } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { TableSkeleton, ErrorState } from "@/components/ui/data-states"
import { StatCard } from "@/components/ui/stat-card"
import { PAYMENT_STATUS_CONFIG, PAYMENT_METHOD_LABELS } from "@/constants/status-maps"

import { Plus, CreditCard, CheckCircle2, XCircle, Filter, MoreHorizontal, ArrowDownLeft } from "lucide-react"
import type { Payment } from "@/types"

export default function PaymentsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.payments.list(),
    queryFn: financeService.getPayments,
  })

  const totalPayments = data?.length || 0
  const clearedValue = data?.filter(p => p.status === "cleared").reduce((acc, curr) => acc + curr.amount, 0) || 0
  const bouncedCount = data?.filter(p => p.status === "bounced").length || 0

  const columns: TableColumn<Payment>[] = [
    {
      key: "id",
      label: "Receipt ID",
      render: (row) => <MonoId value={row.paymentNumber} />,
    },
    {
      key: "customer",
      label: "Customer & Invoice",
      render: (row) => (
        <div>
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-0.5">
            <UserAvatar name={row.customerName} size="xs" />
            {row.customerName}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            For: <MonoId value={row.invoiceNumber} />
          </div>
        </div>
      ),
    },
    {
      key: "method",
      label: "Method",
      render: (row) => (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {PAYMENT_METHOD_LABELS[row.method]}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      align: "right",
      render: (row) => (
        <span className="font-medium text-slate-900 dark:text-white flex items-center justify-end gap-1.5">
          <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500" />
          {formatCurrency(row.amount)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => {
        const config = PAYMENT_STATUS_CONFIG[row.status]
        return <StatusBadge label={config.label} variant={config.variant} />
      },
    },
    {
      key: "date",
      label: "Paid On",
      render: (row) => (
        <div className="text-sm">
          <div className="text-slate-700 dark:text-slate-300">{formatDate(row.paidAt)}</div>
          <div className="text-xs text-slate-500">{formatRelativeTime(row.paidAt)}</div>
        </div>
      ),
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
        title="Payments" 
        subtitle="Track incoming payments and receipts"
        action={<PrimaryButton icon={Plus}>Record Payment</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Transactions"
          value={totalPayments.toString()}
          icon={CreditCard}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Cleared Value"
          value={formatCompact(clearedValue)}
          icon={CheckCircle2}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Bounced / Failed"
          value={bouncedCount.toString()}
          alert={bouncedCount > 0 ? "Requires Follow-up" : undefined}
          alertType="danger"
          icon={XCircle}
          iconColor="text-red-600 dark:text-red-400"
          iconBg="bg-red-50 dark:bg-red-950/40"
        />
      </div>

      {/* Data Table */}
      {isLoading ? (
        <TableSkeleton rows={5} columns={7} />
      ) : isError || !data ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <TableCard
          title="Recent Receipts"
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
