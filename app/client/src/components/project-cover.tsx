import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  title: string;
  imageSrc?: string;
  alt?: string;
  className?: string;
  caption?: string | null;
  eyebrow?: string;
};

const palettes = [
  {
    background:
      "linear-gradient(135deg, rgba(0,12,6,0.98) 0%, rgba(0,51,32,0.9) 60%, rgba(8,8,8,1) 100%)",
    glow: "rgba(0, 230, 118, 0.42)",
  },
  {
    background:
      "linear-gradient(135deg, rgba(0,18,41,0.98) 0%, rgba(0,42,85,0.86) 58%, rgba(8,8,8,1) 100%)",
    glow: "rgba(0, 164, 239, 0.36)",
  },
  {
    background:
      "linear-gradient(135deg, rgba(26,15,0,0.96) 0%, rgba(61,36,0,0.88) 50%, rgba(8,8,8,1) 100%)",
    glow: "rgba(245, 158, 11, 0.32)",
  },
];

function hashValue(input: string) {
  return input.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
}

export function ProjectCover({
  title,
  imageSrc,
  alt,
  className,
  caption = title,
  eyebrow = "Project preview",
}: ProjectCoverProps) {
  const palette = palettes[hashValue(title) % palettes.length];

  return (
    <div className={cn("scanline relative overflow-hidden rounded-[0.85rem] border border-white/10 bg-[#0b0b0b]", className)}>
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={alt || title}
          className="h-full w-full object-cover opacity-[0.88] saturate-[0.9] transition duration-700 group-hover/card:scale-[1.02] group-hover/card:saturate-100"
          src={imageSrc}
        />
      ) : (
        <>
          <div className="absolute inset-0" style={{ background: palette.background }} />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="absolute -right-10 top-6 h-40 w-40 rounded-full blur-3xl" style={{ backgroundColor: palette.glow }} />
          <div className="absolute inset-x-6 bottom-6 top-6 border border-white/18" />
          <div className="absolute left-8 top-8 h-[4.5rem] w-[4.5rem] border border-white/25 sm:h-24 sm:w-24" />
          <div className="absolute bottom-8 right-8 h-24 w-24 border border-white/18 sm:h-32 sm:w-32" />
          <div className="absolute bottom-12 left-12 h-px w-28 bg-white/60 sm:w-36" />
          <div className="absolute bottom-20 left-12 h-px w-[4.5rem] bg-white/40 sm:w-24" />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-white/5" />

      {caption ? (
        <div className="absolute bottom-5 left-5 max-w-[72%]">
          <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.28em] text-white/65">{eyebrow}</p>
          <p className="mt-2 font-serif text-lg leading-tight text-white sm:text-xl">{caption}</p>
        </div>
      ) : null}
    </div>
  );
}
