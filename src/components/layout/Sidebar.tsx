"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Users, UserPlus, DollarSign, FileText,
  ShoppingCart, Package, Wrench, Car, BadgeCheck,
  BookUser, Receipt, CreditCard, BarChart2,
  Sparkles, Settings, ChevronRight,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

interface NavGroup {
  label: string | null
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: null,
    items: [
      { href: "/",           icon: LayoutDashboard, label: "Dashboard"  },
      { href: "/crm",        icon: Users,           label: "CRM"        },
      { href: "/leads",      icon: UserPlus,        label: "Leads"      },
      { href: "/sales",      icon: DollarSign,      label: "Sales"      },
      { href: "/quotations", icon: FileText,        label: "Quotations" },
      { href: "/orders",     icon: ShoppingCart,    label: "Orders"     },
      { href: "/inventory",  icon: Package,         label: "Inventory"  },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/service", icon: Wrench,     label: "Service" },
      { href: "/rental",  icon: Car,        label: "Rental"  },
      { href: "/amc",     icon: BadgeCheck, label: "AMC"     },
    ],
  },
  {
    label: "Finance & More",
    items: [
      { href: "/customers", icon: BookUser,   label: "Customers" },
      { href: "/invoices",  icon: Receipt,    label: "Invoices"  },
      { href: "/payments",  icon: CreditCard, label: "Payments"  },
      { href: "/reports",   icon: BarChart2,  label: "Reports"   },
    ],
  },
]

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        "nav-link relative overflow-hidden group",
        isActive ? "nav-link-active" : "nav-link-inactive hover:bg-white/5"
      )}
    >
      {/* Subtle hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.03] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
      
      <Icon className={cn("w-4 h-4 shrink-0 transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-110")} />
      <span className="flex-1 tracking-wide">{item.label}</span>
      {isActive && <ChevronRight className="w-3 h-3 opacity-60" />}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 z-30 transition-colors duration-300",
        "border-r border-slate-200/50 dark:border-white/[0.05]",
        "bg-slate-50/80 dark:bg-[#0B1120]/80 backdrop-blur-xl" // Light/Dark glassmorphism
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-slate-200/50 dark:border-white/[0.05] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-sm shadow-blue-900/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
            Synergy<span className="text-blue-600 dark:text-blue-500">Biz</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "pt-5" : ""}>
            {group.label && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 px-3 py-4 border-t border-slate-200/50 dark:border-white/[0.05] space-y-0.5 bg-gradient-to-t from-slate-100/50 to-transparent dark:from-[#0B1120] dark:to-transparent">
        <Link
          href="/ai"
          className="nav-link nav-link-inactive hover:bg-blue-50/50 dark:hover:bg-blue-900/20 group"
        >
          <Sparkles className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400 group-hover:animate-pulse" />
          <span className="flex-1 text-blue-700 dark:text-blue-300 font-medium tracking-wide">AI Copilot</span>
          <span className="text-[9px] font-bold bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full border border-blue-200 dark:border-transparent">
            AI
          </span>
        </Link>
        <Link href="/settings" className="nav-link nav-link-inactive hover:bg-slate-100/50 dark:hover:bg-white/5">
          <Settings className="w-4 h-4 shrink-0" />
          <span className="tracking-wide">Settings</span>
        </Link>
      </div>
    </aside>
  )
}
