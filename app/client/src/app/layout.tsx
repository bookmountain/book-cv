import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { MsLogo } from "@/components/prototype-ui";
import { TopNav } from "@/components/top-nav";
import { RESUME_PDF_URL } from "@/lib/resume";
import { getSiteProfile } from "@/lib/site-content";
import { DEFAULT_TERMINAL_SCHEME, getThemeBootScript } from "@/lib/terminal-schemes";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Book Sam | Software Engineer",
  description:
    "Book Sam builds AI products, delivery systems, and readable web experiences across Microsoft experience, self-hosted AI infrastructure, and modern web delivery.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getSiteProfile();

  return (
    <html data-scroll-behavior="smooth" data-terminal-scheme={DEFAULT_TERMINAL_SCHEME} lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: getThemeBootScript() }} />
        <TopNav resumeUrl={RESUME_PDF_URL} />
        <main>{children}</main>

        <footer className="prototype-footer">
          <div className="prototype-footer-inner">
            <div className="prototype-footer-meta">
              <MsLogo size={16} />
              <span>
                {profile.full_name} · {profile.location} · {new Date().getFullYear()}
              </span>
            </div>
            <div className="prototype-footer-links">
              <a href={profile.github_url} rel="noreferrer" target="_blank">
                GitHub
              </a>
              <a href={profile.linkedin_url} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
              <a href={RESUME_PDF_URL}>Resume</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
