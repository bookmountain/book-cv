import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-14">
      <PageIntro
        eyebrow="Projects"
        lede="Each project lives on its own page with detail, repository links, optional live demos, and screenshot slots. The goal is to make the work easy to scan without flattening everything into one generic card."
        title="Projects arranged as case studies, experiments, and infrastructure work."
      />

      <section className="grid gap-4">
        {projects.map((project, index) => (
          <Reveal delay={index * 50} key={project.slug}>
            <Card className="rounded-[1.8rem] border-border/70">
              <CardContent className="grid gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full px-3 py-1 uppercase tracking-[0.2em]" variant="outline">
                      {project.eyebrow}
                    </Badge>
                    <Badge className="rounded-full px-3 py-1" variant={project.is_featured ? "default" : "secondary"}>
                      {project.is_featured ? "Featured" : "In progress"}
                    </Badge>
                  </div>

                  <CardHeader className="px-0">
                    <CardTitle className="font-serif text-4xl leading-none text-balance">{project.title}</CardTitle>
                    <CardDescription className="text-sm leading-7">{project.stack}</CardDescription>
                  </CardHeader>

                  <p className="max-w-3xl text-sm leading-8 text-muted-foreground">{project.summary}</p>
                </div>

                <div className="flex flex-col justify-between gap-4">
                  <Card className="rounded-[1.4rem] border-border/70 bg-secondary/30">
                    <CardHeader className="gap-3">
                      <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.2em]" variant="outline">
                        Project notes
                      </Badge>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <p className="text-sm leading-7 text-muted-foreground" key={highlight}>
                          {highlight}
                        </p>
                      ))}
                    </CardContent>
                  </Card>

                  <CardFooter className="flex flex-wrap gap-2 border-t-0 bg-transparent p-0">
                    <Button render={<Link href={`/projects/${project.slug}`} />} size="sm" variant="outline">
                      Open case study
                      <ArrowUpRightIcon data-icon="inline-end" />
                    </Button>
                    {project.repo_url ? (
                      <Button
                        render={<a href={project.repo_url} rel="noreferrer" target="_blank" />}
                        size="sm"
                        variant="ghost"
                      >
                        Repository
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
                  </CardFooter>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
