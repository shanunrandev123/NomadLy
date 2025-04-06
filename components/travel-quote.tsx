import { cn } from "@/lib/utils"

interface TravelQuoteProps {
  quote: string
  author: string
  className?: string
}

export function TravelQuote({ quote, author, className }: TravelQuoteProps) {
  return (
    <div className={cn("text-center px-4", className)}>
      <div className="container max-w-4xl">
        <blockquote className="relative">
          <div className="relative z-10">
            <p className="text-xl md:text-2xl italic text-[hsl(var(--foreground)_/_0.9)] leading-relaxed">"{quote}"</p>
            <footer className="mt-2 text-[hsl(var(--primary))]">— {author}</footer>
          </div>
          <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 text-8xl text-[hsl(var(--primary)_/_0.2)] opacity-50 font-serif">
            "
          </div>
          <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 text-8xl text-[hsl(var(--primary)_/_0.2)] opacity-50 font-serif">
            "
          </div>
        </blockquote>
      </div>
    </div>
  )
}

