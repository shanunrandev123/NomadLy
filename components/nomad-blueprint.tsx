"use client"

import { PlaneTakeoff } from "lucide-react"

interface NomadBlueprintProps {
  showResults: boolean
  resultData: any
}

export function NomadBlueprint({ showResults, resultData }: NomadBlueprintProps) {
  if (!showResults) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-semibold">Your Nomadic Blueprint</h3>
        <div className="min-h-[300px] rounded-lg bg-muted/40 p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <PlaneTakeoff className="h-12 w-12 text-[hsl(var(--primary)_/_0.6)]" />
            <p className="mt-4 text-muted-foreground">
              Your personalized journey awaits. Begin crafting your adventure with one of our recommendation engines
              above.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Guided Discovery Result
  if (resultData.type === "guided") {
    const destinationMap: Record<string, string> = {
      beach: "The Amalfi Coast, Italy",
      mountain: "The Swiss Alps",
      city: "Kyoto, Japan",
      countryside: "Provence, France",
      island: "Santorini, Greece",
    }

    const budgetMap: Record<string, string> = {
      budget: "budget-friendly",
      moderate: "moderately priced",
      luxury: "luxury",
      "ultra-luxury": "ultra-luxury",
    }

    const durationMap: Record<string, string> = {
      weekend: "weekend getaway",
      short: "week-long escape",
      medium: "two-week journey",
      long: "extended expedition",
    }

    const styleMap: Record<string, string> = {
      relaxation: "relaxation-focused",
      adventure: "adventure-packed",
      cultural: "culturally immersive",
      foodie: "culinary-centered",
      family: "family-friendly",
    }

    const seasonMap: Record<string, string> = {
      spring: "spring",
      summer: "summer",
      fall: "autumn",
      winter: "winter",
    }

    const destination = destinationMap[resultData.destination] || "fascinating destination"
    const budget = budgetMap[resultData.budget] || "wonderful"
    const duration = durationMap[resultData.duration] || "perfect-length"
    const style = styleMap[resultData.travelStyle] || "delightful"
    const season = seasonMap[resultData.season] || "ideal-season"

    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-semibold">Your Nomadic Blueprint</h3>
        <div className="min-h-[300px] rounded-lg bg-muted/40 p-6">
          <div className="flex flex-col">
            <h4 className="text-lg font-medium text-[hsl(var(--primary))]">We Recommend: {destination}</h4>
            <p className="mt-4 text-foreground leading-relaxed">
              Based on your preferences, we've found the perfect match for your {season} {duration}. {destination}{" "}
              offers a {budget} {style} experience that aligns beautifully with what you're seeking.
            </p>
            <p className="mt-3 text-foreground">
              This destination is known for its breathtaking landscapes, authentic cultural experiences, and
              unforgettable memories waiting to be made.
            </p>
            <div className="mt-6 p-4 bg-[hsl(var(--primary)_/_0.1)] rounded-lg">
              <h5 className="font-medium">Why We Think You'll Love It:</h5>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li>Perfect for your {style} travel preferences</li>
                <li>Ideal {season} weather conditions</li>
                <li>Fits your {budget} expectations</li>
                <li>Optimal for your {duration} timeframe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // AI Storyteller Result
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">Your Nomadic Blueprint</h3>
      <div className="min-h-[300px] rounded-lg bg-muted/40 p-6">
        <div className="flex flex-col">
          <h4 className="text-lg font-medium text-[hsl(var(--primary))]">Your Personalized Itinerary</h4>
          <div className="mt-4 prose max-w-none text-foreground">
            <p>
              <strong>Day 1-2: Arrival & Acclimation</strong>
              <br />
              Begin your journey in the charming coastal town of Positano. After settling into your boutique cliffside
              accommodation, take a leisurely stroll through the narrow streets lined with colorful buildings. Enjoy
              your first evening with a sunset aperitivo at a local terrace restaurant overlooking the Mediterranean.
            </p>
            <p>
              <strong>Day 3-4: Cultural Immersion</strong>
              <br />
              Explore the ancient ruins of Pompeii with a private guide who will bring history to life. In the
              afternoon, visit a family-owned vineyard on the slopes of Mount Vesuvius for a wine tasting experience
              featuring regional varieties. The following day, take a cooking class to learn the secrets of authentic
              Neapolitan cuisine.
            </p>
            <p>
              <strong>Day 5-7: Island Escape</strong>
              <br />
              Board a private boat to Capri for a three-day island retreat. Circle the island to discover hidden grottos
              and secluded beaches. Spend your evenings in the Piazzetta, enjoying the vibrant atmosphere and exquisite
              seafood. Don't miss the breathtaking view from Villa Jovis and the Gardens of Augustus.
            </p>
            <p>
              <strong>Day 8-10: Coastal Serenity</strong>
              <br />
              Return to the mainland and drive along the scenic Amalfi Coast, stopping at viewpoints that capture the
              dramatic coastline. Spend your final days in the quieter town of Ravello, known for its stunning gardens
              and classical music concerts. On your last evening, enjoy a farewell dinner at a Michelin-starred
              restaurant that showcases the best of Mediterranean flavors.
            </p>
          </div>
          <div className="mt-6 p-4 bg-[hsl(var(--primary)_/_0.1)] rounded-lg">
            <h5 className="font-medium">Personalized Recommendations:</h5>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Best time to visit: May-June or September-October to avoid crowds</li>
              <li>Local guide contact: Maria Rossi (speaks English, specializes in art history)</li>
              <li>Hidden gem: Fiordo di Furore, a secluded beach between towering cliffs</li>
              <li>Authentic dining: Trattoria da Gemma in Amalfi for the freshest seafood</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

