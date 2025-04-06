import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, PlaneTakeoff } from "lucide-react"
import { Compass } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RecommendationEngine } from "@/components/recommendation-engine"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden hero-gradient py-20">
          <div className="container relative z-10 flex flex-col items-center text-center">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[hsl(var(--muted))] blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[hsl(var(--muted))] blur-3xl" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Remember <span className="text-[hsl(var(--primary))]">Fun?</span>
            </h1>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              While you're doom-scrolling, your friends are creating stories they'll tell forever. Our AI crafts
              itineraries so good, your Instagram will finally get likes again.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button size="lg" className="group theme-btn">
                Escape Your Boring Life{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="#how-it-works" className="text-sm text-[hsl(var(--primary))] hover:underline">
                Discover the magic behind Nomadly
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 z-0 opacity-10">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="World map background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section id="recommendation-engine" className="py-20">
          <div className="container">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your <span className="text-[hsl(var(--primary))]">Adventure Architect</span>
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Choose your path to discovery: our guided wizard or our AI storyteller
              </p>
            </div>

            <Suspense>
              <RecommendationEngine />
            </Suspense>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The <span className="text-[hsl(var(--primary))]">Nomadly</span> Experience
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                How our AI turns "I should travel someday" into "OMG I CAN'T BELIEVE I'M HERE!"
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Choose Your Muse",
                  description:
                    "Select between our guided wizard or free-form storyteller to inspire your next adventure.",
                  icon: <Compass className="h-10 w-10 text-[hsl(var(--primary))]" />,
                },
                {
                  title: "Receive Your Blueprint",
                  description:
                    "Our AI knows what you want better than your therapist. While others visit tourist traps, you'll find hidden gems that'll make your friends jealous for decades.",
                  icon: <Compass className="h-10 w-10 text-[hsl(var(--primary))]" />,
                },
                {
                  title: "Embark on Your Odyssey",
                  description:
                    "Remember when you were fun? Us too. Your personalized itinerary will help you rediscover that person who didn't just watch travel shows, but lived them.",
                  icon: <Compass className="h-10 w-10 text-[hsl(var(--primary))]" />,
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="mb-4 rounded-full bg-[hsl(var(--muted))] p-4 group-hover:bg-[hsl(var(--primary)_/_0.2)] transition-colors duration-300">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="theme-footer py-12">
        <div className="container flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <PlaneTakeoff className="h-6 w-6 text-[hsl(var(--accent))]" />
              <span className="font-bold text-xl logo-text">Nomadly</span>
            </div>
            <p className="mt-2 text-[hsl(var(--accent))] text-sm max-w-xs text-center md:text-left">
              Crafting extraordinary journeys with the perfect blend of AI intelligence and human wanderlust.
            </p>
          </div>
        </div>
        <div className="container mt-8 pt-8 border-t border-[hsl(var(--primary-foreground)_/_0.2)] text-center text-sm text-[hsl(var(--accent))]">
          © {new Date().getFullYear()} Nomadly. All rights reserved. The journey is the destination.
        </div>
      </footer>
    </div>
  )
}

