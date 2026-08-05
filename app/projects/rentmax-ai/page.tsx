import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "RentMax AI — Dillon Nagar",
};

export default function RentMaxAIPage() {
  return (
    <CaseStudyLayout
      name="RentMax AI"
      tagline="AI-powered rental property analytics platform"
      status="live"
      stack={["Next.js", "TypeScript", "Python", "PostgreSQL", "Stripe", "OpenAI", "Vercel"]}
      liveUrl="https://rentmaxai.com"
      sections={[
        {
          title: "Problem",
          content:
            "Landlords and property investors lack accessible, real-time tools for analyzing rental market pricing. Existing solutions are either expensive enterprise software or basic spreadsheet estimates with no AI layer.",
        },
        {
          title: "Solution",
          content:
            "RentMax AI is a live SaaS platform that combines real-time rental market data with AI-driven insights to help landlords and investors make better pricing decisions. Users input a property address and get instant market comparables, suggested rent ranges, and demand analysis.",
        },
        {
          title: "Role",
          content:
            "Founder and developer — sole engineer responsible for the full stack: product design, frontend, backend API, database schema, AI integration, payment infrastructure, and deployment pipeline.",
        },
        {
          title: "Tech Stack",
          content: [
            "Next.js (App Router) + TypeScript — frontend and API routes",
            "Python — backend data processing and market data pipelines",
            "PostgreSQL — property records and user data",
            "OpenAI API — property valuation insights and natural language summaries",
            "Stripe — subscription billing with multiple pricing tiers",
            "Vercel — deployment and edge functions",
          ],
        },
        {
          title: "Key Features",
          content: [
            "Real-time rental market analysis by zip code and property type",
            "AI-generated pricing recommendations with supporting rationale",
            "Comparable property matching based on size, bedrooms, and location",
            "Stripe subscription billing with free tier and paid plans",
            "User dashboard with saved properties and historical analysis",
          ],
        },
        {
          title: "Architecture",
          content:
            "Frontend and API routes run in Next.js on Vercel. A Python service handles data ingestion and processing from rental market feeds, writing results to PostgreSQL. The AI layer calls OpenAI's API with structured prompts built from the market data context. Stripe webhooks update subscription state in the database.",
        },
        {
          title: "Security",
          content: [
            "All API keys stored as environment variables — never exposed to the client",
            "Stripe handles all payment data — no card numbers touch the application",
            "Server-side authentication checks before any data is returned",
            "Input validation on all API route handlers",
          ],
        },
        {
          title: "Current Status",
          content:
            "Live at rentmaxai.com. Active development — new features include portfolio tracking and automated rent adjustment alerts.",
        },
      ]}
    />
  );
}
