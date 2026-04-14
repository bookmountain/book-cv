import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { capabilityRows, getExperiences, getSiteProfile } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const profile = await getSiteProfile();
  const experiences = await getExperiences();

  return (
    <div className="flex flex-col gap-10">
      <PageIntro
        eyebrow="About"
        lede="Frontend, backend, automation, and AI-enabled delivery."
        title="About"
      />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <Card>
          <CardContent className="flex flex-col gap-3 p-5">
            <p className="text-sm leading-7 text-foreground">{profile.summary}</p>
            <p className="text-sm leading-7 text-muted-foreground">
              I prefer products that stay easy to use, easy to operate, and easy to change.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-3 p-5">
            {capabilityRows.map((row) => (
              <div className="flex flex-col gap-1" key={row.label}>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{row.label}</p>
                <p className="text-sm leading-7 text-foreground">{row.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4 border-t pt-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Experience</p>
          <h2 className="text-2xl font-semibold tracking-tight">Work history</h2>
        </div>

        <div className="grid gap-4">
          {experiences.map((experience, index) => (
            <Reveal delay={index * 40} key={`${experience.company}-${experience.role}`}>
              <Card>
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{experience.company}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{experience.period}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{experience.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{experience.role}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{experience.summary}</p>
                  {experience.highlights[0] ? (
                    <p className="text-sm leading-7 text-foreground/85">{experience.highlights[0]}</p>
                  ) : null}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
