import type { ProjectScreenshot } from "@/lib/site-content";

import { ProjectCover } from "@/components/project-cover";
import { RichText } from "@/components/rich-text";

type ProjectShotProps = {
  screenshot: ProjectScreenshot;
};

export function ProjectShot({ screenshot }: ProjectShotProps) {
  return (
    <div className="card" style={{ height: "100%", overflow: "hidden" }}>
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <ProjectCover
          alt={screenshot.alt_text || screenshot.title}
          caption={null}
          className="aspect-[16/10]"
          imageSrc={screenshot.image_src}
          title={screenshot.title}
        />
      </div>

      <div style={{ padding: "18px 20px 20px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)", lineHeight: 1.4, marginBottom: 8 }}>{screenshot.title}</h3>
        <RichText className="text-sm leading-7 text-muted-foreground" value={screenshot.introduction} />
      </div>
    </div>
  );
}
