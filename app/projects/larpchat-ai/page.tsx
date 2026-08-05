import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "LarpChat AI — Dillon Nagar",
};

export default function LarpChatAIPage() {
  return (
    <CaseStudyLayout
      name="LarpChat AI"
      tagline="Tier-based AI chat and image platform with full auth and rate limiting"
      status="live"
      stack={["React", "TypeScript", "Express", "Supabase", "OpenAI API", "Vercel"]}
      liveUrl="https://larpchatai.vercel.app"
      githubUrl="https://github.com/Manateek1/larpchatai"
      sections={[
        {
          title: "What it is",
          content:
            "LarpChat AI is a full-stack AI chat and image generation platform with tiered access. Users can chat with AI models and generate images, with different capabilities depending on whether they're a guest, free user, or Plus subscriber.",
        },
        {
          title: "Role",
          content:
            "Founder and developer — sole engineer. Built the full stack: React frontend, Express backend, Supabase auth, OpenAI integration, rate limiting, usage tracking, and Vercel deployment pipeline.",
        },
        {
          title: "Tech Stack",
          content: [
            "React + TypeScript — frontend SPA",
            "Express + TypeScript — backend server with serverless Vercel function entrypoints",
            "Supabase — email/password auth, user profiles, subscriptions, usage tracking",
            "OpenAI API — chat completions and image generation, server-side only",
            "Vercel — deployment with serverless API routes",
          ],
        },
        {
          title: "Tier System",
          content: [
            "Guest: basic model access, strict IP-based rate limits, no account required",
            "Free: smarter model, higher daily limits, requires sign-in",
            "Plus: frontier model, highest limits, requires active subscription",
            "Plan enforcement happens entirely server-side — the client cannot spoof a tier",
          ],
        },
        {
          title: "Key Features",
          content: [
            "Chat and image generation with tier-based model routing",
            "Supabase auth with session persistence across visits",
            "IP-based guest limits and user-based signed-in limits",
            "Daily usage tracking in a usage_events table",
            "Structured server-side logging for blocked requests and model usage",
            "PDF upload parsing (attachments gated to signed-in users)",
            "AI-generated chat titles using a lightweight model",
            "Public landing page, pricing page, and /app workspace",
          ],
        },
        {
          title: "Security",
          content: [
            "OpenAI API key is server-only — never exposed to the browser",
            "Supabase service role key is server-only",
            "Row Level Security on all Supabase tables",
            "All plan enforcement and model selection happens on the backend",
            "Upload requests are minute-rate-limited server-side",
            "Structured logs capture abuse patterns without storing user content",
          ],
        },
        {
          title: "Current Status",
          content:
            "Live at larpchatai.vercel.app. Active development — Stripe billing for Plus tier is the next planned milestone.",
        },
      ]}
    />
  );
}
