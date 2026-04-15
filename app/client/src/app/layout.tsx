import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Lora } from "next/font/google";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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
      <body className={`${inter.variable} ${display.variable}`}>
        <div className="min-h-screen">
          <header className="sticky top-0 z-40 border-b border-black/5 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
              <Link className="shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-foreground" href="/">
                {profile.full_name}
              </Link>

              <div className="hidden min-w-0 flex-1 justify-center md:flex">
                <SiteNav orientation="horizontal" />
              </div>

              <div className="ml-auto hidden items-center gap-2 md:flex">
                <Button render={<a href={profile.github_url} rel="noreferrer" target="_blank" />} size="sm" variant="ghost">
                  GitHub
                </Button>
                <Button render={<Link href="/contact" />} size="sm">
                  Contact
                </Button>
              </div>

              <div className="ml-auto md:hidden">
                <Sheet>
                  <SheetTrigger render={<Button size="sm" variant="outline" />}>
                    <MenuIcon data-icon="inline-start" />
                    Menu
                  </SheetTrigger>
                  <SheetContent className="border-black/8 bg-background/95" side="left">
                    <SheetHeader className="gap-2">
                      <SheetTitle className="text-left text-xl font-semibold tracking-tight">{profile.full_name}</SheetTitle>
                      <SheetDescription className="text-left leading-6">
                        Web apps, AI workflows, and delivery systems.
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

          <main className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            {children}
          </main>

          <footer className="border-t border-black/5">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div className="flex flex-col gap-2">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Book Sam portfolio
                </p>
                <p>Software systems, product UI, automation, and practical AI delivery.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em]">
                <span>{profile.location}</span>
                <a href={toMailto(profile.email)}>{profile.email}</a>
                <a href={profile.github_url} rel="noreferrer" target="_blank">
                  GitHub
                </a>
                <a href={profile.linkedin_url} rel="noreferrer" target="_blank">
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
