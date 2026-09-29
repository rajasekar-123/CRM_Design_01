"use client"

import { usePathname } from "next/navigation"
import { Bell, Search, ChevronDown, Sun, Moon } from "lucide-react"
import { UserAvatar } from "@/components/ui/page-primitives"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

const PAGE_TITLES: Record<string, string> = {
  "/":           "Dashboard",
  "/crm":        "CRM",
  "/leads":      "Leads",
  "/sales":      "Sales",
  "/quotations": "Quotations",
  "/orders":     "Orders",
  "/inventory":  "Inventory",
  "/service":    "Service",
  "/rental":     "Rental",
  "/amc":        "AMC",
  "/customers":  "Customers",
  "/invoices":   "Invoices",
  "/payments":   "Payments",
  "/reports":    "Reports",
  "/ai":         "AI Copilot",
  "/settings":   "Settings",
}

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  const segment = "/" + pathname.split("/")[1]
  return PAGE_TITLES[segment] ?? "SynergyBiz"
}

export function Topbar() {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)
  const { theme, setTheme } = useTheme()

  return (
    <header className={cn(
      "h-14 flex items-center justify-between px-6 shrink-0 z-20 sticky top-0",
      "border-b border-slate-200/50 dark:border-slate-800/50",
      "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-colors duration-300"
    )}>

      {/* Left — page title */}
      <div>
        <h1 className="text-sm font-semibold text-slate-900 dark:text-white">
          {pageTitle}
        </h1>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 text-xs transition-colors hover:bg-slate-200/80 dark:hover:bg-slate-700/80 cursor-text border border-transparent dark:border-slate-800">
          <Search className="w-3.5 h-3.5" />
          <span>Search…</span>
          <kbd className="ml-1 text-[9px] font-bold bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded shadow-sm text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            ⌘K
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={cn(
            "relative w-8 h-8 flex items-center justify-center rounded-lg",
            "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
            "hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
          )}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 animate-in spin-in-12 duration-500" />
          ) : (
            <Moon className="w-4 h-4 animate-in spin-in-12 duration-500" />
          )}
        </button>

        {/* Notifications */}
        <button
          className={cn(
            "relative w-8 h-8 flex items-center justify-center rounded-lg",
            "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
            "hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
          )}
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
        </button>

        {/* User */}
        <button
          className={cn(
            "flex items-center gap-2 h-8 pl-1 pr-2 rounded-lg",
            "hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
          )}
          aria-label="User menu"
        >
          <UserAvatar name="Admin User" size="xs" />
          <span className="hidden sm:block text-xs font-medium text-slate-700 dark:text-slate-300">
            Admin
          </span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

      </div>
    </header>
  )
}
