import { splitParagraphs } from "@/lib/site-content";

type RichTextProps = {
  value: string;
  className?: string;
};

export function RichText({ value, className = "" }: RichTextProps) {
  const paragraphs = splitParagraphs(value);

  return (
    <div className={`rich-text ${className}`.trim()}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
