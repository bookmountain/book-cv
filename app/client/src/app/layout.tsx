import type { Metadata } from "next";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSiteProfile } from "@/lib/site-content";

import "./globals.css";

export const metadata: Metadata = {
  title: "Book Sam | Software Engineer",
  description:
    "Book Sam builds AI products, delivery systems, and readable web experiences across Microsoft experience, self-hosted AI infrastructure, and modern web delivery.",
};

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getSiteProfile();

  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6">
          <header className="lg:hidden">
            <Card className="rounded-[1.8rem] border-border/70">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                    Portfolio
                  </Badge>
                  <Link className="truncate font-serif text-3xl leading-none" href="/">
                    {profile.full_name}
                  </Link>
                </div>

                <Sheet>
                  <SheetTrigger render={<Button size="sm" variant="outline" />}>
                    <MenuIcon data-icon="inline-start" />
                    Menu
                  </SheetTrigger>
                  <SheetContent className="border-border/70 bg-background/95 backdrop-blur" side="left">
                    <SheetHeader className="gap-3">
                      <SheetTitle className="font-serif text-3xl leading-none">{profile.full_name}</SheetTitle>
                      <SheetDescription className="leading-7">{profile.summary}</SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-5 px-4 pb-6">
                      <Separator />
                      <SiteNav />
                      <Separator />
                      <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                            Based
                          </span>
                          <span>{profile.location}</span>
                        </div>
                        <a href={toMailto(profile.email)}>{profile.email}</a>
                        <a href={profile.github_url} rel="noreferrer" target="_blank">
                          {stripProtocol(profile.github_url)}
                        </a>
                        <a href={profile.linkedin_url} rel="noreferrer" target="_blank">
                          {stripProtocol(profile.linkedin_url)}
                        </a>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          </header>

          <aside className="hidden lg:sticky lg:top-6 lg:block lg:h-[calc(100vh-3rem)] lg:w-[320px] lg:shrink-0">
            <Card className="h-full rounded-[2rem] border-border/70 bg-card/85 backdrop-blur">
              <CardHeader className="gap-4">
                <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                  Portfolio
                </Badge>
                <div className="flex flex-col gap-3">
                  <Link className="font-serif text-5xl leading-none" href="/">
                    {profile.full_name}
                  </Link>
                  <CardTitle className="text-base leading-7">{profile.title}</CardTitle>
                  <CardDescription className="text-sm leading-7">{profile.summary}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex h-full flex-col gap-6">
                <div className="grid gap-4 text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                      Based
                    </span>
                    <span className="text-muted-foreground">{profile.location}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                      Contact
                    </span>
                    <a className="text-muted-foreground" href={toMailto(profile.email)}>
                      {profile.email}
                    </a>
                  </div>
                </div>

                <Separator />
                <SiteNav />
                <Separator />

                <div className="mt-auto flex flex-col gap-3 text-sm text-muted-foreground">
                  <a href={profile.github_url} rel="noreferrer" target="_blank">
                    {stripProtocol(profile.github_url)}
                  </a>
                  <a href={profile.linkedin_url} rel="noreferrer" target="_blank">
                    {stripProtocol(profile.linkedin_url)}
                  </a>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <main className="flex flex-1 flex-col gap-12 py-2 lg:py-6">{children}</main>

            <footer className="mt-8">
              <Card className="rounded-[1.8rem] border-border/70">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    Built with Next.js and Django. Structured to stay readable, editable, and deployable.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button render={<a href={profile.github_url} rel="noreferrer" target="_blank" />} variant="ghost">
                      GitHub
                    </Button>
                    <Button
                      render={<a href={profile.linkedin_url} rel="noreferrer" target="_blank" />}
                      variant="ghost"
                    >
                      LinkedIn
                    </Button>
                    <Button render={<a href={toMailto(profile.email)} />} variant="ghost">
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
