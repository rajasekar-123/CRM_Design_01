"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as crmService from "@/services/crm.service"
import { formatCurrency, formatCompact } from "@/utils/format"

import { PageHeader, PrimaryButton, MonoId, UserAvatar } from "@/components/ui/page-primitives"
import { TableCard, type TableColumn } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { TableSkeleton, ErrorState } from "@/components/ui/data-states"
import { StatCard } from "@/components/ui/stat-card"
import { CUSTOMER_STATUS_CONFIG } from "@/constants/status-maps"

import { Plus, Users, Building2, Briefcase, Filter, MoreHorizontal, Mail, Phone } from "lucide-react"
import type { Customer } from "@/types"

export default function CustomersPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.customers.list(),
    queryFn: crmService.getCustomers,
  })

  // Quick stats derived from data
  const totalCustomers = data?.length || 0
  const activeCustomers = data?.filter(c => c.status === "active").length || 0
  const enterpriseCustomers = data?.filter(c => c.type === "enterprise").length || 0
  const totalRevenue = data?.reduce((acc, curr) => acc + curr.totalBusiness, 0) || 0

  const columns: TableColumn<Customer>[] = [
    {
      key: "name",
      label: "Customer Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={row.name} />
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{row.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{row.type}</div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Primary Contact",
      render: (row) => (
        <div className="text-sm">
          <div className="font-medium text-slate-700 dark:text-slate-300">{row.contactPerson}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
              <Mail className="w-3 h-3" /> Email
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
              <Phone className="w-3 h-3" /> Call
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (row) => <span className="text-sm">{row.city}</span>,
    },
    {
      key: "value",
      label: "Total Value",
      align: "right",
      render: (row) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {formatCurrency(row.totalBusiness)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => {
        const config = CUSTOMER_STATUS_CONFIG[row.status]
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
        title="Customers" 
        subtitle="Manage your client relationships"
        action={<PrimaryButton icon={Plus}>Add Customer</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Customers"
          value={totalCustomers.toString()}
          icon={Users}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Active Accounts"
          value={activeCustomers.toString()}
          icon={Building2}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Enterprise Clients"
          value={enterpriseCustomers.toString()}
          icon={Briefcase}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-950/40"
        />
        <StatCard
          label="Total Lifetime Value"
          value={formatCompact(totalRevenue)}
          icon={Briefcase}
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
          title="All Customers"
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
