import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nomadly - Travel Itinerary & Recommendation Engine",
  description: "Discover your perfect journey with AI-powered travel recommendations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} theme-sunset`}>
        <ThemeProvider defaultTheme="sunset">{children}</ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'