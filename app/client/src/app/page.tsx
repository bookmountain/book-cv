import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBooks, getPortfolioContent, getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function HomePage() {
  const content = await getPortfolioContent();
  const featuredProjects = content.projects.filter((project) => project.is_featured).slice(0, 3);
  const posts = (await getWritings()).slice(0, 3);
  const books = (await getBooks()).slice(0, 3);

  return (
    <div className="flex flex-col gap-12">
      <PageIntro
        eyebrow="Home"
        lede="Microsoft background. Product UI, backend systems, automation, and self-hosted AI workflows."
        title="Software engineer building practical products and reliable systems."
        titleClassName="max-w-3xl text-3xl sm:text-4xl xl:text-[2.75rem]"
      >
        <Button render={<Link href="/projects" />}>View projects</Button>
        <Button render={<Link href="/blog" />} variant="outline">
          Read blog
        </Button>
        <Button render={<a href={toMailto(content.profile.email)} />} variant="ghost">
          Contact
        </Button>
      </PageIntro>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Based", value: content.profile.location },
          { label: "Focus", value: "Web apps, AI workflows, automation" },
          { label: "Stack", value: "Next.js, Django, PostgreSQL, Docker" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex flex-col gap-2 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
              <p className="text-sm leading-7 text-foreground">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-5 border-t pt-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Projects</p>
            <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
          </div>
          <Button render={<Link href="/projects" />} size="sm" variant="ghost">
            All projects
          </Button>
        </div>

        <div className="grid gap-4">
          {featuredProjects.map((project, index) => (
            <Reveal delay={index * 40} key={project.slug}>
              <Card>
                <CardContent className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_220px]">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      <span>{project.eyebrow}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span>{project.live_url ? "Live" : "Project"}</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                    <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{project.summary}</p>
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
        </div>
      </section>

      <section className="grid gap-8 border-t pt-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Blog</p>
            <h2 className="text-2xl font-semibold tracking-tight">Latest posts</h2>
          </div>
          <div className="grid gap-3">
            {posts.map((entry) => (
              <Card key={entry.slug}>
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{entry.category}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{entry.reading_time}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{entry.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{entry.summary}</p>
                  <div>
                    <Button render={<Link href={`/blog/${entry.slug}`} />} size="sm" variant="ghost">
                      Read post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Books</p>
            <h2 className="text-2xl font-semibold tracking-tight">Current shelf</h2>
          </div>
          <div className="grid gap-3">
            {books.map((book) => (
              <Card key={book.title}>
                <CardContent className="flex flex-col gap-2 p-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{book.takeaway}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
