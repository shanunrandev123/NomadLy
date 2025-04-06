"use client"

import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, MessageSquareText } from "lucide-react"

interface ModelSwitcherProps {
  activeModel: "guided" | "free-form"
  setActiveModel: (model: "guided" | "free-form") => void
}

export function ModelSwitcher({ activeModel, setActiveModel }: ModelSwitcherProps) {
  return (
    <div className="flex justify-center">
      <Tabs
        value={activeModel}
        className="w-full max-w-md"
        onValueChange={(value) => {
          setActiveModel(value as "guided" | "free-form")
        }}
      >
        <TabsList className="grid w-full grid-cols-2 bg-[hsl(var(--muted)_/_0.5)]">
          <TabsTrigger
            value="guided"
            className="flex items-center gap-2 data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white"
          >
            <Map className="h-4 w-4" />
            <span>Guided Discovery</span>
            {activeModel === "guided" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--primary))]"
                layoutId="underline"
              />
            )}
          </TabsTrigger>
          <TabsTrigger
            value="free-form"
            className="flex items-center gap-2 data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white"
          >
            <MessageSquareText className="h-4 w-4" />
            <span>AI Storyteller</span>
            {activeModel === "free-form" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--primary))]"
                layoutId="underline"
              />
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

