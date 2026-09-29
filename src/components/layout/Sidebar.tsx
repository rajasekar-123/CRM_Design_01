"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Users, UserPlus, DollarSign, FileText,
  ShoppingCart, Package, Wrench, Car, BadgeCheck,
  BookUser, Receipt, CreditCard, BarChart2,
  Settings, ChevronRight, Sparkles
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
        "nav-link relative overflow-hidden group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300",
        isActive 
          ? "bg-[#5932EA] text-white shadow-md shadow-[#5932EA]/40" 
          : "text-[#9197B3] hover:bg-[#5932EA]/5 hover:text-[#5932EA]"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("w-5 h-5 shrink-0 transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-110")} />
        <span className="font-medium tracking-wide">{item.label}</span>
      </div>
      {!isActive && item.href !== "/" && <ChevronRight className="w-4 h-4 opacity-50" />}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[280px] shrink-0 h-screen sticky top-0 z-30 bg-white border-r border-[#F0F0F0]">
      {/* Logo */}
      <div className="h-24 flex items-center px-8 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-[#000000] text-2xl tracking-tight flex items-baseline gap-1">
            Synergy<span className="text-blue-600">Biz</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-5 pb-8 space-y-4 custom-scrollbar mt-2">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="space-y-1">
            {group.label && (
              <p className="px-4 mb-2 mt-4 text-[11px] font-bold uppercase tracking-widest text-[#9197B3]">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        ))}

        {/* Footer static links inside nav to scroll together if it gets too long */}
        <div className="pt-4 border-t border-[#F0F0F0] mt-4 space-y-1">
          <Link
            href="/ai"
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-[#9197B3] hover:bg-blue-50 hover:text-blue-600 group"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium tracking-wide">AI Copilot</span>
            </div>
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-[#9197B3] hover:bg-[#5932EA]/5 hover:text-[#5932EA] group"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium tracking-wide">Settings</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="shrink-0 px-8 py-6 border-t border-[#F0F0F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E2E8F0] overflow-hidden shrink-0 flex items-center justify-center text-[#5932EA] font-bold text-lg">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#000000]">Admin User</span>
            <span className="text-xs text-[#757575]">System Administrator</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#757575] ml-auto rotate-90" />
        </div>
      </div>
    </aside>
  )
}
