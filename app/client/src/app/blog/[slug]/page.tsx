import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/page-intro";
import { RichText } from "@/components/rich-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWritingBySlug, getWritings } from "@/lib/site-content";

type WritingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const writings = await getWritings();
  return writings.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWritingBySlug(slug);

  if (!entry) {
    return { title: "Post | Book Sam" };
  }

  return {
    title: `${entry.title} | Book Sam`,
    description: entry.summary,
  };
}

export default async function BlogEntryPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const entry = await getWritingBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-14">
      <PageIntro
        eyebrow={`${entry.eyebrow} · ${entry.reading_time}`}
        lede={entry.summary}
        title={entry.title}
      >
        <Button render={<Link href="/blog" />} variant="ghost">
          Back to blog
        </Button>
      </PageIntro>

      <section className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
        <Card className="h-fit rounded-[1.8rem] border-border/70 xl:sticky xl:top-6">
          <CardHeader className="gap-4">
            <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
              Entry
            </Badge>
            <CardTitle className="font-serif text-4xl leading-none">{entry.category}</CardTitle>
            <CardDescription className="text-sm leading-7">
              This page is meant to be read comfortably, with enough space for the argument rather than compressing
              everything into a narrow content strip.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="rounded-[1.8rem] border-border/70">
          <CardHeader className="gap-4">
            <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="secondary">
              {entry.category}
            </Badge>
          </CardHeader>
          <CardContent>
            <RichText className="grid gap-5 text-base leading-8 text-foreground/92" value={entry.body} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
