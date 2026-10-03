"use client"

import { Search, Bell, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"

export function Topbar() {
  const pathname = usePathname()

  return (
    <header className="h-24 flex items-center justify-between shrink-0 z-20 px-8 bg-background border-none">
      
      {/* Left — Search */}
      <div className="flex-1 flex items-center">
        <div className="relative w-[400px]">
          <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full h-12 bg-muted rounded-full pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-none"
          />
        </div>
      </div>

      {/* Right — Utilities & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Live Toggle */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-5 bg-success/20 rounded-full flex items-center p-0.5 cursor-pointer">
            <div className="w-4 h-4 bg-success rounded-full shadow-sm ml-auto"></div>
          </div>
          <span className="text-sm font-medium text-foreground">Live</span>
        </div>

        {/* Language Dropdown */}
        <div className="flex items-center gap-2 border border-border px-4 py-2 rounded-full cursor-pointer hover:bg-muted/50 transition-colors">
          <span className="text-sm font-medium text-foreground">English</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Notifications */}
        <div className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center cursor-pointer">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=E8D1FE&color=111827" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Synergy Admin</span>
            <span className="text-xs text-muted-foreground">ID: 1234567</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
        </div>

      </div>
    </header>
  )
}
