import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "@/lib/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardShell } from "@/components/layout/DashboardShell"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "%s | SynergyBiz",
    default: "SynergyBiz | Business Management Platform",
  },
  description:
    "Premium Business Management SaaS — CRM, Sales, Service, Rental, AMC, Inventory, and Finance in one place.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#000000] transition-colors duration-300`}>
        <ThemeProvider defaultTheme="light">
          <QueryProvider>
            <DashboardShell>
              {children}
            </DashboardShell>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
