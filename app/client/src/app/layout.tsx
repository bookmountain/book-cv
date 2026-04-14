import type { Metadata } from "next";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
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
        <div className="min-h-screen">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
              <Link className="shrink-0 text-base font-semibold tracking-tight" href="/">
                {profile.full_name}
              </Link>

              <div className="hidden min-w-0 flex-1 justify-center md:flex">
                <SiteNav orientation="horizontal" />
              </div>

              <div className="ml-auto hidden items-center gap-1 md:flex">
                <Button render={<a href={profile.github_url} rel="noreferrer" target="_blank" />} size="sm" variant="ghost">
                  GitHub
                </Button>
                <Button render={<a href={profile.linkedin_url} rel="noreferrer" target="_blank" />} size="sm" variant="ghost">
                  LinkedIn
                </Button>
                <Button render={<a href={toMailto(profile.email)} />} size="sm" variant="ghost">
                  Email
                </Button>
              </div>

              <div className="ml-auto md:hidden">
                <Sheet>
                  <SheetTrigger render={<Button size="sm" variant="outline" />}>
                    <MenuIcon data-icon="inline-start" />
                    Menu
                  </SheetTrigger>
                  <SheetContent className="border-border/70 bg-background" side="left">
                    <SheetHeader className="gap-2">
                      <SheetTitle className="text-left text-xl font-semibold tracking-tight">{profile.full_name}</SheetTitle>
                      <SheetDescription className="text-left leading-6">
                        Web apps, AI workflows, and automation systems.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-5 px-4 pb-6">
                      <Separator />
                      <SiteNav />
                      <Separator />
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <span>{profile.location}</span>
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
              </div>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-10">{children}</main>

          <footer className="border-t">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p>Book Sam. Web apps, AI workflows, and automation systems.</p>
              <div className="flex flex-wrap items-center gap-4">
                <span>{profile.location}</span>
                <a href={toMailto(profile.email)}>{profile.email}</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
