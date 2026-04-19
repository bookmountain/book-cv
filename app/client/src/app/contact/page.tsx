import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { getSiteProfile } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function ContactPage() {
  const profile = await getSiteProfile();

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-label">Contact</div>
          <h1 className="section-title">Let&apos;s build something.</h1>
          <p className="section-sub">Open to graduate roles, collaborations, or just a conversation about engineering and AI.</p>

          <div className="grid gap-12 md:grid-cols-2" style={{ alignItems: "start" }}>
            <div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--muted-foreground)",
                  marginBottom: 20,
                  fontFamily: "JetBrains Mono",
                  letterSpacing: "0.06em",
                }}
              >
                FIND ME
              </h3>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { label: "GitHub", value: stripProtocol(profile.github_url), href: profile.github_url },
                  { label: "LinkedIn", value: stripProtocol(profile.linkedin_url), href: profile.linkedin_url },
                  { label: "Email", value: profile.email, href: toMailto(profile.email) },
                ].map((item) => (
                  <a className="card prototype-link-card" href={item.href} key={item.label} rel="noreferrer" style={{ padding: "14px 18px" }} target="_blank">
                    <div>
                      <div style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "JetBrains Mono", marginBottom: 3 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{item.value}</div>
                    </div>
                    <span style={{ color: "var(--muted-foreground)" }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <ContactInquiryForm email={profile.email} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
