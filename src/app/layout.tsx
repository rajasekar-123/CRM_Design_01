import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "@/lib/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardShell } from "@/components/layout/DashboardShell"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter", /* Keeping the variable name same to avoid changing tailwind config */
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
      <body className={`${plusJakarta.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}>
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
