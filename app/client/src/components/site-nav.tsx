"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type SiteNavProps = {
  orientation?: "horizontal" | "vertical";
};

export function SiteNav({ orientation = "vertical" }: SiteNavProps) {
  const pathname = usePathname();
  const isHorizontal = orientation === "horizontal";

  return (
    <nav
      aria-label="Primary"
      className={cn("flex", isHorizontal ? "flex-wrap items-center gap-6" : "flex-col gap-4")}
    >
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "border-b border-transparent pb-1 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground",
              isHorizontal ? "justify-center" : "w-fit text-left",
              isActive && "border-primary text-primary",
            )}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
