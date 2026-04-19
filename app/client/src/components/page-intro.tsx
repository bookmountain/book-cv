import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type PageIntroProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  lede: string;
  titleClassName?: string;
  ledeClassName?: string;
}>;

export function PageIntro({
  eyebrow,
  title,
  lede,
  titleClassName,
  ledeClassName,
  children,
}: PageIntroProps) {
  return (
    <section className="flex flex-col gap-8 pb-6 pt-4">
      <p className="section-kicker">{eyebrow}</p>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
        <div className="flex flex-col gap-3">
          <h1
            className={cn(
              "max-w-5xl font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance text-foreground sm:text-5xl xl:text-[4.45rem]",
              titleClassName,
            )}
          >
            {title}
          </h1>
          <p className={cn("max-w-2xl text-base leading-8 text-muted-foreground", ledeClassName)}>
            {lede}
          </p>
        </div>

        {children ? <div className="flex flex-wrap gap-3 xl:max-w-xs xl:flex-col xl:items-start">{children}</div> : null}
      </div>
    </section>
  );
}
