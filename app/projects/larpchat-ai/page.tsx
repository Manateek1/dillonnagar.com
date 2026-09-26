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
          content: "A live AI chat and image-generation demo.",
        },
        {
          title: "Role",
          content: "Founder and developer.",
        },
        {
          title: "Current Status",
          content: "The demo is live and usable, and I continue to develop the product.",
        },
      ]}
    />
  );
}
