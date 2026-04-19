import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { getReferences } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function ReferencesPage() {
  const references = await getReferences();

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="animate-fadeUp" style={{ animationDelay: "0.1s", maxWidth: 760 }}>
            <div className="section-label">References</div>
            <h1 className="section-title">References and endorsements.</h1>
            <p className="section-sub">People who can speak to how I work, how I collaborate, and how I operate under delivery pressure.</p>
          </div>

          <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {references.map((reference, index) => {
              const fallbackQuote = `${reference.name} can speak to my ${reference.relationship.toLowerCase()} at ${reference.organization}.`;

              return (
                <Reveal delay={index * 60} key={reference.email || reference.name}>
                  <div className="card" style={{ display: "flex", flexDirection: "column", gap: 24, minHeight: 280, padding: "24px 24px 22px" }}>
                    <p style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.2, color: "#fff", letterSpacing: "-0.03em" }}>
                      {reference.quote || fallbackQuote}
                    </p>

                    <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--border)", display: "grid", gap: 6 }}>
                      <span className="tag green" style={{ width: "fit-content" }}>
                        {reference.relationship}
                      </span>
                      <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{reference.name}</p>
                      <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                        {reference.role}, {reference.organization}
                      </p>
                      <a
                        className="btn btn-ghost"
                        href={toMailto(reference.email)}
                        style={{ justifySelf: "start", marginTop: 8, padding: "8px 14px", fontSize: 12 }}
                      >
                        {reference.email}
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={160}>
            <div
              className="card"
              style={{
                marginTop: 48,
                padding: "26px 28px",
                display: "grid",
                gap: 20,
                alignItems: "center",
                gridTemplateColumns: "minmax(0, 1fr) auto",
              }}
            >
              <div>
                <div className="section-label" style={{ marginBottom: 12 }}>
                  Start A Conversation
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>
                  Need a direct introduction or want to discuss a project?
                </h2>
                <p style={{ maxWidth: 620, color: "var(--muted-foreground)", fontSize: 15, lineHeight: 1.75 }}>
                  The fastest path is to reach out directly. I can provide context, examples, and the right references for the work.
                </p>
              </div>
              <Link className="btn btn-primary" href="/contact">
                Contact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
