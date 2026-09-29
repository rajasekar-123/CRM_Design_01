"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as crmService from "@/services/crm.service"
import { formatCurrency, formatCompact, formatRelativeTime } from "@/utils/format"

import { PageHeader, PrimaryButton, MonoId, UserAvatar } from "@/components/ui/page-primitives"
import { TableCard, type TableColumn } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { TableSkeleton, ErrorState } from "@/components/ui/data-states"
import { StatCard } from "@/components/ui/stat-card"
import { ORDER_STATUS_CONFIG } from "@/constants/status-maps"

import { Plus, ShoppingCart, CheckCircle2, Clock, Filter, MoreHorizontal } from "lucide-react"
import type { SalesOrder } from "@/types"

export default function SalesPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.sales.list(),
    queryFn: crmService.getSalesOrders,
  })

  const totalOrders = data?.length || 0
  const processingCount = data?.filter(o => o.status === "processing" || o.status === "confirmed").length || 0
  const totalValue = data?.reduce((acc, curr) => acc + curr.total, 0) || 0

  const columns: TableColumn<SalesOrder>[] = [
    {
      key: "id",
      label: "Order ID",
      render: (row) => <MonoId value={row.orderNumber} />,
    },
    {
      key: "customer",
      label: "Customer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={row.customerName} size="xs" />
          <span className="font-semibold text-slate-900 dark:text-white">{row.customerName}</span>
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (row) => (
        <span className="text-sm text-slate-600 dark:text-slate-300">
          {row.items.length} item(s)
        </span>
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
        const config = ORDER_STATUS_CONFIG[row.status]
        return <StatusBadge label={config.label} variant={config.variant} />
      },
    },
    {
      key: "date",
      label: "Created",
      render: (row) => <span className="text-sm text-slate-500">{formatRelativeTime(row.createdAt)}</span>,
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
        title="Sales Orders" 
        subtitle="Manage and track customer orders"
        action={<PrimaryButton icon={Plus}>Create Order</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Orders"
          value={totalOrders.toString()}
          icon={ShoppingCart}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Total Revenue (Orders)"
          value={formatCompact(totalValue)}
          icon={CheckCircle2}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Processing/Confirmed"
          value={processingCount.toString()}
          icon={Clock}
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
          title="Recent Orders"
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
