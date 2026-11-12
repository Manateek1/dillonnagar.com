import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "LarpChat AI",
};

export default function LarpChatAIPage() {
  return (
    <CaseStudyLayout
      name="LarpChat AI"
      tagline="AI chat and image-generation demo"
      status="live"
      stack={[]}
      liveUrl="https://larpchatai.vercel.app"
      sections={[
        {
          title: "What it is",
          content: "An AI chat and image-generation demo.",
        },
        {
          title: "Role",
          content: "Founder and developer.",
        },
        {
          title: "Current Status",
          content: "The demo is available to try, and I continue to develop the product.",
        },
      ]}
    />
  );
}
