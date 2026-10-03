"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Users, UserPlus, DollarSign, FileText,
  ShoppingCart, Package, Wrench, Car, BadgeCheck,
  BookUser, Receipt, CreditCard, BarChart2,
  Settings, ChevronRight, Sparkles, MessageCircle
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
    label: "Communications",
    items: [
      { href: "/crm/whatsapp", icon: MessageCircle, label: "WhatsApp" },
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
        "nav-link relative group flex items-center justify-between px-4 py-2.5 transition-all duration-300",
        isActive 
          ? "text-foreground font-bold" 
          : "text-muted-foreground hover:text-foreground font-medium"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
          isActive ? "bg-muted text-foreground" : "text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
        )}>
          <Icon className="w-4 h-4 shrink-0" />
        </div>
        <span className={cn("tracking-wide text-[15px]")}>{item.label}</span>
      </div>
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[260px] shrink-0 h-screen sticky top-0 z-30 bg-sidebar-bg border-r border-border">
      {/* Logo */}
      <div className="h-24 flex items-center px-8 shrink-0">
        <span className="font-black text-foreground text-[28px] tracking-tight">
          CopyCore
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-5 pb-8 space-y-4 custom-scrollbar mt-2">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="space-y-1">
            {group.label && (
              <div className="flex items-center justify-between px-4 mb-2 mt-6">
                <p className="text-[13px] font-bold text-foreground">
                  {group.label}
                </p>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground rotate-90" />
              </div>
            )}
            {group.items.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        ))}

        {/* Footer static links inside nav to scroll together if it gets too long */}
        <div className="pt-4 border-t border-border mt-4 space-y-1">
          <Link
            href="/ai"
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-sidebar-fg hover:bg-primary/10 hover:text-primary group"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium tracking-wide">AI Copilot</span>
            </div>
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-sidebar-fg hover:bg-sidebar-hover hover:text-sidebar-active group"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium tracking-wide">Settings</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="shrink-0 px-6 py-6 mt-auto">
        {/* User profile is moved to Topbar in the new design, so this could be removed, but we'll leave it as a slim footer if needed, or remove it and put it in Topbar. I'll hide it for now to match Payd. */}
      </div>
    </aside>
  )
}
