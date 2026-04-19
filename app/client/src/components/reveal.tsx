import type { CSSProperties, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const style: CSSProperties = {
    animationDelay: `${delay}ms`,
  };

  return (
    <div className={cn("motion-fade-up", className)} style={style}>
      {children}
    </div>
  );
}
