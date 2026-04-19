import Link from "next/link";

import { HomeTerminal } from "@/components/home-terminal";
import { AISection, PostRow, ProjectCard } from "@/components/prototype-ui";
import { getDisplayCapabilities, getPortfolioContent, getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function getExperienceYears(periods: string[]) {
  const years = periods
    .flatMap((period) => period.match(/\b(19|20)\d{2}\b/g) ?? [])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));

  if (!years.length) {
    return 5;
  }

  return Math.max(1, Math.max(...years) - Math.min(...years));
}

export default async function HomePage() {
  const content = await getPortfolioContent();
  const featuredProjects = content.projects.filter((project) => project.is_featured).slice(0, 3);
  const posts = (await getWritings()).slice(0, 3);
  const capabilityRows = getDisplayCapabilities(content);
  const experienceYears = getExperienceYears(content.experiences.map((experience) => experience.period));
  const writingIndex = capabilityRows.length ? "04" : "03";

  const terminalLines = [
    { command: "$ whoami", output: `${content.profile.full_name} — ${content.profile.title}` },
    { command: "$ cat experience/microsoft.txt", output: "3 yrs · VDI Team · Azure AI Studio · Copilot · Jest" },
    {
      command: "$ ls skills/ai/",
      output: capabilityRows.slice(0, 6).map((row) => row.label.toLowerCase()).join("  ") || "rag  agents  ollama  prompting",
    },
    {
      command: "$ echo $STATUS",
      output: `Open to thoughtful engineering work · ${content.profile.location || "Australia"}`,
    },
  ];

  return (
    <div className="page-wrapper">
      <div
        className="container"
        style={{
          minHeight: "calc(100svh - var(--nav-height))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "clamp(28px, 6vw, 48px)",
          paddingBottom: "clamp(36px, 7vw, 64px)",
        }}
      >
        <div className="animate-fadeUp" style={{ animationDelay: "0.1s", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 14px",
              background: "rgba(0,164,239,0.08)",
              border: "1px solid rgba(0,164,239,0.2)",
              borderRadius: 6,
            }}
          >
            <span className="status-pulse" style={{ width: 10, height: 10, borderRadius: "50%", background: "#60b8f0" }} />
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#60b8f0", letterSpacing: "0.04em" }}>
              ex-Microsoft · VDI Team · 2022–2025
            </span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center" style={{ gap: 48 }}>
          <div>
            <h1
              className="animate-fadeUp"
              style={{
                animationDelay: "0.2s",
                fontSize: "clamp(36px,5vw,58px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#fff",
                marginBottom: 20,
              }}
            >
              Engineering
              <br />
              <span style={{ color: "var(--accent)" }}>with intent.</span>
            </h1>
            <p
              className="animate-fadeUp"
              style={{
                animationDelay: "0.35s",
                color: "var(--muted-foreground)",
                fontSize: 16,
                lineHeight: 1.75,
                marginBottom: 32,
                maxWidth: 420,
              }}
            >
              {content.profile.summary}
            </p>
            <div className="animate-fadeUp" style={{ animationDelay: "0.5s", display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-primary" href="/projects">
                View work
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                Get in touch
              </Link>
            </div>

            <div
              className="animate-fadeUp"
              style={{ animationDelay: "0.65s", display: "flex", gap: 28, marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}
            >
              {[
                [`${experienceYears}`, "years exp."],
                ["Microsoft", "alumnus"],
                [content.profile.location.split(",")[0] || "Adelaide", "based"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{value}</div>
                  <div style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "JetBrains Mono", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fadeUp" style={{ animationDelay: "0.4s" }}>
            <HomeTerminal lines={terminalLines} />
          </div>
        </div>
      </div>

      <hr className="divider" />

      <section className="section">
        <div className="container">
          <div className="section-label">02 / Selected Work</div>
          <h2 className="section-title">Systems and interfaces built to last.</h2>
          <p className="section-sub">Delivery-focused projects spanning product UI, architecture, and developer tooling.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {featuredProjects.map((project, index) => (
              <ProjectCard delay={index * 100} key={project.slug} project={project} />
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link className="btn btn-ghost" href="/projects">
              All projects →
            </Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {capabilityRows.length ? (
        <>
          <AISection capabilities={capabilityRows} />
          <hr className="divider" />
        </>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="section-label">{writingIndex} / Writing</div>
          <h2 className="section-title">Engineering, AI, and delivery.</h2>
          <p className="section-sub">Notes from practice.</p>
          <div style={{ display: "grid", gap: 1, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            {posts.map((entry, index) => (
              <PostRow delay={index * 80} entry={entry} key={entry.slug} />
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link className="btn btn-ghost" href="/blog">
              All posts →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
