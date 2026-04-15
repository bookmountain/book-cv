import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type RichTextProps = {
  value: string;
  className?: string;
};

export function RichText({ value, className = "" }: RichTextProps) {
  if (!value.trim()) {
    return null;
  }

  return (
    <div className={cn("rich-text", className)}>
      <ReactMarkdown
        components={{
          a: ({ href, ...props }) => {
            const external = Boolean(href?.startsWith("http"));

            return (
              <a
                href={href}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
                {...props}
              />
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
