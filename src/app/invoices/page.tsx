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
import { INVOICE_STATUS_CONFIG } from "@/constants/status-maps"

import { Plus, Receipt, AlertCircle, CheckCircle2, Filter, MoreHorizontal, Calendar, CreditCard } from "lucide-react"
import type { Invoice } from "@/types"

export default function InvoicesPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.invoices.list(),
    queryFn: financeService.getInvoices,
  })

  const totalInvoices = data?.length || 0
  const collectedValue = data?.filter(i => i.status === "paid").reduce((acc, curr) => acc + curr.total, 0) || 0
  const overdueValue = data?.filter(i => i.status === "overdue").reduce((acc, curr) => acc + curr.total, 0) || 0

  const columns: TableColumn<Invoice>[] = [
    {
      key: "id",
      label: "Invoice ID",
      render: (row) => <MonoId value={row.invoiceNumber} />,
    },
    {
      key: "customer",
      label: "Customer & Description",
      render: (row) => (
        <div>
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-0.5">
            <UserAvatar name={row.customerName} size="xs" />
            {row.customerName}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {row.description}
          </div>
        </div>
      ),
    },
    {
      key: "dates",
      label: "Timeline",
      render: (row) => (
        <div className="text-sm">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="text-xs text-slate-400 w-9">Issued:</span>
            {formatDate(row.issuedDate)}
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 mt-1">
            <span className="text-xs text-slate-400 w-9">Due:</span>
            <span className={row.status === 'overdue' ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
              {formatDate(row.dueDate)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "total",
      label: "Amount",
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
        const config = INVOICE_STATUS_CONFIG[row.status]
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
        title="Invoices" 
        subtitle="Manage billing and outstanding balances"
        action={<PrimaryButton icon={Plus}>Create Invoice</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Invoices"
          value={totalInvoices.toString()}
          icon={Receipt}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Total Collected"
          value={formatCompact(collectedValue)}
          icon={CheckCircle2}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Overdue Value"
          value={formatCompact(overdueValue)}
          alert={overdueValue > 0 ? "Action Needed" : undefined}
          alertType="danger"
          icon={AlertCircle}
          iconColor="text-red-600 dark:text-red-400"
          iconBg="bg-red-50 dark:bg-red-950/40"
        />
      </div>

      {/* Data Table */}
      {isLoading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : isError || !data ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <TableCard
          title="All Invoices"
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
