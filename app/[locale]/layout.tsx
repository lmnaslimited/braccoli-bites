import type React from "react";
import type { Metadata, Viewport } from "next";
import "@repo/ui/globals.css";
import { GeistSans } from "geist/font/sans";
import { fnGetCacheData } from "../api/strapi/get-data";
import ChatInit from "../../components/chat-int";
import Footer from "@repo/ui/components/footer";
import Navbar from "@repo/ui/components/navbar";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { clTransformerFactory } from "@repo/middleware";
import {
  Tcontext,
  TfooterTarget,
  TglobalMetaTarget,
  TnavbarTarget,
  TseoIcons,
} from "@repo/middleware/types";
import NewsletterIdentifyListener from "@/components/newsletter-identify-listener";
import ClientLayout from "@/components/client-layout";
import AppRecaptchaProvider from "@repo/ui/components/recaptcha-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
};

async function fnGetGlobalData(locale: string) {
  const context: Tcontext = { locale };

  const globalMetaData: TglobalMetaTarget = await fnGetCacheData(
    context,
    clTransformerFactory.createTransformer("globalMeta"),
  );

  return globalMetaData?.globalMeta;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const data = await fnGetGlobalData(locale);

  if (!data) return {};

  return {
    metadataBase: data.metadataBase ? new URL(data.metadataBase) : undefined,
    robots: {
      index: data.robotsIndex,
      follow: data.robotsFollow,
      nocache: data.robotsNocache,
      googleBot: {
        index: data.googleBotIndex,
        follow: data.googleBotFollow,
        "max-snippet": data.googleBotMaxSnippet,
        "max-image-preview": data.googleBotMaxImagePreview,
        "max-video-preview": data.googleBotMaxVideoPreview,
      },
    },
    authors:
      data.authorsName && data.authorsURL
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
  };
}

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{
    locale: string;
  }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  const Ldcontext: Tcontext = { locale: locale };

  const LdfooterData: TfooterTarget = await fnGetCacheData(
    Ldcontext,
    clTransformerFactory.createTransformer("footer"),
  );

  const LdnavbarData: TnavbarTarget = await fnGetCacheData(
    Ldcontext,
    clTransformerFactory.createTransformer("navbar"),
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           <AppRecaptchaProvider>
          <Navbar idNavbar={LdnavbarData} />
          <main className="">
            <ClientLayout>
            {children}
            </ClientLayout>
          </main>
          <Footer idFooter={LdfooterData} />
          </AppRecaptchaProvider>
        </ThemeProvider>
        <NewsletterIdentifyListener />
        <ChatInit />
      </body>
    </html>
  );
}
