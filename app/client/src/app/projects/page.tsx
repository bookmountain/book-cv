import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjects } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="Projects"
        lede="A curated archive of product work, architectural exploration, and practical engineering experiments."
        title="Selected works in systems engineering and product architecture."
        titleClassName="max-w-4xl text-[2.8rem] sm:text-5xl xl:text-[4rem]"
      />

      <section className="grid gap-4">
        {projects.map((project, index) => (
          <Reveal delay={index * 40} key={project.slug}>
            <Card>
              <CardContent className="grid gap-8 p-6 lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1fr)] lg:p-8">
                <ProjectCover
                  alt={project.screenshots[0]?.alt_text}
                  className="aspect-[4/3] h-full min-h-[16rem]"
                  imageSrc={project.screenshots[0]?.image_src}
                  title={project.title}
                />

                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    <span>{project.eyebrow}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{project.live_url ? "Live" : project.is_featured ? "Featured" : "In progress"}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h2 className="font-serif text-[2rem] leading-tight tracking-[-0.03em]">{project.title}</h2>
                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{project.summary}</p>
                  </div>

                  {project.highlights[0] ? (
                    <p className="max-w-2xl text-sm leading-7 text-foreground/88">{project.highlights[0]}</p>
                  ) : null}

                  <div className="flex flex-wrap gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {project.stack.split(",").map((item) => (
                      <span key={item.trim()}>{item.trim()}</span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    <Button render={<Link href={`/projects/${project.slug}`} />} size="sm" variant="outline">
                      View project
                    </Button>
                    {project.repo_url ? (
                      <Button
                        render={<a href={project.repo_url} rel="noreferrer" target="_blank" />}
                        size="sm"
                        variant="ghost"
                      >
                        GitHub
                      </Button>
                    ) : null}
                    {project.live_url ? (
                      <Button
                        render={<a href={project.live_url} rel="noreferrer" target="_blank" />}
                        size="sm"
                        variant="ghost"
                      >
                        Live demo
                      </Button>
                      ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>

      <section className="page-band grid gap-5 rounded-[0.85rem] px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex flex-col gap-3">
          <p className="eyebrow-label">Next collaboration</p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Interested in collaborating on the next build?</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            I’m open to product engineering, system design, and delivery work where clarity matters as much as speed.
          </p>
        </div>
        <Button render={<Link href="/contact" />} size="lg">
          Get in touch
        </Button>
      </section>
    </div>
  );
}
