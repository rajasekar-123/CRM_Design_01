"use client"

import { useState } from "react"
import { Search, MoreVertical, Phone, Paperclip, Send, Check, CheckCheck } from "lucide-react"

export default function WhatsAppConversationPage({ params }: { params: { conversationId: string } }) {
  const [message, setMessage] = useState("")

  // Mock data for UI demonstration
  const messages = [
    { id: 1, text: "Hi, I need help with machine maintenance.", dir: "in", time: "10:30 AM", status: "read" },
    { id: 2, text: "Hello! We can certainly help with that. Could you provide the machine model number?", dir: "out", time: "10:35 AM", status: "read" },
    { id: 3, text: "It's a CAT-320 Excavator.", dir: "in", time: "10:40 AM", status: "read" },
    { id: 4, text: "Thank you. Our service team will call you shortly to schedule a visit.", dir: "out", time: "10:42 AM", status: "delivered" },
  ]

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-6rem)] pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-foreground tracking-tight">Conversation</h2>
      </div>

      <div className="flex-1 bg-card border border-border rounded-[2rem] shadow-sm flex overflow-hidden">
        
        {/* Left Side: Conversation List */}
        <div className="w-[350px] border-r border-border bg-muted/10 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full h-10 bg-muted rounded-full pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Active chat item */}
            <div className="p-4 bg-muted border-l-4 border-primary cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-foreground text-sm">Rajasekar</span>
                <span className="text-xs text-muted-foreground font-medium">10:42 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground truncate w-48">Our service team will call you...</p>
                <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-bold">1</div>
              </div>
            </div>
            {/* Inactive chat item */}
            <div className="p-4 hover:bg-muted/50 cursor-pointer border-l-4 border-transparent transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-foreground text-sm">Kumar</span>
                <span className="text-xs text-muted-foreground font-medium">Yesterday</span>
              </div>
              <p className="text-xs text-muted-foreground truncate w-48">When does my AMC expire?</p>
            </div>
          </div>
        </div>

        {/* Right Side: Chat Window */}
        <div className="flex-1 flex flex-col bg-background/50 relative">
          
          {/* Chat Header */}
          <div className="h-[72px] border-b border-border px-6 flex items-center justify-between bg-card/80 backdrop-blur z-10 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/20 text-primary font-bold rounded-full flex items-center justify-center">R</div>
              <div>
                <h3 className="font-bold text-foreground">Rajasekar</h3>
                <p className="text-xs text-success font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                  Active on WhatsApp
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="px-4 py-1.5 bg-muted text-foreground text-xs font-bold rounded-full hover:bg-muted/80">
                View Lead
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar bg-[#f8f9fa] dark:bg-background">
            <div className="text-center my-4">
              <span className="px-3 py-1 bg-muted/80 text-muted-foreground text-[10px] font-bold uppercase tracking-wider rounded-full">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col max-w-[70%] ${msg.dir === 'out' ? 'self-end items-end' : 'self-start items-start'}`}>
                <div 
                  className={`p-4 shadow-sm text-[15px] ${
                    msg.dir === 'out' 
                      ? 'bg-primary text-foreground rounded-[1.5rem] rounded-tr-sm' 
                      : 'bg-card text-foreground border border-border/50 rounded-[1.5rem] rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 px-2">
                  <span className="text-[11px] font-medium text-muted-foreground">{msg.time}</span>
                  {msg.dir === 'out' && (
                    msg.status === 'read' ? <CheckCheck className="w-3.5 h-3.5 text-primary" /> 
                    : <Check className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-card border-t border-border flex items-center gap-3 shrink-0">
            <button className="p-3 text-muted-foreground hover:bg-muted rounded-full transition-colors shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 h-12 bg-muted rounded-full px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-none"
            />
            <button className="w-12 h-12 bg-foreground text-background flex items-center justify-center rounded-full hover:opacity-90 transition-opacity shrink-0 shadow-md">
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
