"use client"

import { ChevronDown, Search, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-10 min-h-[calc(100vh-6rem)]">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pt-4">
        
        {/* Greeting & Main Stat */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
         
            <span className="text-warning font-bold text-lg">Hey Admin!</span>
          </div>
          <h2 className="text-4xl font-black text-foreground tracking-tight">
            You earned $ 1,250,000 this month.
          </h2>
        </div>

        {/* Chart Section */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full cursor-pointer hover:bg-muted/80 transition-colors">
              <span className="text-sm font-semibold text-primary">Last 30 days</span>
              <ChevronDown className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Large Card for Chart */}
          <div className="bg-card rounded-[2rem] p-8 border border-border/50 shadow-sm relative h-[300px] flex items-end">
            
            {/* Horizontal Dashed Lines */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
              {[200000, 150000, 100000, 50000, 0].map((val, i) => (
                <div key={i} className="flex items-center gap-4 w-full relative">
                  <span className="text-xs font-medium text-muted-foreground w-12 text-right">{val === 0 ? '0' : (val/1000).toLocaleString() + 'k'}</span>
                  <div className="flex-1 border-b border-dashed border-border"></div>
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="w-full flex justify-between items-end pl-20 pr-4 h-[220px] relative z-10">
              {[
                { label: 'Mar 1 - 7', height: '25%' },
                { label: 'Mar 8 - 14', height: '60%' },
                { label: 'Mar 15 - 21', height: '60%' },
                { label: 'Mar 22 - 28', height: '60%' },
                { label: 'Final wk', height: '95%' },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-4 w-16 group cursor-pointer h-full justify-end">
                  <div 
                    className="w-full rounded-t-xl bg-primary hover:bg-primary/80 transition-colors duration-300"
                    style={{ height: bar.height }}
                  />
                  <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-[2rem] p-8 border border-border/50 shadow-sm h-48 flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-1">Success rate</h3>
            <p className="text-sm text-muted-foreground mb-auto">Compared to last month</p>
            <div className="text-3xl font-black text-foreground">98.5%</div>
          </div>
          <div className="bg-card rounded-[2rem] p-8 border border-border/50 shadow-sm h-48 flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-1">Payment issues</h3>
            <p className="text-sm text-muted-foreground mb-auto">Requires your attention</p>
            <div className="text-3xl font-black text-foreground">12</div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Panel */}
      <div className="w-full lg:w-[380px] shrink-0 bg-muted/50 rounded-[2.5rem] p-6 flex flex-col border border-border/50 shadow-sm">
        
        {/* Tabs */}
        <div className="flex items-center justify-between mb-8 px-4 mt-2">
          <div className="text-muted-foreground font-semibold cursor-pointer">Stats</div>
          <div className="text-foreground font-bold cursor-pointer border-b-2 border-foreground pb-1">Messages</div>
        </div>

        {/* Messages List */}
        <div className="flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar">
          
          {[
            { id: 1, name: 'James Robinson', time: 'Jan 2, 12:31pm', msg: 'I need some maintenac...', initial: 'J', color: 'bg-[#43B9B9]', textColor: 'text-white' },
            { id: 2, name: 'Eseosa Igbinobaro', time: 'Wed, 06:00pm', msg: 'I got your email ad and ...', initial: 'E', color: 'bg-[#8F63B9]', textColor: 'text-white' },
            { id: 3, name: 'James Robinson', time: 'Jan 2, 12:31pm', msg: 'I need some maintenac...', initial: 'J', color: 'bg-[#43B9B9]', textColor: 'text-white' },
            { id: 4, name: 'Laila Hassan', time: 'Feb 13, 08:15pm', msg: 'Order has been confir...', initial: 'L', color: 'bg-[#F9A826]', textColor: 'text-white' },
            { id: 5, name: 'Samuel Doe', time: 'Yesterday', msg: 'Please check the invoi...', initial: 'S', color: 'bg-[#E6CCFF]', textColor: 'text-[#4A1E7A]' },
          ].map((msg) => (
            <div key={msg.id} className="bg-card rounded-3xl p-5 flex flex-col gap-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${msg.color} ${msg.textColor}`}>
                  {msg.initial}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">{msg.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[15px] font-bold text-foreground">{msg.name}</h4>
                  <p className="text-[13px] text-muted-foreground truncate w-48">{msg.msg}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-foreground -rotate-90 shrink-0" />
              </div>
            </div>
          ))}
          
        </div>

      </div>

    </div>
  )
}
