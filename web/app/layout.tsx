import "./globals.css"
import type React from "react"
import { Quicksand, Inter } from "next/font/google"
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

export const metadata = {
  title: "MacRimi | Developer",
  generator: "Next.js",
  applicationName: "MacRimi Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: ["MacRimi", "Developer", "Proxmox", "Docker", "HWEncoderX", "ProxMenux"],
  authors: [{ name: "MacRimi" }],
  creator: "MacRimi",
  publisher: "MacRimi",
  description:
    "Personal portfolio and projects by MacRimi - Proxmox VE, Docker, and application development enthusiast",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://macrimi.pro/`),
  openGraph: {
    title: "MacRimi | Developer",
    description:
      "Personal portfolio and projects by MacRimi - Proxmox VE, Docker, and application development enthusiast",
    url: "https://macrimi.pro/",
    siteName: "MacRimi Portfolio",
    images: [
      {
        url: "https://macrimi.github.io/MacRimi/macrimi-preview.png",
        alt: "MacRimi Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MacRimi | Developer",
    description:
      "Personal portfolio and projects by MacRimi - Proxmox VE, Docker, and application development enthusiast",
    images: ["https://macrimi.github.io/MacRimi/macrimi-preview.png"],
  },
  icons: {
    icon: [
      { url: "https://macrimi.github.io/MacRimi/favicon/favicon.ico", sizes: "any" },
      { url: "https://macrimi.github.io/MacRimi/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "https://macrimi.github.io/MacRimi/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: {
      url: "https://macrimi.github.io/MacRimi/favicon/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "https://macrimi.github.io/MacRimi/favicon/favicon.ico",
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph?.title} />
        <meta property="og:description" content={metadata.openGraph?.description} />
        <meta property="og:image" content={metadata.openGraph?.images?.[0]?.url} />
        <meta property="og:url" content={metadata.openGraph?.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.twitter?.title} />
        <meta name="twitter:description" content={metadata.twitter?.description} />
        <meta name="twitter:image" content={metadata.twitter?.images?.[0]} />
        <link rel="canonical" href={metadata.metadataBase.href} />

        {/* Favicon y Apple Icons */}
        {metadata.icons.icon.map((icon, index) => (
          <link key={index} rel="icon" type={icon.type} sizes={icon.sizes} href={icon.url} />
        ))}
        <link rel="apple-touch-icon" sizes="180x180" href={metadata.icons.apple.url} />
        <link rel="manifest" href={metadata.manifest} />
      </head>
      <body className={`${quicksand.variable} ${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
