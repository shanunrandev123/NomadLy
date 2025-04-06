"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  const themes = [
    {
      id: "sunset",
      name: "Sunset Adventure",
      colors: {
        primary: "#FF7D45",
        secondary: "#5E3B73",
        accent: "#FFCA28",
      },
    },
    {
      id: "ocean",
      name: "Ocean Explorer",
      colors: {
        primary: "#1A5F7A",
        secondary: "#57C5B6",
        accent: "#FF8551",
      },
    },
    {
      id: "spice",
      name: "Global Spice",
      colors: {
        primary: "#E07A5F",
        secondary: "#81B29A",
        accent: "#F2CC8F",
      },
    },
    {
      id: "tropical",
      name: "Tropical Paradise",
      colors: {
        primary: "#2D6A4F",
        secondary: "#40916C",
        accent: "#FF9E00",
      },
    },
    {
      id: "urban",
      name: "Urban Wanderer",
      colors: {
        primary: "#4A4E69",
        secondary: "#9A8C98",
        accent: "#C9ADA7",
      },
    },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
      >
        <Palette className="h-5 w-5" />
        {theme && (
          <span
            className="absolute bottom-1 right-1 h-2 w-2 rounded-full"
            style={{
              backgroundColor: themes.find((t) => t.id === theme)?.colors.primary || "#0d9488",
            }}
          />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-16 z-50 w-72 rounded-lg border bg-background shadow-lg"
            >
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="font-medium">Select Theme</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <div className="grid gap-3">
                  {themes.map((t) => (
                    <ThemeOption
                      key={t.id}
                      theme={t}
                      isActive={theme === t.id}
                      onClick={() => {
                        setTheme(t.id)
                        setIsOpen(false)
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function ThemeOption({
  theme,
  isActive,
  onClick,
}: {
  theme: {
    id: string
    name: string
    colors: {
      primary: string
      secondary: string
      accent: string
    }
  }
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition-all hover:bg-muted ${
        isActive ? "border-primary ring-1 ring-primary" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex gap-1">
        <div className="h-5 w-5 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
        <div className="h-5 w-5 rounded-full" style={{ backgroundColor: theme.colors.secondary }} />
        <div className="h-5 w-5 rounded-full" style={{ backgroundColor: theme.colors.accent }} />
      </div>
      <span className="flex-1">{theme.name}</span>
      {isActive && <div className="h-2 w-2 rounded-full bg-primary" />}
    </button>
  )
}

