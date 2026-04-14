import type { ProjectScreenshot } from "@/lib/site-content";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectShotProps = {
  screenshot: ProjectScreenshot;
};

export function ProjectShot({ screenshot }: ProjectShotProps) {
  return (
    <Card className="h-full rounded-[1.5rem] border-border/70">
      <CardContent className="p-3">
        <div className="overflow-hidden rounded-[1.1rem] border border-border/70 bg-muted/70">
          <div className="aspect-[16/10]">
            {screenshot.image_src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={screenshot.alt_text || screenshot.title}
                className="h-full w-full object-cover"
                src={screenshot.image_src}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                <Badge variant="outline">Screenshot slot</Badge>
                <p className="text-sm leading-6 text-muted-foreground">
                  Add an image in Django admin for this project section.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardHeader className="gap-3">
        <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.2em]" variant="outline">
          Screenshot
        </Badge>
        <CardTitle className="font-serif text-2xl leading-tight">{screenshot.title}</CardTitle>
        <CardDescription className="text-sm leading-7 text-muted-foreground">
          {screenshot.introduction}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
