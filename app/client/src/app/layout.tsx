import type { Metadata } from "next";
import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
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
        <div className="site-shell">
          <header className="site-header">
            <div className="brand-block">
              <Link className="brand-link" href="/">
                {profile.full_name}
              </Link>
              <p>{profile.title}</p>
            </div>
            <SiteNav />
          </header>

          <main className="site-main">{children}</main>

          <footer className="site-footer">
            <div>
              <p className="mini-label">Contact</p>
              <a href={toMailto(profile.email)}>{profile.email}</a>
            </div>
            <div>
              <p className="mini-label">Links</p>
              <div className="footer-links">
                <a href={profile.github_url} rel="noreferrer" target="_blank">
                  {stripProtocol(profile.github_url)}
                </a>
                <a href={profile.linkedin_url} rel="noreferrer" target="_blank">
                  {stripProtocol(profile.linkedin_url)}
                </a>
              </div>
            </div>
            <div>
              <p className="mini-label">Based</p>
              <p>{profile.location}</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
