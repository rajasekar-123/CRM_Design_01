"use client"

import { Search, Filter, MessageCircle, MoreVertical } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const MOCK_LEADS = [
  { id: 1, customer: "Rajasekar", phone: "+919876543210", type: "Service", source: "WhatsApp", status: "New", assignedTo: "Unassigned", date: "2026-10-01", convId: "conv_1" },
  { id: 2, customer: "Kumar", phone: "+919876543211", type: "AMC", source: "WhatsApp", status: "Contacted", assignedTo: "Admin", date: "2026-10-01", convId: "conv_2" },
  { id: 3, customer: "Arun", phone: "+919876543212", type: "Sales", source: "WhatsApp", status: "Qualified", assignedTo: "Admin", date: "2026-09-30", convId: "conv_3" },
];

export default function WhatsAppLeadsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex flex-col gap-8 pb-10 min-h-[calc(100vh-6rem)]">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">WhatsApp CRM</h2>
          <p className="text-muted-foreground mt-1">Manage leads captured directly from Meta WhatsApp API.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-success/10 text-success px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 border border-success/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            API Connected
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-[1.5rem] border border-border shadow-sm">
          <div className="text-muted-foreground font-medium text-sm mb-2">Total WhatsApp Leads</div>
          <div className="text-3xl font-black">142</div>
        </div>
        <div className="bg-card p-6 rounded-[1.5rem] border border-border shadow-sm">
          <div className="text-muted-foreground font-medium text-sm mb-2">New Leads</div>
          <div className="text-3xl font-black text-primary">24</div>
        </div>
        <div className="bg-card p-6 rounded-[1.5rem] border border-border shadow-sm">
          <div className="text-muted-foreground font-medium text-sm mb-2">Sales Inquiries</div>
          <div className="text-3xl font-black">68</div>
        </div>
        <div className="bg-card p-6 rounded-[1.5rem] border border-border shadow-sm">
          <div className="text-muted-foreground font-medium text-sm mb-2">Service Inquiries</div>
          <div className="text-3xl font-black">35</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-card border border-border rounded-[2rem] shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search customers, phone..." 
              className="w-full h-10 bg-muted rounded-full pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-none"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
            {["All", "New", "Sales", "Service", "Rental", "AMC"].map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === f ? 'bg-primary text-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADS.map((lead) => (
                <tr key={lead.id} className="border-b border-border hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground text-sm">{lead.customer}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm font-medium">{lead.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-muted text-foreground rounded-full text-[11px] font-bold tracking-wide uppercase">
                      {lead.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-success" />
                    {lead.source}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${lead.status === 'New' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{lead.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/crm/whatsapp/${lead.convId}`}>
                      <button className="px-4 py-2 bg-foreground text-background rounded-full text-xs font-bold hover:opacity-90 transition-opacity">
                        Chat
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
