import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const writings = await getWritings();

  return (
    <div className="flex flex-col gap-10">
      <PageIntro
        eyebrow="Blog"
        lede="Notes on engineering practice, AI tools, and software design."
        title="Blog"
      />

      <section className="grid gap-4">
        {writings.map((entry, index) => (
          <Reveal delay={index * 40} key={entry.slug}>
            <Card>
              <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{entry.category}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{entry.reading_time}</span>
                </div>
                <h2 className="text-xl font-semibold tracking-tight">{entry.title}</h2>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{entry.summary}</p>
                <div>
                  <Button render={<Link href={`/blog/${entry.slug}`} />} size="sm" variant="ghost">
                    Read post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
