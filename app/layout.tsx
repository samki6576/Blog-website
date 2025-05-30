import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Header } from "@/components/layout/header"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlogSpace - Complete Blog Platform",
  description: "A complete, feature-rich blog platform built with Next.js and Supabase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
