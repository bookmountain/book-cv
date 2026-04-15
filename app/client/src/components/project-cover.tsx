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
      "linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(51,65,85,0.9) 50%, rgba(226,232,240,0.7) 100%)",
    glow: "rgba(148, 163, 184, 0.55)",
  },
  {
    background:
      "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(71,85,105,0.88) 55%, rgba(248,250,252,0.72) 100%)",
    glow: "rgba(226, 232, 240, 0.8)",
  },
  {
    background:
      "linear-gradient(135deg, rgba(30,41,59,0.94) 0%, rgba(51,65,85,0.92) 40%, rgba(203,213,225,0.75) 100%)",
    glow: "rgba(100, 116, 139, 0.56)",
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
    <div className={cn("relative overflow-hidden rounded-[0.55rem] border border-black/8 bg-slate-100", className)}>
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={alt || title}
          className="h-full w-full object-cover grayscale-[12%] transition duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
          src={imageSrc}
        />
      ) : (
        <>
          <div className="absolute inset-0" style={{ background: palette.background }} />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="absolute -right-10 top-6 h-40 w-40 rounded-full blur-3xl" style={{ backgroundColor: palette.glow }} />
          <div className="absolute inset-x-6 bottom-6 top-6 border border-white/28" />
          <div className="absolute left-8 top-8 h-18 w-18 border border-white/38 sm:h-24 sm:w-24" />
          <div className="absolute bottom-8 right-8 h-24 w-24 border border-white/25 sm:h-32 sm:w-32" />
          <div className="absolute bottom-12 left-12 h-px w-28 bg-white/60 sm:w-36" />
          <div className="absolute bottom-20 left-12 h-px w-18 bg-white/40 sm:w-24" />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-white/10" />

      {caption ? (
        <div className="absolute bottom-5 left-5 max-w-[72%]">
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.28em] text-white/70">{eyebrow}</p>
          <p className="mt-2 font-serif text-lg leading-tight text-white sm:text-xl">{caption}</p>
        </div>
      ) : null}
    </div>
  );
}
