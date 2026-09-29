"use client"

import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import * as dashboardService from "@/services/dashboard.service"

import { SectionHeader } from "@/components/ui/page-primitives"
import { formatRelativeTime } from "@/utils/format"

export function DashboardActivityFeed() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.dashboard.activity(),
    queryFn: dashboardService.getRecentActivity,
  })

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 mt-6 h-full min-h-[400px]">
      <SectionHeader title="Recent Activity" />
      
      {isLoading ? (
        <div className="space-y-6 mt-6 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 mt-1 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
          {data?.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4 mb-6 last:mb-0">
              <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900 z-10" style={{ marginLeft: "1.25px", marginTop: "6px" }} />
              <div className="pl-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.description}
                </p>
                <time className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 block font-medium">
                  {formatRelativeTime(item.timestamp)}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
