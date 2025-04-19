import type React from "react"
import type { Metadata } from "next"
import { Quicksand, Inter } from 'next/font/google'
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

// Load Quicksand for body text
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
})

// Load Inter for headings
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "MacRimi | Developer",
  description: "Personal portfolio and projects by MacRimi - Proxmox VE, Docker, and application development enthusiast",
  icons: {
    icon: [
      { url: "https://macrimi.github.io/MacRimi/favicon/favicon.ico", sizes: "any" },
      { url: "https://macrimi.github.io/MacRimi/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "https://macrimi.github.io/MacRimi/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: { url: "https://macrimi.github.io/MacRimi/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "https://macrimi.github.io/MacRimi/favicon/favicon.ico",
    other: [
      { url: "https://macrimi.github.io/MacRimi/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "https://macrimi.github.io/MacRimi/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  manifest: "https://macrimi.github.io/MacRimi/favicon/site.webmanifest",
  keywords: ["MacRimi", "Developer", "Proxmox", "Docker", "HWEncoderX", "ProxMenux"],
  authors: [{ name: "MacRimi" }],
  creator: "MacRimi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://macrimi.pro",
    title: "MacRimi | Developer",
    description: "Personal portfolio and projects by MacRimi",
    images: [
      {
        url: "https://macrimi.github.io/MacRimi/macrimi-preview.png", 
        alt: "MacRimi Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MacRimi | Developer",
    description: "Personal portfolio and projects by MacRimi",
    images: ["https://macrimi.github.io/MacRimi/macrimi-preview.png"], 
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://macrimi.github.io/MacRimi/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="https://macrimi.github.io/MacRimi/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="https://macrimi.github.io/MacRimi/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="https://macrimi.github.io/MacRimi/favicon/site.webmanifest" />
      </head>
      <body className={`${quicksand.variable} ${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}