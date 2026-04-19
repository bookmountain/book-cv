import { BlogCard } from "@/components/prototype-ui";
import { getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const writings = await getWritings();

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="section-label">Blog</div>
          <h1 className="section-title">Writing on engineering and AI.</h1>
          <p className="section-sub">Thinking in public — notes from practice, study, and building.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {writings.map((entry, index) => (
              <BlogCard delay={index * 100} entry={entry} key={entry.slug} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
