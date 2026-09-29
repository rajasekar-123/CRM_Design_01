"use client"

import { usePathname } from "next/navigation"
import { Search } from "lucide-react"

const PAGE_TITLES: Record<string, string> = {
  "/":           "Overview & Performance",
  "/crm":        "Customer Relationship Management",
  "/leads":      "Leads Pipeline",
  "/sales":      "Sales Pipeline",
  "/quotations": "Quotations",
  "/orders":     "Order Management",
  "/inventory":  "Inventory Control",
  "/service":    "Service & Support",
  "/rental":     "Rental Fleet",
  "/amc":        "AMC Management",
  "/customers":  "Customer Directory",
  "/invoices":   "Invoicing",
  "/payments":   "Payment Tracking",
  "/reports":    "Analytics & Reports",
  "/ai":         "AI Copilot",
  "/settings":   "System Settings",
}

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  const segment = "/" + pathname.split("/")[1]
  return PAGE_TITLES[segment] ?? "Dashboard"
}

export function Topbar() {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <header className="h-24 flex items-center justify-between shrink-0 z-20 px-10 bg-white border-b border-[#F0F0F0]">
      {/* Left — Dynamic Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#000000] tracking-tight">
          {pageTitle} 👋,
        </h1>
      </div>

      {/* Right — Search */}
      <div className="flex items-center">
        <div className="relative">
          <Search className="w-5 h-5 text-[#9197B3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-64 h-10 bg-white rounded-lg pl-10 pr-4 text-sm text-[#000000] placeholder:text-[#9197B3] focus:outline-none focus:ring-2 focus:ring-[#5932EA] transition-all shadow-sm"
          />
        </div>
      </div>
    </header>
  )
}
