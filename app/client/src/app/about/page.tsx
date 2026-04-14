import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { capabilityRows, getExperiences, getSiteProfile } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const profile = await getSiteProfile();
  const experiences = await getExperiences();

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="About"
        title="Background, working style, and the environments that shaped how I build."
        lede={`${profile.summary} I care about systems that stay readable, deploy cleanly, and keep making sense after the first release.`}
      />

      <section className="section-block split-section">
        <Reveal className="feature-panel">
          <p className="mini-label">Working style</p>
          <h2>I like products that are sharp on the surface and disciplined underneath.</h2>
          <p>
            That usually means clear interfaces, well-chosen abstractions, and enough automation that the team does
            not keep paying the same operational cost over and over again.
          </p>
        </Reveal>
        <Reveal className="feature-panel" delay={80}>
          <p className="mini-label">Based in</p>
          <h2>{profile.location}</h2>
          <p>
            I am currently studying in Adelaide while continuing to build around AI workflows, web delivery, and
            systems thinking.
          </p>
        </Reveal>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="mini-label">Capabilities</p>
          <h2>Core stack and engineering focus</h2>
        </div>
        <div className="capability-grid">
          {capabilityRows.map((row, index) => (
            <Reveal className="capability-card" delay={index * 60} key={row.label}>
              <p className="mini-label">{row.label}</p>
              <p>{row.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="mini-label">Experience</p>
          <h2>Where this approach was built</h2>
        </div>
        <div className="timeline-list">
          {experiences.map((experience, index) => (
            <Reveal className="timeline-card" delay={index * 70} key={`${experience.company}-${experience.role}`}>
              <div className="timeline-topline">
                <div>
                  <p className="mini-label">{experience.company}</p>
                  <h3>{experience.role}</h3>
                  <p className="supporting-text">{experience.location}</p>
                </div>
                <span className="timeline-period">{experience.period}</span>
              </div>
              <p>{experience.summary}</p>
              <ul className="detail-list">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
