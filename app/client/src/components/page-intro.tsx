import type { PropsWithChildren } from "react";

type PageIntroProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  lede: string;
}>;

export function PageIntro({ eyebrow, title, lede, children }: PageIntroProps) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-lede">{lede}</p>
      {children ? <div className="intro-actions">{children}</div> : null}
    </section>
  );
}
