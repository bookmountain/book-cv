import type { ProjectScreenshot } from "@/lib/site-content";

import { ProjectCover } from "@/components/project-cover";
import { Card, CardContent } from "@/components/ui/card";

type ProjectShotProps = {
  screenshot: ProjectScreenshot;
};

export function ProjectShot({ screenshot }: ProjectShotProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6">
        <ProjectCover
          alt={screenshot.alt_text || screenshot.title}
          caption={screenshot.image_src ? screenshot.title : null}
          className="aspect-[16/10]"
          imageSrc={screenshot.image_src}
          title={screenshot.title}
        />

        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-2xl font-medium tracking-[-0.02em]">{screenshot.title}</h3>
          <p className="text-sm leading-7 text-muted-foreground">{screenshot.introduction}</p>
        </div>
      </CardContent>
    </Card>
  );
}
