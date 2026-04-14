import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const writings = await getWritings();

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Blog"
        title="Posts about work, study, and how I use AI without lowering the engineering bar."
        lede="This page lists the writing separately from the main landing page so each post has room to stand on its own."
      />

      <section className="section-block">
        <div className="blog-list">
          {writings.map((entry, index) => (
            <Reveal className="blog-row" delay={index * 60} key={entry.slug}>
              <div>
                <p className="mini-label">
                  {entry.eyebrow} · {entry.reading_time}
                </p>
                <h2>{entry.title}</h2>
                <p className="supporting-text">{entry.category}</p>
                <p>{entry.summary}</p>
              </div>
              <div className="blog-row-actions">
                <Link className="button button-solid" href={`/blog/${entry.slug}`}>
                  Read post
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
