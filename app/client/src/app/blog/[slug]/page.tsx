import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/page-intro";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import { getWritingBySlug } from "@/lib/site-content";

type WritingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

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
      <PageIntro eyebrow="Blog" lede={entry.summary} title={entry.title}>
        <Button render={<Link href="/blog" />} variant="ghost">
          Back to blog
        </Button>
      </PageIntro>

      <section className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 pb-8 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          <span>{entry.category}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{entry.reading_time}</span>
        </div>

        <div className="rounded-[0.85rem] border border-black/6 bg-[rgba(255,255,255,0.74)] px-6 py-8 shadow-[0_18px_44px_rgba(15,23,42,0.05)] sm:px-8 sm:py-10">
          <RichText className="max-w-3xl text-[1rem] leading-8 text-foreground/92" value={entry.body} />
        </div>
      </section>
    </div>
  );
}
