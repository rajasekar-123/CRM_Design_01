"use client"

import { DollarSign, FileText, ShoppingBag, ChevronDown, Search } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Revenue */}
        <div className="bg-[#151B2B] rounded-[20px] p-6 flex items-center gap-5 border border-[#1E2536] shadow-lg">
          <div className="w-16 h-16 rounded-2xl bg-[#00AC56]/10 flex items-center justify-center shrink-0">
            <DollarSign className="w-7 h-7 text-[#00AC56]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Revenue</span>
            <span className="text-white text-[28px] font-bold leading-none">$1.25M</span>
            <div className="text-xs font-medium flex items-center gap-1 mt-2">
              <span className="text-[#00AC56]">↑ 12.5%</span>
              <span className="text-slate-500">this month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pending Payments */}
        <div className="bg-[#151B2B] rounded-[20px] p-6 flex items-center gap-5 border border-[#1E2536] shadow-lg">
          <div className="w-16 h-16 rounded-2xl bg-[#5A32EA]/10 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7 text-[#5A32EA]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Pending Payments</span>
            <span className="text-white text-[28px] font-bold leading-none">$45.2k</span>
            <div className="text-xs font-medium flex items-center gap-1 mt-2">
              <span className="text-[#D0004B]">3 Overdue</span>
              <span className="text-slate-500">invoices</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Sales */}
        <div className="bg-[#151B2B] rounded-[20px] p-6 flex items-center gap-5 border border-[#1E2536] shadow-lg">
          <div className="w-16 h-16 rounded-2xl bg-[#D0004B]/10 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-7 h-7 text-[#D0004B]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Sales</span>
            <span className="text-white text-[28px] font-bold leading-none">842</span>
            <div className="text-xs font-medium flex items-center gap-1 mt-2">
              <span className="text-[#00AC56]">↑ 8%</span>
              <span className="text-slate-500">this week</span>
            </div>
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overview Bar Chart */}
        <div className="lg:col-span-2 bg-[#151B2B] border border-[#1E2536] rounded-[20px] p-6 shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-[22px] font-bold text-white">Revenue Overview</h3>
              <p className="text-slate-400 text-sm">Monthly Performance</p>
            </div>
            <div className="flex items-center gap-2 bg-[#1C2333] px-3 py-1.5 rounded-lg text-slate-400 text-xs font-medium cursor-pointer hover:bg-[#1E2536]">
              Quarterly <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          
          {/* Simple CSS Bar Chart Representation */}
          <div className="flex items-end justify-between h-[200px] mt-4 px-2">
            {[
              { month: 'Jan', height: '60%' },
              { month: 'Feb', height: '45%' },
              { month: 'Mar', height: '80%' },
              { month: 'Apr', height: '65%' },
              { month: 'May', height: '70%' },
              { month: 'Jun', height: '35%' },
              { month: 'Jul', height: '75%' },
              { month: 'Aug', height: '100%', active: true },
              { month: 'Sep', height: '90%' },
              { month: 'Oct', height: '65%' },
              { month: 'Nov', height: '55%' },
              { month: 'Dec', height: '60%' },
            ].map((bar) => (
              <div key={bar.month} className="flex flex-col items-center gap-3 w-full group cursor-pointer">
                <div 
                  className={`w-10 rounded-xl transition-colors duration-300 ${bar.active ? 'bg-[#5A32EA]' : 'bg-[#1C2333] group-hover:bg-[#5A32EA]/50'}`}
                  style={{ height: bar.height }}
                />
                <span className="text-[13px] font-medium text-slate-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customers Donut Chart */}
        <div className="lg:col-span-1 bg-[#151B2B] border border-[#1E2536] rounded-[20px] p-6 shadow-lg flex flex-col">
          <div>
            <h3 className="text-[22px] font-bold text-white">Active Operations</h3>
            <p className="text-slate-400 text-sm">Distribution by department</p>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative mt-6">
            <div className="w-56 h-56 rounded-full border-[32px] border-[#1C2333] relative flex items-center justify-center">
              <div 
                className="absolute inset-[-32px] rounded-full"
                style={{
                  background: 'conic-gradient(#5A32EA 0% 40%, #1C2333 40% 65%, #F4308D 65% 100%)',
                  WebkitMaskImage: 'radial-gradient(transparent 62%, black 62.5%)',
                  maskImage: 'radial-gradient(transparent 62%, black 62.5%)'
                }}
              />
              <div className="flex flex-col items-center justify-center z-10 bg-[#151B2B] rounded-full w-40 h-40 shadow-sm border border-[#1E2536]">
                <span className="text-[32px] font-bold text-white leading-tight">65%</span>
                <span className="text-[13px] font-medium text-slate-400 text-center leading-tight mt-1">Active<br/>Service</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Product Sell Table */}
      <div className="bg-[#151B2B] border border-[#1E2536] rounded-[20px] p-6 shadow-lg">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[22px] font-bold text-white">Recent Orders</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search orders" 
                className="w-48 h-9 bg-[#1C2333] border border-[#1E2536] rounded-lg pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#5932EA] transition-all"
              />
            </div>
            <div className="flex items-center gap-2 bg-[#1C2333] px-3 py-2 rounded-lg text-slate-400 text-xs font-medium cursor-pointer hover:bg-[#1E2536]">
              Last 30 days <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1E2536]">
              <th className="pb-3 text-slate-400 font-medium text-sm w-3/5">Order Details</th>
              <th className="pb-3 text-slate-400 font-medium text-sm text-center">Status</th>
              <th className="pb-3 text-slate-400 font-medium text-sm text-center">Total</th>
              <th className="pb-3 text-slate-400 font-medium text-sm text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'ORD-2026-1001', desc: 'Apex Corporation', stock: 'Processing', price: '$ 33,000', sales: 'Oct 24', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop' },
              { name: 'ORD-2026-1002', desc: 'Global Tech Solutions', stock: 'Delivered', price: '$ 26,500', sales: 'Oct 12', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=150&auto=format&fit=crop' },
              { name: 'ORD-2026-1003', desc: 'Nexus Trading', stock: 'Confirmed', price: '$ 9,350', sales: 'Oct 05', img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=150&auto=format&fit=crop' },
            ].map((product, i) => (
              <tr key={i} className={i !== 2 ? "border-b border-[#1E2536]/50 hover:bg-[#1C2333]" : "hover:bg-[#1C2333]"}>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <img src={product.img} alt={product.name} className="w-20 h-12 object-cover rounded-xl opacity-20" />
                    <div>
                      <div className="font-bold text-[15px] text-white">{product.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{product.desc}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-center text-slate-300 text-sm font-medium">{product.stock}</td>
                <td className="py-4 text-center text-white text-sm font-bold">{product.price}</td>
                <td className="py-4 text-center text-slate-300 text-sm font-medium">{product.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
