import { PageIntro } from "@/components/page-intro";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCapabilities, getExperiences, getSiteProfile } from "@/lib/site-content";
import { RESUME_PDF_FILENAME, RESUME_PDF_URL } from "@/lib/resume";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const profile = await getSiteProfile();
  const experiences = await getExperiences();
  const capabilities = await getCapabilities();

  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="Current chapter"
        lede="A product-minded software engineer working across interface craft, backend clarity, and AI-enabled delivery."
        title="Narrative of a systems architect."
        titleClassName="max-w-4xl"
      />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:p-8">
            <p className="eyebrow-label">Overview</p>
            <RichText className="text-sm leading-7 text-foreground" value={profile.summary} />
            <p className="text-sm leading-7 text-muted-foreground">
              I prefer products that stay easy to use, easy to operate, and easy to change.
            </p>
            <div>
              <Button render={<a download={RESUME_PDF_FILENAME} href={RESUME_PDF_URL} />} size="sm" variant="outline">
                Download resume PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <ProjectCover
          caption="A practice shaped by shipping software that stays readable under scale."
          className="min-h-[24rem]"
          eyebrow="Portrait of the work"
          title="About visual"
        />
      </section>

      <section className="page-band rounded-[0.85rem] px-6 py-8 sm:px-8 sm:py-10">
        <blockquote className="mx-auto max-w-4xl text-center font-serif text-3xl leading-tight tracking-[-0.03em] text-foreground sm:text-[2.35rem]">
          “Software gets more valuable when the system behind it stays calm, legible, and easy to evolve.”
        </blockquote>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="eyebrow-label">Experience</p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Work history</h2>
        </div>

        <div className="grid gap-4">
          {experiences.map((experience, index) => (
            <Reveal delay={index * 40} key={`${experience.company}-${experience.role}`}>
              <Card>
                <CardContent className="grid gap-6 p-6 lg:grid-cols-[minmax(200px,0.34fr)_minmax(0,1fr)] lg:p-8">
                  <div className="flex flex-col gap-2">
                    <p className="eyebrow-label">{experience.company}</p>
                    <p className="text-sm font-medium text-foreground">{experience.period}</p>
                    <p className="text-sm text-muted-foreground">{experience.location}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-serif text-[1.9rem] leading-tight tracking-[-0.03em]">{experience.role}</h3>
                    {experience.highlights[0] ? (
                      <p className="text-sm leading-7 text-foreground/88">{experience.highlights[0]}</p>
                    ) : null}
                    <RichText className="text-sm leading-7 text-muted-foreground" value={experience.summary} />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {capabilities.map((row) => (
          <Card key={row.label}>
            <CardContent className="flex h-full flex-col gap-3 p-6">
              <p className="eyebrow-label">{row.label}</p>
              <p className="text-sm leading-7 text-foreground">{row.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
