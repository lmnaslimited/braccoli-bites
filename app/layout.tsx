import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from 'geist/font/sans';
import "@repo/ui/globals.css"
import { ThemeProvider } from "@repo/ui/components/theme-provider"

export const metadata: Metadata = {
  title: "LMNAs Cloud Solutions - AI-Powered ERP Solutions",
  description: "Enterprise-grade cloud solutions with AI integration for modern businesses",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

