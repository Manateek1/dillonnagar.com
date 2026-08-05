import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "RentMax AI — Dillon Nagar",
};

export default function RentMaxAIPage() {
  return (
    <CaseStudyLayout
      name="RentMax AI"
      tagline="Rental property analysis platform with AI-driven insights"
      status="live"
      stack={["React", "Vite", "TypeScript", "Supabase", "Stripe", "Sentry", "Vercel"]}
      liveUrl="https://rentmaxai.com"
      sections={[
        {
          title: "Problem",
          content:
            "Landlords and property investors — including many who aren't financial experts — lack accessible tools for analyzing rental properties. Understanding rent ranges, cash flow, cap rate, and returns requires either expensive software or manual spreadsheet work with no guidance.",
        },
        {
          title: "Solution",
          content:
            "RentMax AI is a live SaaS platform that makes rental property analysis clear and accessible. Users input a property address and parameters to get rent estimates (low, mid, high), expense breakdowns, mortgage calculations, net operating income, cap rate, and cash-on-cash return — with AI-generated explanations of the numbers.",
        },
        {
          title: "Role",
          content:
            "Founder and developer — sole engineer. Responsible for product design, frontend, backend functions, database schema, AI integration, payment infrastructure, error monitoring, and deployment pipeline.",
        },
        {
          title: "Tech Stack",
          content: [
            "React + Vite + TypeScript — frontend application",
            "Supabase — database, authentication, and Row Level Security",
            "Vercel Functions — serverless backend API endpoints",
            "Stripe — subscription billing with webhook infrastructure",
            "OpenAI API — AI-generated property analysis explanations",
            "Sentry — error monitoring and production issue tracking",
            "Vercel — deployment and hosting",
          ],
        },
        {
          title: "Key Features",
          content: [
            "Property address lookup with rent range estimates (low, mid, high)",
            "Expense modeling: management fees, vacancy, insurance, repairs, taxes",
            "Mortgage assumptions and cash flow calculations",
            "Net operating income, cap rate, and cash-on-cash return",
            "AI explanations that make the numbers understandable for non-experts",
            "Saved reports and property comparisons",
            "PDF and CSV exports",
            "Stripe subscription billing with free and paid tiers",
          ],
        },
        {
          title: "Architecture",
          content:
            "The frontend is a Vite-bundled React SPA deployed on Vercel. API logic runs in Vercel Functions — serverless endpoints that handle analysis, Stripe webhooks, and data operations. Supabase provides the database and handles authentication with Row Level Security enforced at the database layer. Stripe webhooks update subscription state; Sentry monitors production errors and surfaces stale frontend chunk issues.",
        },
        {
          title: "Security",
          content: [
            "Row Level Security on all Supabase tables — users can only access their own data",
            "Server-side authorization checks before any data is returned",
            "IDOR prevention: no user can request another user's reports by ID",
            "Stripe handles all payment data — no card numbers touch the application",
            "All API keys stored as environment variables, never exposed to the client",
            "XSS protection and Content Security Policy headers",
            "Rate limiting on API routes to prevent abuse",
          ],
        },
        {
          title: "Current Status",
          content:
            "Live at rentmaxai.com. Active development — recent work includes Stripe webhook infrastructure, deployment stability, and resolving Sentry-reported stale frontend chunk issues.",
        },
      ]}
    />
  );
}
