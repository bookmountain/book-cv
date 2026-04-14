import type { ProjectScreenshot } from "@/lib/site-content";

import { Card, CardContent } from "@/components/ui/card";

type ProjectShotProps = {
  screenshot: ProjectScreenshot;
};

export function ProjectShot({ screenshot }: ProjectShotProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="overflow-hidden rounded-xl border bg-muted/50">
          <div className="aspect-[16/10]">
            {screenshot.image_src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={screenshot.alt_text || screenshot.title}
                className="h-full w-full object-cover"
                src={screenshot.image_src}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm leading-7 text-muted-foreground">
                Add a screenshot in Django admin.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold tracking-tight">{screenshot.title}</h3>
          <p className="text-sm leading-7 text-muted-foreground">{screenshot.introduction}</p>
        </div>
      </CardContent>
    </Card>
  );
}
