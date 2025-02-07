import { Geist, Geist_Mono } from "next/font/google";
import "@repo/ui/globals.css";
import { Inter } from "next/font/google"
import Header from "@repo/ui/components/Header"
import Footer from "@repo/ui/components/Footer"
import type React from "react" // Added import for React

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LMNAs Cloud Solutions",
  description: "Professional cloud solutions for your business",
}

const inter = Inter({ subsets: ["latin"] })



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <body className={inter.className}> */}
        <div className="flex flex-col min-h-screen">
          {/* <Header main={"/site"} external={"/"}/> */}
          <Header />

          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
      {/* </body> */}
    </html>
  );
}


