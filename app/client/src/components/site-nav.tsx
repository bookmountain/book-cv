"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
  { href: "/references", label: "References" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Button
            aria-current={isActive ? "page" : undefined}
            className={cn("w-full justify-start rounded-full", !isActive && "text-muted-foreground")}
            key={item.href}
            render={<Link href={item.href} />}
            variant={isActive ? "default" : "ghost"}
          >
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}
