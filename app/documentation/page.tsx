import Link from "next/link"
import { ArrowLeft, Code, Database, FileText, Layers, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TravelQuote } from "@/components/travel-quote"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-teal-600 text-white py-20">
        <div className="container">
          <Link href="/" className="inline-flex items-center text-teal-100 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Nomadly
          </Link>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Engineering the <span className="text-teal-200">Wanderlust</span>
          </h1>
          <p className="mt-4 max-w-[700px] text-teal-100 md:text-xl">
            A deep dive into the technology and philosophy behind Nomadly's travel recommendation engine.
          </p>
        </div>
      </header>

      <TravelQuote
        quote="The real voyage of discovery consists not in seeking new landscapes, but in having new eyes."
        author="Marcel Proust"
        className="py-10 bg-teal-50"
      />

      <main className="container py-12">
        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-teal-100/50">
            <TabsTrigger
              value="architecture"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              Architecture
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              AI Models
            </TabsTrigger>
            <TabsTrigger value="frontend" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              Frontend
            </TabsTrigger>
            <TabsTrigger value="backend" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              Backend
            </TabsTrigger>
            <TabsTrigger value="philosophy" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              Philosophy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="mt-6">
            <div className="flex flex-col gap-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-bold">System Architecture</h2>
                </div>
                <div className="prose max-w-none">
                  <p>
                    Nomadly is built on a modern, scalable architecture designed to deliver personalized travel
                    recommendations with minimal latency. The system comprises several key components:
                  </p>

                  <h3>Core Components</h3>
                  <ul>
                    <li>
                      <strong>Frontend Interface:</strong> React-based UI with Next.js for server-side rendering and
                      optimal performance
                    </li>
                    <li>
                      <strong>Recommendation Engine:</strong> Dual-model system with form-based and free-text inputs
                    </li>
                    <li>
                      <strong>AI Processing Layer:</strong> Handles natural language processing and recommendation
                      generation
                    </li>
                    <li>
                      <strong>Data Storage:</strong> Combination of vector and relational databases for destination
                      information
                    </li>
                    <li>
                      <strong>API Gateway:</strong> Manages communication between frontend and backend services
                    </li>
                  </ul>

                  <h3>Data Flow</h3>
                  <p>
                    User inputs (either structured via form or unstructured via text) are processed through our
                    recommendation pipeline:
                  </p>
                  <ol>
                    <li>Input validation and preprocessing</li>
                    <li>Context enrichment with user preferences and historical data</li>
                    <li>Model selection and query formulation</li>
                    <li>Parallel processing through appropriate AI models</li>
                    <li>Result ranking and personalization</li>
                    <li>Response formatting and delivery</li>
                  </ol>
                </div>
              </section>

              <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                <h3 className="text-xl font-semibold mb-4 text-teal-800">Architecture Diagram</h3>
                <div className="bg-white p-4 rounded border border-teal-100 text-center">
                  [System Architecture Diagram - Visual representation of Nomadly's component interaction]
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="models" className="mt-6">
            <div className="flex flex-col gap-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-bold">AI Models</h2>
                </div>
                <div className="prose max-w-none">
                  <p>
                    Nomadly leverages two distinct AI models to generate travel recommendations, each optimized for
                    different types of user interactions:
                  </p>

                  <h3>Guided Discovery Model</h3>
                  <p>
                    Our structured recommendation engine processes discrete inputs through a sophisticated decision tree
                    enhanced by machine learning. This model:
                  </p>
                  <ul>
                    <li>Utilizes collaborative filtering to identify patterns across user preferences</li>
                    <li>Employs content-based filtering to match destination attributes with user inputs</li>
                    <li>Incorporates seasonal adjustments and real-time availability data</li>
                    <li>Balances popularity metrics with personalization to avoid over-tourism</li>
                  </ul>

                  <h3>AI Storyteller (Fine-tuned Llama Model)</h3>
                  <p>
                    Our free-form recommendation engine is powered by a fine-tuned Llama model that specializes in
                    travel planning. This model has been trained on:
                  </p>
                  <ul>
                    <li>Millions of travel itineraries from expert travel planners</li>
                    <li>Destination guides and cultural context information</li>
                    <li>Seasonal and regional travel patterns</li>
                    <li>Budget optimization strategies for different travel styles</li>
                  </ul>
                  <p>
                    The model has been fine-tuned specifically to extract travel preferences from natural language and
                    convert them into actionable itineraries that balance discovery, rest, and practical considerations.
                  </p>
                </div>
              </section>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <h3 className="text-xl font-semibold mb-4 text-teal-800">Model Performance</h3>
                  <p className="mb-4">Our models are continuously evaluated against key metrics:</p>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>User Satisfaction:</span>
                      <span className="font-semibold">94%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Recommendation Relevance:</span>
                      <span className="font-semibold">91%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Itinerary Feasibility:</span>
                      <span className="font-semibold">97%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="font-semibold">&lt;2 seconds</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <h3 className="text-xl font-semibold mb-4 text-teal-800">Training Process</h3>
                  <p>Our Llama model fine-tuning process involved:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Initial pre-training on 2M+ travel documents</li>
                    <li>Supervised fine-tuning with 50,000 expert-crafted itineraries</li>
                    <li>Reinforcement learning from human feedback</li>
                    <li>Continuous improvement through A/B testing</li>
                    <li>Regular retraining with new destination data</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="frontend" className="mt-6">
            <div className="flex flex-col gap-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Code className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-bold">Frontend Engineering</h2>
                </div>
                <div className="prose max-w-none">
                  <p>
                    Nomadly's frontend is built with modern web technologies focused on performance, accessibility, and
                    engaging user experiences:
                  </p>

                  <h3>Technology Stack</h3>
                  <ul>
                    <li>
                      <strong>Framework:</strong> Next.js with React 18 for server components and streaming
                    </li>
                    <li>
                      <strong>Styling:</strong> Tailwind CSS with custom theming for the teal-focused Nomadly brand
                    </li>
                    <li>
                      <strong>Animations:</strong> Framer Motion for fluid transitions and micro-interactions
                    </li>
                    <li>
                      <strong>Form Handling:</strong> React Hook Form with Zod validation
                    </li>
                    <li>
                      <strong>UI Components:</strong> Custom components built on shadcn/ui primitives
                    </li>
                  </ul>

                  <h3>Design Philosophy</h3>
                  <p>Our frontend design follows these core principles:</p>
                  <ul>
                    <li>
                      <strong>Progressive Enhancement:</strong> Core functionality works without JavaScript, enhanced
                      with client-side features
                    </li>
                    <li>
                      <strong>Responsive Design:</strong> Fluid layouts that adapt to any device size
                    </li>
                    <li>
                      <strong>Accessibility:</strong> WCAG AA compliance with semantic HTML and proper ARIA attributes
                    </li>
                    <li>
                      <strong>Performance:</strong> Optimized bundle sizes, code splitting, and image optimization
                    </li>
                    <li>
                      <strong>Engaging Interactions:</strong> Thoughtful animations that enhance rather than distract
                    </li>
                  </ul>
                </div>
              </section>

              <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                <h3 className="text-xl font-semibold mb-4 text-teal-800">Component Architecture</h3>
                <p className="mb-4">Nomadly's UI is built with a component-based architecture:</p>
                <div className="bg-white p-4 rounded border border-teal-100 overflow-x-auto">
                  <pre className="text-sm">
                    {`// Component hierarchy example
<Layout>
  <Header />
  <Hero />
  <RecommendationEngine>
    <ModelSwitcher />
    <RecommendationForm />
    <FreeFormInput />
    <ResultsDisplay />
  </RecommendationEngine>
  <DestinationShowcase />
  <Footer />
</Layout>`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="backend" className="mt-6">
            <div className="flex flex-col gap-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Database className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-bold">Backend Systems</h2>
                </div>
                <div className="prose max-w-none">
                  <p>
                    Nomadly's backend infrastructure is designed for reliability, scalability, and rapid response times:
                  </p>

                  <h3>API Architecture</h3>
                  <ul>
                    <li>
                      <strong>API Design:</strong> RESTful endpoints with GraphQL for complex data queries
                    </li>
                    <li>
                      <strong>Authentication:</strong> JWT-based auth with role-based access control
                    </li>
                    <li>
                      <strong>Rate Limiting:</strong> Tiered rate limiting to prevent abuse
                    </li>
                    <li>
                      <strong>Caching:</strong> Multi-level caching strategy with Redis
                    </li>
                  </ul>

                  <h3>Data Storage</h3>
                  <p>Our data architecture combines multiple specialized databases:</p>
                  <ul>
                    <li>
                      <strong>Destination Data:</strong> PostgreSQL for structured destination information
                    </li>
                    <li>
                      <strong>User Profiles:</strong> MongoDB for flexible user preference storage
                    </li>
                    <li>
                      <strong>Vector Search:</strong> Pinecone for semantic similarity matching
                    </li>
                    <li>
                      <strong>Caching Layer:</strong> Redis for high-performance data caching
                    </li>
                    <li>
                      <strong>Analytics:</strong> ClickHouse for event tracking and analytics
                    </li>
                  </ul>

                  <h3>Infrastructure</h3>
                  <p>Nomadly runs on a modern cloud infrastructure:</p>
                  <ul>
                    <li>Containerized microservices orchestrated with Kubernetes</li>
                    <li>Serverless functions for event-driven processes</li>
                    <li>CDN for global content delivery</li>
                    <li>Automated CI/CD pipelines for continuous deployment</li>
                  </ul>
                </div>
              </section>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <h3 className="text-xl font-semibold mb-4 text-teal-800">Server Actions</h3>
                  <p className="mb-4">Nomadly leverages Next.js Server Actions for secure, server-side operations:</p>
                  <div className="bg-white p-4 rounded border border-teal-100 overflow-x-auto">
                    <pre className="text-sm">
                      {`// Example Server Action
'use server'

import { revalidatePath } from 'next/cache'

export async function generateRecommendation(formData) {
  // Process user preferences
  const preferences = processFormData(formData)
  
  // Query recommendation engine
  const recommendations = 
    await recommendationEngine.query(preferences)
  
  // Update cache
  revalidatePath('/recommendations')
  
  return recommendations
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <h3 className="text-xl font-semibold mb-4 text-teal-800">Performance Metrics</h3>
                  <p>Our backend systems are optimized for performance:</p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex justify-between">
                      <span>Average API Response:</span>
                      <span className="font-semibold">87ms</span>
                    </li>
                    <li className="flex justify-between">
                      <span>99th Percentile Response:</span>
                      <span className="font-semibold">320ms</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-semibold">99.99%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cache Hit Ratio:</span>
                      <span className="font-semibold">94%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="philosophy" className="mt-6">
            <div className="flex flex-col gap-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-bold">Our Philosophy</h2>
                </div>
                <div className="prose max-w-none">
                  <p>
                    At Nomadly, our approach to travel recommendation is guided by a set of core philosophical
                    principles:
                  </p>

                  <h3>Authentic Exploration</h3>
                  <p>
                    We believe that travel should be transformative, not transactional. Our recommendations aim to
                    connect travelers with authentic experiences that foster genuine cultural exchange and personal
                    growth. We prioritize:
                  </p>
                  <ul>
                    <li>Local businesses and community-based tourism</li>
                    <li>Off-the-beaten-path destinations that offer unique perspectives</li>
                    <li>Experiences that challenge and expand worldviews</li>
                    <li>Sustainable practices that preserve destinations for future generations</li>
                  </ul>

                  <h3>Balanced Discovery</h3>
                  <p>The perfect journey balances structure with spontaneity. Our itineraries provide:</p>
                  <ul>
                    <li>A framework for exploration without rigid constraints</li>
                    <li>Equal parts activity and reflection</li>
                    <li>A mix of iconic landmarks and hidden gems</li>
                    <li>Space for serendipitous discovery</li>
                  </ul>

                  <h3>Responsible Technology</h3>
                  <p>We believe AI should enhance human connection, not replace it. Our technology aims to:</p>
                  <ul>
                    <li>Amplify human creativity and curiosity</li>
                    <li>Reduce planning friction without removing the joy of discovery</li>
                    <li>Connect travelers with local expertise</li>
                    <li>Promote responsible tourism practices</li>
                  </ul>
                </div>
              </section>

              <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                <h3 className="text-xl font-semibold mb-4 text-teal-800">The Nomadly Manifesto</h3>
                <div className="space-y-4 italic text-teal-800">
                  <p>
                    "We believe that travel is not about checking destinations off a list, but about the stories we
                    collect and the perspectives we gain along the way."
                  </p>
                  <p>
                    "We believe technology should free us to be more present in our journeys, not distract us from
                    them."
                  </p>
                  <p>
                    "We believe in the power of wandering with purpose—having a destination in mind but remaining open
                    to the detours that often become the most meaningful parts of our journey."
                  </p>
                  <p>
                    "We believe that the best souvenirs are the expanded worldviews and deeper understanding we bring
                    home."
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <TravelQuote
        quote="Travel is fatal to prejudice, bigotry, and narrow-mindedness, and many of our people need it sorely on these accounts."
        author="Mark Twain"
        className="py-10 bg-gradient-to-r from-teal-100 to-teal-50"
      />

      <section className="bg-teal-600 py-12 text-white">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience Nomadly?</h2>
          <p className="mb-6 text-teal-100 max-w-2xl mx-auto">
            Return to the main application and begin crafting your next unforgettable journey.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/">Return to Nomadly</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

