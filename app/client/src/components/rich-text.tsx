import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type RichTextProps = {
  value: string;
  className?: string;
};

function resolveMediaSrc(src?: string) {
  if (!src) {
    return src;
  }

  if (!src.startsWith("/media/")) {
    return src;
  }

  const apiBase = process.env.PORTFOLIO_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

  if (!apiBase) {
    return src;
  }

  const origin = apiBase.replace(/\/api\/?$/, "");
  return `${origin}${src}`;
}

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
          img: ({ src, alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={alt || ""} src={resolveMediaSrc(typeof src === "string" ? src : undefined)} {...props} />
          ),
          table: ({ ...props }) => (
            <div className="rich-text-table-wrap">
              <table {...props} />
            </div>
          ),
        }}
        remarkPlugins={[remarkGfm]}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
