"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as operationsService from "@/services/operations.service"
import { formatCurrency, formatCompact } from "@/utils/format"

import { PageHeader, PrimaryButton, MonoId } from "@/components/ui/page-primitives"
import { TableCard, type TableColumn } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { TableSkeleton, ErrorState } from "@/components/ui/data-states"
import { StatCard } from "@/components/ui/stat-card"
import { STOCK_STATUS_CONFIG } from "@/constants/status-maps"

import { Plus, Package, AlertOctagon, Boxes, Filter, MoreHorizontal, ArrowDownRight, ArrowUpRight } from "lucide-react"
import type { Product } from "@/types"

export default function InventoryPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.inventory.list(),
    queryFn: operationsService.getInventory,
  })

  const totalProducts = data?.length || 0
  const totalValue = data?.reduce((acc, curr) => acc + (curr.costPrice * curr.stock), 0) || 0
  const lowStockCount = data?.filter(p => p.status === "low_stock" || p.status === "out_of_stock").length || 0

  const columns: TableColumn<Product>[] = [
    {
      key: "sku",
      label: "SKU",
      render: (row) => <MonoId value={row.sku} />,
    },
    {
      key: "name",
      label: "Product Name",
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">{row.name}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{row.category}</div>
        </div>
      ),
    },
    {
      key: "stock",
      label: "Stock Level",
      align: "center",
      render: (row) => (
        <div className="flex flex-col items-center">
          <span className={`font-bold ${row.stock <= row.minStock ? (row.stock === 0 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400') : 'text-slate-900 dark:text-white'}`}>
            {row.stock} {row.unit || 'units'}
          </span>
          <span className="text-[10px] text-slate-500">Min: {row.minStock}</span>
        </div>
      ),
    },
    {
      key: "price",
      label: "Pricing",
      align: "right",
      render: (row) => (
        <div className="text-sm">
          <div className="flex justify-end items-center gap-1.5 font-medium text-slate-900 dark:text-white">
            <ArrowUpRight className="w-3 h-3 text-emerald-500" />
            {formatCurrency(row.unitPrice)}
          </div>
          <div className="flex justify-end items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <ArrowDownRight className="w-3 h-3 text-red-400" />
            Cost: {formatCurrency(row.costPrice)}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => {
        const config = STOCK_STATUS_CONFIG[row.status]
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
        title="Inventory" 
        subtitle="Manage products, equipment, and stock levels"
        action={<PrimaryButton icon={Plus}>Add Item</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Products"
          value={totalProducts.toString()}
          icon={Package}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Inventory Value (Cost)"
          value={formatCompact(totalValue)}
          icon={Boxes}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Low/Out of Stock"
          value={lowStockCount.toString()}
          alert={lowStockCount > 0 ? "Reorder Needed" : undefined}
          alertType="danger"
          icon={AlertOctagon}
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
          title="Product Catalog"
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
