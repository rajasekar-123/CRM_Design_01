"use client"

import { ShoppingCart, Package, Truck, CheckCircle, Calendar } from "lucide-react"
import { PageHeader, StatCard, SectionTitle, DataTable, StatusBadge } from "@/components/ui/page-shell"

const orders = [
  { id: "PO-3301", customer: "Apex Corp", items: "Generator 500kVA × 1", qty: 1, total: "$42,000", status: "Delivered", date: "Sep 28, 2026" },
  { id: "PO-3300", customer: "TechFlow Inc", items: "HVAC System × 2", qty: 2, total: "$37,000", status: "Shipped", date: "Sep 27, 2026" },
  { id: "PO-3299", customer: "Orion Ltd", items: "UPS 10KVA × 5", qty: 5, total: "$41,500", status: "Processing", date: "Sep 26, 2026" },
  { id: "PO-3298", customer: "Summit Infra", items: "Inverter 5KW × 10", qty: 10, total: "$24,900", status: "Pending", date: "Sep 25, 2026" },
  { id: "PO-3297", customer: "BuildTech", items: "Transformer 25KVA × 2", qty: 2, total: "$18,600", status: "Delivered", date: "Sep 23, 2026" },
  { id: "PO-3296", customer: "Greenfield Co", items: "Cooling Tower Model X", qty: 1, total: "$67,200", status: "Cancelled", date: "Sep 20, 2026" },
]

const statusVariant: Record<string, "green" | "blue" | "amber" | "red" | "purple"> = {
  Delivered: "green",
  Shipped: "blue",
  Processing: "purple",
  Pending: "amber",
  Cancelled: "red",
}

export default function OrdersPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-12">
      <PageHeader title="Orders" subtitle="Manage purchase orders and deliveries." actionLabel="+ New Order" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value="3,301" sub="All time" gradient="linear-gradient(135deg, hsl(250 80% 65%), hsl(280 70% 60%))" icon={ShoppingCart} />
        <StatCard label="Pending" value="48" sub="Awaiting dispatch" gradient="linear-gradient(135deg, hsl(38 92% 55%), hsl(30 90% 60%))" icon={Package} />
        <StatCard label="In Transit" value="23" sub="On the way" gradient="linear-gradient(135deg, hsl(205 80% 55%), hsl(220 80% 60%))" icon={Truck} />
        <StatCard label="Delivered" value="189" sub="This month" gradient="linear-gradient(135deg, hsl(160 60% 42%), hsl(175 55% 48%))" icon={CheckCircle} />
      </div>

      <div>
        <SectionTitle title="All Orders" action="Export" />
        <DataTable
          headers={["Order ID", "Customer", "Items", "Qty", "Total", "Status", "Date"]}
          rows={orders.map((o) => [
            <span key="id" className="text-[13px] font-mono font-bold text-[#A886FF]">{o.id}</span>,
            <span key="cust" className="font-bold text-[15px] text-white">{o.customer}</span>,
            <span key="items" className="text-xs text-slate-400 font-medium">{o.items}</span>,
            <span key="qty" className="text-sm font-bold text-white">{o.qty}</span>,
            <span key="total" className="font-bold text-sm text-white">{o.total}</span>,
            <StatusBadge key="status" label={o.status} variant={statusVariant[o.status]} />,
            <div key="date" className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"><Calendar className="w-3.5 h-3.5" />{o.date}</div>,
          ])}
        />
      </div>
    </div>
  )
}
