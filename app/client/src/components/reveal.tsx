import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function Reveal({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}
