import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/page-intro";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col gap-10">
      <PageIntro eyebrow="Blog" lede={entry.summary} title={entry.title}>
        <Button render={<Link href="/blog" />} variant="ghost">
          Back to blog
        </Button>
      </PageIntro>

      <section className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 pb-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <span>{entry.category}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{entry.reading_time}</span>
        </div>

        <RichText className="grid gap-5 border-t pt-6 text-[15px] leading-8 text-foreground/92" value={entry.body} />
      </section>
    </div>
  );
}
