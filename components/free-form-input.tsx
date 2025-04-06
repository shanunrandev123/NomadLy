"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Globe, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  prompt: z.string().min(20, "Paint your dream with at least 20 characters to inspire our AI storyteller"),
})

interface FreeFormInputProps {
  onSubmit: (data: { prompt: string }) => void
}

export function FreeFormInput({ onSubmit }: FreeFormInputProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSubmit(values)
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Globe className="h-5 w-5 text-[hsl(var(--primary))]" />
        <h3 className="text-xl font-semibold">AI Storyteller</h3>
      </div>
      <p className="mb-6 text-muted-foreground">
        Paint your dream journey with words, and watch as our AI transforms your vision into a day-by-day adventure.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Paint your dream journey with words... 'I yearn for a 10-day escape to the Mediterranean in June, where azure waters meet ancient ruins. I seek a blend of historical immersion, culinary delights, and moments of tranquility by the sea. My partner and I prefer boutique accommodations and authentic local experiences over tourist traps...'"
                    className="min-h-[180px] resize-none border-[hsl(var(--primary)_/_0.2)] focus:ring-[hsl(var(--primary))]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-[hsl(var(--primary)_/_0.8)]">
                  The more vividly you describe your dream, the more magical your itinerary will be.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full theme-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Weaving Your Story...
              </>
            ) : (
              "Craft My Journey"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

