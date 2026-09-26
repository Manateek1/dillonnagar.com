import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "LarpChat AI",
};

export default function LarpChatAIPage() {
  return (
    <CaseStudyLayout
      name="LarpChat AI"
      tagline="Live AI chat and image-generation demo"
      status="live"
      stack={[]}
      liveUrl="https://larpchatai.vercel.app"
      sections={[
        {
          title: "What it is",
          content: "An active AI chat and image-generation demo with official paid tiers.",
        },
        {
          title: "Role",
          content: "Founder and developer.",
        },
        {
          title: "Current Status",
          content: "The demo is live with paid tiers. The product is still under development and needs major work.",
        },
      ]}
    />
  );
}
