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
  title: "MacRimi | Developer & Tech Enthusiast",
  description: "Personal portfolio and projects by MacRimi - Proxmox VE, Docker, and application development enthusiast",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon/favicon.ico",
    other: [
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  manifest: "/favicon/site.webmanifest",
  keywords: ["MacRimi", "Developer", "Proxmox", "Docker", "HWEncoderX", "ProxMenux"],
  authors: [{ name: "MacRimi" }],
  creator: "MacRimi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://macrimi.github.io",
    title: "MacRimi | Developer & Tech Enthusiast",
    description: "Personal portfolio and projects by MacRimi",
    images: [
      {
        url: "/favicon/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "MacRimi Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MacRimi | Developer & Tech Enthusiast",
    description: "Personal portfolio and projects by MacRimi",
    images: ["/favicon/web-app-manifest-512x512.png"],
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
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`${quicksand.variable} ${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}