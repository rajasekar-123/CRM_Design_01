"use client"

import { Users, UserPlus, DollarSign, TrendingUp, Star, Phone, Mail, MoreHorizontal } from "lucide-react"
import { PageHeader, StatCard, SectionTitle, DataTable, StatusBadge, Avatar } from "@/components/ui/page-shell"

const contacts = [
  { name: "Arjun Mehta", company: "Apex Corp", email: "arjun@apexcorp.com", phone: "+91 98765 43210", status: "Active", value: "$42,000", rating: 5 },
  { name: "Priya Sharma", company: "TechFlow Inc", email: "priya@techflow.in", phone: "+91 91234 56789", status: "Prospect", value: "$18,500", rating: 4 },
  { name: "Rohit Nair", company: "Orion Ltd", email: "rohit@orionltd.com", phone: "+91 98000 11223", status: "Active", value: "$67,200", rating: 5 },
  { name: "Sneha Iyer", company: "BuildTech", email: "sneha@buildtech.in", phone: "+91 97654 32109", status: "Inactive", value: "$8,900", rating: 3 },
  { name: "Vikram Patel", company: "Summit Infra", email: "vikram@summitinfra.com", phone: "+91 99887 65432", status: "Prospect", value: "$23,400", rating: 4 },
  { name: "Anita Rao", company: "Greenfield Co", email: "anita@greenfield.co", phone: "+91 96321 54870", status: "Active", value: "$55,800", rating: 5 },
]

const statusVariant: Record<string, "green" | "amber" | "gray"> = {
  Active: "green",
  Prospect: "amber",
  Inactive: "gray",
}

export default function CRMPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-12">
      <PageHeader
        title="CRM"
        subtitle="Manage your customer relationships and contacts."
        actionLabel="+ Add Contact"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Contacts" value="1,248" sub="+34 this month" gradient="linear-gradient(135deg, hsl(250 80% 65%), hsl(280 70% 60%))" icon={Users} />
        <StatCard label="Active Customers" value="843" sub="67% of total" gradient="linear-gradient(135deg, hsl(160 60% 42%), hsl(175 55% 48%))" icon={TrendingUp} />
        <StatCard label="New This Month" value="67" sub="+12% vs last" gradient="linear-gradient(135deg, hsl(205 80% 55%), hsl(220 80% 60%))" icon={UserPlus} />
        <StatCard label="Avg. Deal Value" value="$36,150" sub="Up from $31,200" gradient="linear-gradient(135deg, hsl(38 92% 55%), hsl(30 90% 60%))" icon={DollarSign} />
      </div>

      {/* Contacts Table */}
      <div>
        <SectionTitle title="All Contacts" action="Export" />
        <DataTable
          headers={["Contact", "Email", "Phone", "Status", "Deal Value", "Rating"]}
          rows={contacts.map((c) => [
            <div key="contact" className="flex items-center gap-3">
              <Avatar name={c.name} />
              <div>
                <div className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>{c.name}</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{c.company}</div>
              </div>
            </div>,
            <div key="email" className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              <Mail className="w-3 h-3" />{c.email}
            </div>,
            <div key="phone" className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              <Phone className="w-3 h-3" />{c.phone}
            </div>,
            <StatusBadge key="status" label={c.status} variant={statusVariant[c.status]} />,
            <span key="value" className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>{c.value}</span>,
            <div key="rating" className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3" fill={i < c.rating ? "hsl(38 92% 58%)" : "none"} stroke={i < c.rating ? "hsl(38 92% 58%)" : "hsl(var(--border))"} />
              ))}
            </div>,
          ])}
        />
      </div>
    </div>
  )
}
