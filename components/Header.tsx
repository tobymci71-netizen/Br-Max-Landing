"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(darkModeMediaQuery.matches)

    if (darkModeMediaQuery.matches) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="fixed top-12 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground flex-shrink-0">
            <Image src={"BR.svg"} height={40} width={40} alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, "#pricing")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "#features")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#examples"
              onClick={(e) => handleNavClick(e, "#examples")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Examples
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "#faq")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </a>
            <Link
              href="/affiliate"
              className="text-sm text-accent-primary hover:text-accent-primary/80 transition-colors font-medium"
            >
              Affiliate
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Desktop CTA Button - Hidden on mobile */}
            <Link
              href={`https://${process.env.NEXT_PUBLIC_STUDIO_BASE_URL}`}
              className="hidden md:inline-block px-4 py-2 bg-accent-primary text-white rounded-lg text-sm font-medium hover:bg-accent-primary/90 transition-opacity"
            >
              Start building
            </Link>

            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <a
                href="#pricing"
                onClick={(e) => handleNavClick(e, "#pricing")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Pricing
              </a>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "#features")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#examples"
                onClick={(e) => handleNavClick(e, "#examples")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Examples
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, "#faq")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                FAQ
              </a>
              <Link
                href="/affiliate"
                className="text-sm text-accent-primary hover:text-accent-primary/80 transition-colors font-medium py-2"
              >
                Affiliate
              </Link>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_STUDIO_BASE_URL}`}
                className="w-full px-4 py-2.5 bg-accent-primary text-white rounded-lg text-sm font-medium hover:bg-accent-primary/90 transition-opacity text-center mt-2"
              >
                Start building
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
