import { ExperienceSection } from "@/components/prototype-ui";
import { getPortfolioContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const content = await getPortfolioContent();

  return (
    <div className="page-wrapper">
      <ExperienceSection education={content.education} experiences={content.experiences} index="" />
    </div>
  );
}
