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
import { LEAD_STAGE_CONFIG } from "@/constants/status-maps"

import { Plus, Target, Trophy, Flame, Filter, MoreHorizontal, User } from "lucide-react"
import type { Lead } from "@/types"

export default function LeadsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.leads.list(),
    queryFn: crmService.getLeads,
  })

  const totalLeads = data?.length || 0
  const activeValue = data?.filter(l => l.stage !== "closed_lost" && l.stage !== "closed_won").reduce((acc, curr) => acc + curr.value, 0) || 0
  const hotLeads = data?.filter(l => l.stage === "proposal" || l.stage === "negotiation").length || 0

  const columns: TableColumn<Lead>[] = [
    {
      key: "id",
      label: "Lead ID",
      render: (row) => <MonoId value={row.id} />,
    },
    {
      key: "name",
      label: "Prospect",
      render: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={row.name} size="xs" />
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{row.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{row.company}</div>
          </div>
        </div>
      ),
    },
    {
      key: "value",
      label: "Value",
      align: "right",
      render: (row) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {formatCurrency(row.value)}
        </span>
      ),
    },
    {
      key: "stage",
      label: "Stage",
      align: "center",
      render: (row) => {
        const config = LEAD_STAGE_CONFIG[row.stage]
        return <StatusBadge label={config.label} variant={config.variant} />
      },
    },
    {
      key: "assigned",
      label: "Assigned To",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
          <User className="w-3.5 h-3.5 text-slate-400" />
          {row.assignedTo || "Unassigned"}
        </span>
      ),
    },
    {
      key: "age",
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
        title="Lead Management" 
        subtitle="Track and convert prospects into customers"
        action={<PrimaryButton icon={Plus}>New Lead</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Active Leads"
          value={totalLeads.toString()}
          icon={Target}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="Pipeline Value"
          value={formatCompact(activeValue)}
          icon={Trophy}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          label="Hot Leads (Proposal/Neg.)"
          value={hotLeads.toString()}
          alert={hotLeads > 2 ? "High Priority" : undefined}
          alertType="warning"
          icon={Flame}
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
          title="Active Leads"
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
