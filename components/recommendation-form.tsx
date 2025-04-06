"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Map } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  recommendationType: z.string().min(1, "Please select a recommendation type"),
  stateName: z.string().min(1, "Please select a state"),
  userId: z.string().length(5, "User ID must be 5 digits"),
})

interface RecommendationFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export function RecommendationForm({ onSubmit }: RecommendationFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recommendationType: "",
      stateName: "",
      userId: "",
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSubmit(values)
    }, 1500)
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Map className="h-5 w-5 text-[hsl(var(--primary))]" />
        <h3 className="text-xl font-semibold">Guided Discovery</h3>
      </div>
      <p className="mb-6 text-muted-foreground">
        Tell us your travel style and let our algorithm craft the perfect adventure tailored just for you.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="recommendationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recommendation Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-[hsl(var(--primary)_/_0.2)] focus:ring-[hsl(var(--primary))]">
                        <SelectValue placeholder="Select recommendation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="nightlife">Nightlife</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State Name</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-[hsl(var(--primary)_/_0.2)] focus:ring-[hsl(var(--primary))]">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LA">LA</SelectItem>
                      <SelectItem value="NY">NY</SelectItem>
                      <SelectItem value="VA">VA</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      pattern="[0-9]{5}"
                      maxLength={5}
                      className="w-full rounded-md border border-[hsl(var(--primary)_/_0.2)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                      placeholder="Enter 5 digit User ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full theme-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Crafting Your Journey...
              </>
            ) : (
              "Reveal My Adventure"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

