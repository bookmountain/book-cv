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
import { Separator } from "@/components/ui/separator";
import {
  capabilityRows,
  getBooks,
  getPortfolioContent,
  getReferences,
  getWritings,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function HomePage() {
  const content = await getPortfolioContent();
  const featuredProjects = content.projects.filter((project) => project.is_featured).slice(0, 3);
  const posts = (await getWritings()).slice(0, 3);
  const books = (await getBooks()).slice(0, 3);
  const references = (await getReferences()).slice(0, 2);

  return (
    <div className="flex flex-col gap-14">
      <PageIntro
        eyebrow="Portfolio"
        lede={`${content.profile.summary} The site is structured as a small product instead of a brochure: clearer routes, editable content, and enough detail to evaluate how I think.`}
        title="Readable product work, practical infrastructure, and writing that explains the decisions underneath."
      >
        <Button render={<Link href="/projects" />}>Explore projects</Button>
        <Button render={<Link href="/blog" />} variant="outline">
          Read writing
        </Button>
        <Button render={<a href={toMailto(content.profile.email)} />} variant="ghost">
          Contact
        </Button>
      </PageIntro>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <Reveal className="h-full">
          <Card className="h-full rounded-[2rem] border-border/70">
            <CardHeader className="gap-4">
              <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                What this site is for
              </Badge>
              <CardTitle className="max-w-3xl font-serif text-4xl leading-none text-balance sm:text-5xl">
                A cleaner way to read the work than a dense resume or a single long scroll.
              </CardTitle>
              <CardDescription className="max-w-3xl text-base leading-8">
                My background spans Microsoft, product-facing frontend work, backend systems, microservice
                architecture, and self-hosted AI infrastructure. I value interfaces that stay clear, systems that hold
                their shape under change, and workflows that do not depend on luck.
              </CardDescription>
            </CardHeader>
          </Card>
        </Reveal>

        <Reveal className="grid gap-4" delay={80}>
          {[
            {
              label: "Current mode",
              value: "AI-assisted engineering with human review, practical verification, and real deployment discipline.",
            },
            {
              label: "Build bias",
              value: "Clear interfaces, bounded systems, and product decisions that still read well six months later.",
            },
            {
              label: "Infrastructure",
              value: "Local model stacks, Dockerized delivery, and automation that helps more than it impresses.",
            },
          ].map((note) => (
            <Card className="rounded-[1.5rem] border-border/70" key={note.label}>
              <CardHeader className="gap-3">
                <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="secondary">
                  {note.label}
                </Badge>
                <CardDescription className="text-sm leading-7 text-foreground/85">{note.value}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </Reveal>
      </section>

      <Separator />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
              Capabilities
            </Badge>
            <h2 className="font-serif text-3xl leading-none text-balance sm:text-4xl">
              The stack layers I keep returning to across products and experiments
            </h2>
          </div>
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
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
              Projects
            </Badge>
            <h2 className="font-serif text-3xl leading-none text-balance sm:text-4xl">
              Selected work with enough detail to judge the decisions, not just the stack list
            </h2>
          </div>
          <Button render={<Link href="/projects" />} variant="ghost">
            See all projects
          </Button>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal delay={index * 70} key={project.slug}>
              <Card className="h-full rounded-[1.6rem] border-border/70">
                <CardHeader className="gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full px-3 py-1 uppercase tracking-[0.2em]" variant="outline">
                      {project.eyebrow}
                    </Badge>
                    <Badge className="rounded-full px-3 py-1" variant="secondary">
                      {project.stack}
                    </Badge>
                  </div>
                  <CardTitle className="font-serif text-3xl leading-none">{project.title}</CardTitle>
                  <CardDescription className="text-sm leading-7">{project.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {project.highlights.slice(0, 2).map((highlight) => (
                    <p className="text-sm leading-7 text-muted-foreground" key={highlight}>
                      {highlight}
                    </p>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto flex flex-wrap gap-2">
                  <Button render={<Link href={`/projects/${project.slug}`} />} size="sm" variant="outline">
                    Open case study
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Button>
                  {project.repo_url ? (
                    <Button render={<a href={project.repo_url} rel="noreferrer" target="_blank" />} size="sm" variant="ghost">
                      Repository
                    </Button>
                  ) : null}
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <Separator />

      <section className="grid gap-8 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
              Writing
            </Badge>
            <h2 className="font-serif text-3xl leading-none text-balance sm:text-4xl">
              Posts on engineering practice, study, and using AI tools without lowering the bar
            </h2>
          </div>

          <div className="grid gap-4">
            {posts.map((entry, index) => (
              <Reveal delay={index * 70} key={entry.slug}>
                <Card className="rounded-[1.5rem] border-border/70">
                  <CardHeader className="gap-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="rounded-full px-3 py-1 uppercase tracking-[0.2em]" variant="outline">
                        {entry.category}
                      </Badge>
                      <Badge className="rounded-full px-3 py-1" variant="secondary">
                        {entry.reading_time}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-2xl leading-tight">{entry.title}</CardTitle>
                    <CardDescription className="text-sm leading-7">{entry.summary}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button render={<Link href={`/blog/${entry.slug}`} />} size="sm" variant="ghost">
                      Read post
                    </Button>
                  </CardFooter>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
              Reading
            </Badge>
            <h2 className="font-serif text-3xl leading-none text-balance sm:text-4xl">
              Books that keep shaping how I think about code, systems, and software teams
            </h2>
          </div>

          <div className="grid gap-4">
            {books.map((book, index) => (
              <Reveal delay={index * 70} key={book.title}>
                <Card className="rounded-[1.5rem] border-border/70">
                  <CardContent className="grid gap-4 p-4 sm:grid-cols-[112px_minmax(0,1fr)]">
                    <div
                      className="flex min-h-40 flex-col justify-between rounded-[1.2rem] px-4 py-4 text-sm text-primary-foreground"
                      style={{
                        background:
                          index % 5 === 0
                            ? "linear-gradient(180deg, #30526b, #183246)"
                            : index % 5 === 1
                              ? "linear-gradient(180deg, #6a4f40, #38261d)"
                              : index % 5 === 2
                                ? "linear-gradient(180deg, #566144, #2e3723)"
                                : index % 5 === 3
                                  ? "linear-gradient(180deg, #765944, #432e21)"
                                  : "linear-gradient(180deg, #4b506e, #23263a)",
                      }}
                    >
                      <span className="font-serif text-xl leading-tight">{book.title}</span>
                      <span className="text-xs/6 opacity-90">{book.author}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                        Book note
                      </Badge>
                      <p className="text-sm leading-7 text-muted-foreground">{book.summary}</p>
                      <p className="text-sm leading-7 text-foreground/90">{book.takeaway}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
              References
            </Badge>
            <h2 className="font-serif text-3xl leading-none text-balance sm:text-4xl">
              People who can speak directly about how I work, not just what I shipped
            </h2>
          </div>
          <Button render={<Link href="/references" />} variant="ghost">
            Open references
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {references.map((reference, index) => (
            <Reveal delay={index * 70} key={reference.email || reference.name}>
              <Card className="h-full rounded-[1.6rem] border-border/70">
                <CardHeader className="gap-4">
                  <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                    Reference review
                  </Badge>
                  <CardTitle className="font-serif text-3xl leading-tight text-balance">
                    {reference.quote ||
                      "Add the exact quote in Django admin to turn this card into a proper testimonial."}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{reference.name}</p>
                  <p>{reference.relationship}</p>
                  <p>
                    {reference.role}, {reference.organization}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button render={<a href={toMailto(reference.email)} />} size="sm" variant="ghost">
                    {reference.email}
                  </Button>
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
