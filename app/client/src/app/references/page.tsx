import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getReferences } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function ReferencesPage() {
  const references = await getReferences();

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="References"
        title="Reference cards shaped like reviews, with quotes you can edit in the admin."
        lede="I set this page up so each reference can read like a real testimonial while still keeping direct contact details available."
      />

      <section className="section-block">
        <div className="quote-grid">
          {references.map((reference, index) => (
            <Reveal className="quote-card" delay={index * 70} key={reference.email || reference.name}>
              <span className="quote-mark">“</span>
              <p className={`quote-body${reference.quote ? "" : " quote-fallback"}`}>
                {reference.quote || "Add the exact quote from this reference in Django admin to replace this placeholder."}
              </p>
              <div className="quote-meta">
                <strong>{reference.name}</strong>
                <span>{reference.relationship}</span>
                <span>
                  {reference.role}, {reference.organization}
                </span>
                <a href={toMailto(reference.email)}>{reference.email}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
