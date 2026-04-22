import Link from "next/link";

import { PostVisual } from "@/components/prototype-ui";
import { Reveal } from "@/components/reveal";
import { getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const writings = await getWritings();

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="animate-fadeUp" style={{ animationDelay: "0.1s", maxWidth: 760 }}>
            <div className="section-label">Blog</div>
            <h1 className="section-title">Writing on engineering and AI.</h1>
            <p className="section-sub">A cleaner editorial feed with room for headlines, summaries, and preview images.</p>
          </div>

          <div className="prototype-blog-feed">
            {writings.map((entry, index) => (
              <Reveal delay={index * 60} key={entry.slug}>
                <Link className="prototype-blog-feed-row" href={`/blog/${entry.slug}`}>
                  <div className="prototype-blog-feed-copy">
                    <div className="prototype-blog-feed-kicker">
                      {entry.eyebrow ? <span className="prototype-blog-feed-publication">{entry.eyebrow}</span> : null}
                      {entry.category ? <span>{entry.category}</span> : null}
                      <span>{entry.reading_time}</span>
                    </div>
                    <h2 className="prototype-blog-feed-title">{entry.title}</h2>
                    <p className="prototype-blog-feed-summary">{entry.summary}</p>
                  </div>

                  <div className="prototype-blog-feed-thumb" aria-hidden="true">
                    <PostVisual entry={entry} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
