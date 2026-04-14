import type { PropsWithChildren } from "react";

import { Badge } from "@/components/ui/badge";

type PageIntroProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  lede: string;
}>;

export function PageIntro({ eyebrow, title, lede, children }: PageIntroProps) {
  return (
    <section className="flex flex-col gap-6">
      <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
        {eyebrow}
      </Badge>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-4xl font-serif text-5xl leading-none text-balance text-foreground sm:text-6xl xl:text-7xl">
            {title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{lede}</p>
        </div>

        {children ? <div className="flex flex-wrap gap-3 xl:justify-end">{children}</div> : null}
      </div>
    </section>
  );
}
