"use client"

import { useState } from "react"
import Link from "next/link"
import { PlaneTakeoff, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSelector } from "@/components/theme-selector"
import { useTheme } from "@/components/theme-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="h-6 w-6 text-[hsl(var(--primary))]" />
          <span className="text-xl font-bold logo-text">Nomadly</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
            Home
          </Link>
          <Link
            href="/documentation"
            className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors"
          >
            Documentation
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeSelector />
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors"
          >
            Sign In
          </Button>
          {/* Begin Your Journey button removed */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/documentation"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="#contact"
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t pt-4 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full mb-2 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]"
              >
                Sign In
              </Button>
              {/* Begin Your Journey button removed */}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

