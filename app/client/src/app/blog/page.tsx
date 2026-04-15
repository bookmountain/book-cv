import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const writings = await getWritings();

  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="Blog"
        lede="Notes on engineering practice, AI tooling, architecture, and the decisions that make software easier to live with."
        title="Writing on systems, product craft, and software design."
        titleClassName="max-w-4xl"
      />

      <section className="divide-y divide-black/6">
        {writings.map((entry, index) => (
          <Reveal delay={index * 40} key={entry.slug}>
            <article className="grid gap-5 py-8 md:grid-cols-[170px_minmax(0,1fr)]">
              <div className="flex flex-col gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                <span>{entry.category}</span>
                <span>{entry.reading_time}</span>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="max-w-3xl font-serif text-[2rem] leading-tight tracking-[-0.03em]">{entry.title}</h2>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{entry.summary}</p>
                <div>
                  <Button render={<Link href={`/blog/${entry.slug}`} />} size="sm" variant="ghost">
                    Read post
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="page-band grid gap-5 rounded-[0.85rem] px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex flex-col gap-3">
          <p className="eyebrow-label">Stay in touch</p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Want to discuss an article, a system, or a project?</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            The same topics I write about are the ones I enjoy building in practice.
          </p>
        </div>
        <Button render={<Link href="/contact" />} size="lg">
          Contact
        </Button>
      </section>
    </div>
  );
}
