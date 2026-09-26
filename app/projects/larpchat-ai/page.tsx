import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "LarpChat AI",
};

export default function LarpChatAIPage() {
  return (
    <CaseStudyLayout
      name="LarpChat AI"
      tagline="AI chat and image-generation prototype"
      status="prototype"
      stack={[]}
      sections={[
        {
          title: "What it is",
          content: "An in-development prototype exploring an AI chat and image-generation experience.",
        },
        {
          title: "Role",
          content: "Founder and developer.",
        },
        {
          title: "Current Status",
          content: "Prototype under development.",
        },
      ]}
    />
  );
}
