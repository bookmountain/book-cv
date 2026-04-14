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

type SiteNavProps = {
  orientation?: "horizontal" | "vertical";
};

export function SiteNav({ orientation = "vertical" }: SiteNavProps) {
  const pathname = usePathname();
  const isHorizontal = orientation === "horizontal";

  return (
    <nav
      aria-label="Primary"
      className={cn("flex gap-2", isHorizontal ? "flex-wrap items-center" : "flex-col")}
    >
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Button
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full",
              isHorizontal ? "justify-center px-4" : "w-full justify-start rounded-xl",
              !isActive && "text-muted-foreground",
            )}
            key={item.href}
            render={<Link href={item.href} />}
            size="sm"
            variant={isActive ? "secondary" : "ghost"}
          >
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}
