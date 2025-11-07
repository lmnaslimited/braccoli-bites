import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from 'geist/font/sans';
import "@repo/ui/globals.css"
import { ThemeProvider } from "@repo/ui/components/theme-provider"
import { clTransformerFactory, Tcontext, TglobalMetaTarget, TseoIcons } from "@repo/middleware";
import { fnGetCacheData } from "./api/getData";

async function fnGetGlobalData(locale: string) {
  const context: Tcontext = { locale }

  const globalMetaData: TglobalMetaTarget = await fnGetCacheData(
    context,
    clTransformerFactory.createTransformer("globalMeta")
  )

  return globalMetaData?.globalMeta
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const data = await fnGetGlobalData(locale)

  if (!data) return {}

  return {
    metadataBase: data.metadataBase ? new URL(data.metadataBase) : undefined,
    robots: {
      index: data.robotsIndex,
      follow: data.robotsFollow,
      nocache: data.robotsNocache,
      googleBot: {
        index: data.googleBotIndex,
        follow: data.googleBotFollow,
        'max-snippet': data.googleBotMaxSnippet,
        'max-image-preview': data.googleBotMaxImagePreview,
        'max-video-preview': data.googleBotMaxVideoPreview,
      },
    },
    authors: data.authorsName && data.authorsURL
      ? [{ name: data.authorsName, url: data.authorsURL }]
      : undefined,
    creator: data.creator,
    publisher: data.publisher,
    applicationName: data.applicationName,
    icons: {
      icon: data.icons?.map((icon: TseoIcons) => ({
        url: icon.url,
        sizes: icon.sizes,
        type: icon.type,
      })),
      apple: data.apple?.map((icon: TseoIcons) => ({
        url: icon.url,
        sizes: icon.sizes,
        type: icon.type,
      })),
      shortcut: data.shortcut,
    },
    appleWebApp: {
      capable: data.appleWebAppCapable,
      title: data.appleWebAppTitle,
      statusBarStyle: data.appleWebAppStatusBarStyle,
    },
    manifest: data.manifest,
    alternates: {
            canonical: "https://lmnas.com/en/blog",
    },
  }
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