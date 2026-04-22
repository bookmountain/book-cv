import Link from "next/link";

import { MsLogo } from "@/components/prototype-ui";
import { getDisplayCapabilities, getPortfolioContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getPortfolioContent();
  const profile = content.profile;
  const education = content.education;
  const experiences = content.experiences;
  const capabilities = getDisplayCapabilities(content);
  const summaryParagraphs = profile.summary
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-label">About</div>
          <h1 className="section-title">Book Sam.</h1>

          <div style={{ display: "grid", gap: 40, marginTop: 8 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", marginBottom: 28 }}>Experience</h2>
              <div style={{ display: "grid", gap: 0, position: "relative" }}>
                <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 1, background: "var(--border)" }} />
                {experiences.map((experience, index) => (
                  <div key={experience.company} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 20, marginBottom: 36 }}>
                    <div
                      style={{
                        width: 15,
                        height: 15,
                        borderRadius: "50%",
                        background: index === 0 ? "var(--accent)" : "var(--secondary)",
                        border: `2px solid ${index === 0 ? "var(--accent)" : "var(--border-strong)"}`,
                        flexShrink: 0,
                        zIndex: 1,
                        marginTop: 3,
                      }}
                    />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                        {index === 0 ? <MsLogo size={16} /> : null}
                        <span style={{ fontWeight: 700, color: "var(--foreground)", fontSize: 15 }}>{experience.company}</span>
                        <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--muted-foreground)" }}>{experience.period}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 10 }}>{experience.role}</div>
                      <div style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8 }}>{experience.summary}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {summaryParagraphs.length ? (
              summaryParagraphs.map((paragraph, index) => (
                <p key={index} style={{ fontSize: 16, color: "var(--muted-foreground)", lineHeight: 1.85 }}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p style={{ fontSize: 16, color: "var(--muted-foreground)", lineHeight: 1.85 }}>{profile.summary}</p>
            )}

            {capabilities.length ? (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", marginBottom: 24 }}>Current focus</h2>
                <div style={{ display: "grid", gap: 14 }}>
                  {capabilities.slice(0, 4).map((row) => (
                    <div
                      className="card"
                      key={row.label}
                      style={{ padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, color: "var(--foreground)", fontSize: 14 }}>{row.label}</span>
                          <span className="tag green" style={{ fontSize: 10 }}>
                            Focus
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.7 }}>{row.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {education.length ? (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", marginBottom: 24 }}>Education</h2>
                <div style={{ display: "grid", gap: 14 }}>
                  {education.map((entry) => (
                    <div className="card" key={`${entry.degree}-${entry.institution}`} style={{ padding: "18px 22px", display: "grid", gap: 8 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 16,
                          flexWrap: "wrap",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--foreground)", fontSize: 15 }}>{entry.degree}</div>
                          <div style={{ fontSize: 13, color: "var(--muted-foreground)", marginTop: 4 }}>{entry.institution}</div>
                        </div>
                        <span className="tag">{entry.period}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "JetBrains Mono" }}>{entry.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div style={{ paddingTop: 8 }}>
              <Link className="btn btn-primary" href="/contact">
                Get in touch →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
