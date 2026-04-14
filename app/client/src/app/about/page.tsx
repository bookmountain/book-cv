import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capabilityRows, getExperiences, getSiteProfile } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const profile = await getSiteProfile();
  const experiences = await getExperiences();

  return (
    <div className="flex flex-col gap-14">
      <PageIntro
        eyebrow="About"
        lede={`${profile.summary} I aim for software that reads clearly, deploys cleanly, and keeps making sense after teams start iterating on it.`}
        title="Background, working style, and the environments that shaped how I build products."
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <Reveal>
          <Card className="h-full rounded-[1.8rem] border-border/70">
            <CardHeader className="gap-4">
              <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                Working style
              </Badge>
              <CardTitle className="font-serif text-4xl leading-none text-balance">
                I like products that feel considered on the surface and disciplined underneath.
              </CardTitle>
              <CardDescription className="text-base leading-8">
                In practice that means clear interfaces, restrained abstractions, automation that removes real repeat
                work, and enough structural discipline that the system stays readable after the first release.
              </CardDescription>
            </CardHeader>
          </Card>
        </Reveal>

        <Reveal delay={80}>
          <Card className="h-full rounded-[1.8rem] border-border/70">
            <CardHeader className="gap-4">
              <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="secondary">
                Current phase
              </Badge>
              <CardTitle className="font-serif text-4xl leading-none">{profile.location}</CardTitle>
              <CardDescription className="text-base leading-8">
                I am currently studying in Adelaide while continuing to build around AI workflows, web delivery,
                systems thinking, and the practical side of shipping maintainable software.
              </CardDescription>
            </CardHeader>
          </Card>
        </Reveal>
      </section>

      <Separator />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
            Capabilities
          </Badge>
          <h2 className="max-w-3xl font-serif text-3xl leading-none text-balance sm:text-4xl">
            Core stack and engineering focus
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {capabilityRows.map((row, index) => (
            <Reveal delay={index * 60} key={row.label}>
              <Card className="h-full rounded-[1.5rem] border-border/70">
                <CardHeader className="gap-3">
                  <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                    {row.label}
                  </Badge>
                  <CardDescription className="text-base leading-8 text-foreground/88">{row.value}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
            Experience
          </Badge>
          <h2 className="max-w-3xl font-serif text-3xl leading-none text-balance sm:text-4xl">
            Where this approach was shaped in practice
          </h2>
        </div>

        <div className="grid gap-4">
          {experiences.map((experience, index) => (
            <Reveal delay={index * 70} key={`${experience.company}-${experience.role}`}>
              <Card className="rounded-[1.7rem] border-border/70">
                <CardHeader className="gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full px-3 py-1 uppercase tracking-[0.2em]" variant="outline">
                      {experience.company}
                    </Badge>
                    <Badge className="rounded-full px-3 py-1" variant="secondary">
                      {experience.period}
                    </Badge>
                  </div>
                  <CardTitle className="font-serif text-3xl leading-none">{experience.role}</CardTitle>
                  <CardDescription className="text-sm leading-7">
                    {experience.location} · {experience.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {experience.highlights.map((highlight) => (
                    <p className="text-sm leading-7 text-muted-foreground" key={highlight}>
                      {highlight}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
