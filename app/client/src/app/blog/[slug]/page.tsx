import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostVisual } from "@/components/prototype-ui";
import { Reveal } from "@/components/reveal";
import { RichText } from "@/components/rich-text";
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
    <div className="page-wrapper">
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="animate-fadeUp" style={{ animationDelay: "0.1s" }}>
            <div className="section-label">{entry.category}</div>
            <h1 className="section-title" style={{ fontSize: "clamp(32px,4.5vw,48px)", marginBottom: 16 }}>
              {entry.title}
            </h1>
            <p className="section-sub" style={{ maxWidth: 680, marginBottom: 24 }}>
              {entry.summary}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span className="tag">{entry.category}</span>
              <span className="tag">{entry.reading_time}</span>
              <Link className="btn btn-ghost" href="/blog">
                Back to blog
              </Link>
            </div>
          </div>

          <Reveal delay={120}>
            <div className="card" style={{ overflow: "hidden", marginTop: 32 }}>
              <PostVisual entry={entry} />
              <div style={{ padding: "28px clamp(20px, 4vw, 30px) 34px" }}>
                <RichText className="text-[0.98rem] leading-8 text-foreground/92" value={entry.body} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
