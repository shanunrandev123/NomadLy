"use client"

import { useState } from "react"
import { ModelSwitcher } from "@/components/model-switcher"
import { RecommendationForm } from "@/components/recommendation-form"
import { FreeFormInput } from "@/components/free-form-input"
import { NomadBlueprint } from "@/components/nomad-blueprint"

export function RecommendationEngine() {
  const [activeModel, setActiveModel] = useState<"guided" | "free-form">("guided")
  const [showResults, setShowResults] = useState(false)
  const [resultData, setResultData] = useState<any>(null)

  const handleFormSubmit = (data: any) => {
    setResultData(data)
    setShowResults(true)
  }

  return (
    <div>
      <div className="pb-6 border-b">
        <ModelSwitcher activeModel={activeModel} setActiveModel={setActiveModel} />
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Guided Discovery Form */}
        <div
          className={`rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-[hsl(var(--primary)_/_0.3)] ${
            activeModel !== "guided" ? "hidden lg:block" : ""
          }`}
        >
          <RecommendationForm
            onSubmit={(data) =>
              handleFormSubmit({
                type: "guided",
                ...data,
              })
            }
          />
        </div>

        {/* AI Storyteller Form */}
        <div
          className={`rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-[hsl(var(--primary)_/_0.3)] ${
            activeModel !== "free-form" ? "hidden lg:block" : ""
          }`}
        >
          <FreeFormInput
            onSubmit={(data) =>
              handleFormSubmit({
                type: "free-form",
                ...data,
              })
            }
          />
        </div>
      </div>

      <div className="mt-12">
        <NomadBlueprint showResults={showResults} resultData={resultData} />
      </div>
    </div>
  )
}

