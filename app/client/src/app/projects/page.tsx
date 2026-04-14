import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjects } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-10">
      <PageIntro
        eyebrow="Projects"
        lede="Selected builds, open-source work, and active experiments."
        title="My projects"
      />

      <section className="grid gap-4">
        {projects.map((project, index) => (
          <Reveal delay={index * 40} key={project.slug}>
            <Card>
              <CardContent className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:p-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{project.eyebrow}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{project.live_url ? "Live" : project.is_featured ? "Featured" : "In progress"}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">{project.title}</h2>
                    <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{project.summary}</p>
                  </div>

                  {project.highlights[0] ? (
                    <p className="text-sm leading-7 text-foreground/85">{project.highlights[0]}</p>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    <Button render={<Link href={`/projects/${project.slug}`} />} size="sm" variant="outline">
                      About the project
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

                <div className="flex h-full flex-col gap-3 rounded-xl border bg-muted/35 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Stack</p>
                  <p className="text-sm leading-7 text-foreground">{project.stack}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
