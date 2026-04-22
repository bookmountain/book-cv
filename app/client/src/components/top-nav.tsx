"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { TerminalThemeSwitcher } from "@/components/terminal-theme-switcher";

type TopNavProps = {
  resumeUrl: string;
};

const navItems = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/books", label: "books" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export function TopNav({ resumeUrl }: TopNavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className={`prototype-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="prototype-nav-inner">
        <Link className="prototype-brand" href="/">
          book<span style={{ color: "var(--accent)" }}>.</span>sam
        </Link>

        <div className="prototype-nav-links">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link className={`prototype-nav-link${isActive ? " is-active" : ""}`} href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
          <TerminalThemeSwitcher />
          <a className="btn btn-ghost prototype-nav-resume" href={resumeUrl} style={{ marginLeft: 8, padding: "6px 14px", fontSize: 12 }}>
            Resume ↗
          </a>
        </div>

        <button className="prototype-mobile-trigger" onClick={() => setOpen((value) => !value)} type="button">
          Menu
        </button>
      </div>

      {open ? (
        <div className="prototype-mobile-panel">
          <div className="card" style={{ padding: 14 }}>
            <div style={{ display: "grid", gap: 8 }}>
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    className={`prototype-nav-link${isActive ? " is-active" : ""}`}
                    href={item.href}
                    key={item.href}
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <TerminalThemeSwitcher />
              <a
                className="btn btn-ghost prototype-nav-resume"
                href={resumeUrl}
                style={{ justifySelf: "start", marginTop: 8, padding: "6px 14px", fontSize: 12 }}
              >
                Resume ↗
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
