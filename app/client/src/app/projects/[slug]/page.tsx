import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectShot } from "@/components/project-shot";
import { ProjectVisual } from "@/components/prototype-ui";
import { Reveal } from "@/components/reveal";
import { RichText } from "@/components/rich-text";
import { getProjectBySlug } from "@/lib/site-content";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project | Book Sam" };
  }

  return {
    title: `${project.title} | Book Sam`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const stackItems = project.stack
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const heroShot = project.screenshots.find((shot) => shot.image_src);

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="animate-fadeUp" style={{ animationDelay: "0.1s", maxWidth: 760 }}>
            <div className="section-label">{project.eyebrow}</div>
            <h1 className="section-title" style={{ fontSize: "clamp(34px,5vw,52px)", marginBottom: 16 }}>
              {project.title}
            </h1>
            <p className="section-sub" style={{ maxWidth: 680, marginBottom: 28 }}>
              {project.summary}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {project.live_url ? (
                <a className="btn btn-primary" href={project.live_url} rel="noreferrer" target="_blank">
                  Live demo ↗
                </a>
              ) : null}
              {project.repo_url ? (
                <a className="btn btn-ghost" href={project.repo_url} rel="noreferrer" target="_blank">
                  GitHub ↗
                </a>
              ) : null}
              <Link className="btn btn-ghost" href="/projects">
                Back to projects
              </Link>
            </div>
          </div>

          <Reveal delay={120}>
            <div className="card" style={{ overflow: "hidden", marginTop: 36 }}>
              {heroShot ? (
                <div style={{ borderBottom: "1px solid var(--border)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={heroShot.alt_text || project.title}
                    src={heroShot.image_src}
                    style={{ display: "block", width: "100%", aspectRatio: "16 / 7", objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div style={{ padding: "40px clamp(20px, 4vw, 40px)", borderBottom: "1px solid var(--border)" }}>
                  <ProjectVisual project={project} />
                </div>
              )}
            </div>
          </Reveal>

          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px]" style={{ gap: 32, marginTop: 32 }}>
            <div style={{ display: "grid", gap: 28 }}>
              <Reveal delay={160}>
                <section>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>About the project</h2>
                  <div className="card" style={{ padding: "24px 26px" }}>
                    <RichText className="text-sm leading-8 text-foreground/88" value={project.details} />
                  </div>
                </section>
              </Reveal>

              {project.highlights.length ? (
                <section>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Key outcomes</h2>
                  <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    {project.highlights.map((highlight, index) => (
                      <Reveal delay={180 + index * 60} key={highlight}>
                        <div className="card" style={{ padding: "18px 20px", height: "100%" }}>
                          <span className="tag green">Highlight</span>
                          <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--muted-foreground)", marginTop: 12 }}>{highlight}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </section>
              ) : null}

              {project.screenshots.length ? (
                <section>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Walkthrough</h2>
                  <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                    {project.screenshots.map((screenshot, index) => (
                      <Reveal delay={220 + index * 60} key={`${project.slug}-${screenshot.title}`}>
                        <ProjectShot screenshot={screenshot} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <Reveal delay={200}>
              <aside className="card" style={{ padding: "22px 24px", height: "fit-content", position: "sticky", top: 84 }}>
                <div style={{ display: "grid", gap: 22 }}>
                  <div>
                    <div className="section-label" style={{ marginBottom: 10 }}>
                      Type
                    </div>
                    <p style={{ fontSize: 14, color: "var(--foreground)" }}>{project.eyebrow}</p>
                  </div>

                  <div style={{ height: 1, background: "var(--border)" }} />

                  <div>
                    <div className="section-label" style={{ marginBottom: 10 }}>
                      Status
                    </div>
                    <p style={{ fontSize: 14, color: "var(--foreground)" }}>{project.live_url ? "Live" : "Build in progress"}</p>
                  </div>

                  <div style={{ height: 1, background: "var(--border)" }} />

                  <div>
                    <div className="section-label" style={{ marginBottom: 10 }}>
                      Stack
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {stackItems.map((item) => (
                        <span className="tag" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
