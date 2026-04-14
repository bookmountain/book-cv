import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const writings = await getWritings();

  return (
    <div className="flex flex-col gap-14">
      <PageIntro
        eyebrow="Blog"
        lede="Posts live here as a proper archive instead of an afterthought on the homepage. The writing is part of the portfolio because the decisions behind the work matter as much as the screenshots."
        title="Writing on engineering practice, study, and using AI tools without dropping the engineering bar."
      />

      <section className="grid gap-4">
        {writings.map((entry, index) => (
          <Reveal delay={index * 60} key={entry.slug}>
            <Card className="rounded-[1.8rem] border-border/70">
              <CardHeader className="gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-full px-3 py-1 uppercase tracking-[0.2em]" variant="outline">
                    {entry.eyebrow}
                  </Badge>
                  <Badge className="rounded-full px-3 py-1" variant="secondary">
                    {entry.reading_time}
                  </Badge>
                </div>
                <CardTitle className="font-serif text-4xl leading-none text-balance">{entry.title}</CardTitle>
                <CardDescription className="text-sm leading-7">
                  {entry.category} · {entry.summary}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button render={<Link href={`/blog/${entry.slug}`} />} size="sm" variant="ghost">
                  Read post
                </Button>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
