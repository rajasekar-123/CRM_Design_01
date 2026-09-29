"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as operationsService from "@/services/operations.service"
import { formatRelativeTime } from "@/utils/format"

import { PageHeader, PrimaryButton, MonoId, UserAvatar } from "@/components/ui/page-primitives"
import { TableCard, type TableColumn } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { TableSkeleton, ErrorState } from "@/components/ui/data-states"
import { StatCard } from "@/components/ui/stat-card"
import { TICKET_STATUS_CONFIG } from "@/constants/status-maps"

import { Plus, Wrench, AlertTriangle, Clock, Filter, MoreHorizontal, User } from "lucide-react"
import type { ServiceTicket } from "@/types"

export default function ServicePage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.service.list(),
    queryFn: operationsService.getServiceTickets,
  })

  const totalTickets = data?.length || 0
  const openTickets = data?.filter(t => t.status !== "completed" && t.status !== "closed").length || 0
  const highPriority = data?.filter(t => t.priority === "high" || t.priority === "urgent").length || 0

  const columns: TableColumn<ServiceTicket>[] = [
    {
      key: "id",
      label: "Ticket ID",
      render: (row) => <MonoId value={row.ticketNumber} />,
    },
    {
      key: "issue",
      label: "Issue / Customer",
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-white mb-0.5">{row.issue}</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <UserAvatar name={row.customerName} size="xs" />
            <span>{row.customerName}</span>
          </div>
        </div>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      align: "center",
      render: (row) => {
        const isHigh = row.priority === "high" || row.priority === "urgent"
        return (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${isHigh ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'} uppercase`}>
            {isHigh && <AlertTriangle className="w-3 h-3" />}
            {row.priority}
          </span>
        )
      },
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => {
        const config = TICKET_STATUS_CONFIG[row.status]
        return <StatusBadge label={config.label} variant={config.variant} />
      },
    },
    {
      key: "technician",
      label: "Technician",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
          <User className="w-3.5 h-3.5 text-slate-400" />
          {row.technicianName || "Unassigned"}
        </span>
      ),
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
        title="Service Operations" 
        subtitle="Manage service tickets and technician dispatch"
        action={<PrimaryButton icon={Plus}>New Ticket</PrimaryButton>}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Open Tickets"
          value={openTickets.toString()}
          icon={Wrench}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          label="High/Urgent Priority"
          value={highPriority.toString()}
          alert={highPriority > 0 ? "Requires Attention" : undefined}
          alertType="danger"
          icon={AlertTriangle}
          iconColor="text-red-600 dark:text-red-400"
          iconBg="bg-red-50 dark:bg-red-950/40"
        />
        <StatCard
          label="Unassigned"
          value={data?.filter(t => !t.technicianId && t.status !== "completed").length.toString() || "0"}
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
          title="Active Tickets"
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
