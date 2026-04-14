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
    <section className="flex flex-col gap-4 border-b pb-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
        <div className="flex flex-col gap-3">
          <h1
            className={cn(
              "max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-balance text-foreground sm:text-4xl xl:text-5xl",
              titleClassName,
            )}
          >
            {title}
          </h1>
          <p className={cn("max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base", ledeClassName)}>
            {lede}
          </p>
        </div>

        {children ? <div className="flex flex-wrap gap-3 xl:justify-end">{children}</div> : null}
      </div>
    </section>
  );
}
