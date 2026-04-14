import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/page-intro";
import { RichText } from "@/components/rich-text";
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
    <div className="page-stack">
      <PageIntro
        eyebrow={`${entry.eyebrow} · ${entry.reading_time}`}
        title={entry.title}
        lede={entry.summary}
      >
        <Link className="button button-ghost" href="/blog">
          Back to blog
        </Link>
      </PageIntro>

      <article className="article-card">
        <p className="mini-label">{entry.category}</p>
        <RichText className="article-body" value={entry.body} />
      </article>
    </div>
  );
}
