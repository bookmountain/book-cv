import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import type { BookNote, CapabilityRow, Project, WritingEntry } from "@/lib/site-content";

function cssVars(vars: Record<string, string | number | undefined>) {
  return vars as CSSProperties;
}

function getProjectVisualKey(project: Project) {
  const slug = project.slug.toLowerCase();
  const title = project.title.toLowerCase();

  if (slug.includes("auction") || title.includes("auction")) return "auction-platform";
  if (slug.includes("form-recognizer") || title.includes("form recognizer")) return "form-recognizer";
  if (slug.includes("portfolio") || title.includes("portfolio")) return "portfolio";
  return null;
}

function getPostVisualKey(entry: WritingEntry) {
  const slug = entry.slug.toLowerCase();
  const title = entry.title.toLowerCase();

  if (slug.includes("microsoft") || title.includes("microsoft")) return "life-in-microsoft";
  if (slug.includes("ai") || title.includes("ai")) return "building-with-ai";
  if (slug.includes("adelaide") || title.includes("adelaide")) return "adelaide-uni";
  return "building-with-ai";
}

export function ProjectVisual({ project }: { project: Project }) {
  const key = getProjectVisualKey(project);

  if (key === "auction-platform") {
    return (
      <svg height="148" style={{ display: "block" }} viewBox="0 0 360 148" width="100%">
        <rect fill="#080808" height="148" width="360" />
        {[40, 80, 120, 160, 200, 240, 280, 320].map((x) => (
          <line key={x} stroke="#111" strokeWidth="1" x1={x} x2={x} y1="0" y2="148" />
        ))}
        {[37, 74, 111].map((y) => (
          <line key={y} stroke="#111" strokeWidth="1" x1="0" x2="360" y1={y} y2={y} />
        ))}
        <rect fill="#111" height="40" rx="6" stroke="#00e676" strokeWidth="1.5" width="90" x="135" y="54" />
        <text fill="#00e676" fontFamily="JetBrains Mono" fontSize="9" fontWeight="500" textAnchor="middle" x="180" y="70">
          API Gateway
        </text>
        <text fill="#333" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="180" y="83">
          Next.js 14
        </text>
        {[
          { label: "Auction Svc", sub: ".NET 8", x: 28, y: 20, lx: 135, ly: 68 },
          { label: "Bid Svc", sub: ".NET 8", x: 254, y: 20, lx: 225, ly: 68 },
          { label: "Notify Svc", sub: "SignalR", x: 28, y: 95, lx: 135, ly: 80 },
          { label: "Auth Svc", sub: "Identity", x: 254, y: 95, lx: 225, ly: 80 },
        ].map(({ label, sub, x, y, lx, ly }) => (
          <g key={label}>
            <line stroke="#1e1e1e" strokeDasharray="3 3" strokeWidth="1.5" x1={x + 49} x2={lx} y1={y + 18} y2={ly} />
            <rect fill="#0e0e0e" height="34" rx="5" stroke="#1e1e1e" strokeWidth="1" width="78" x={x} y={y} />
            <text fill="#aaa" fontFamily="JetBrains Mono" fontSize="8.5" textAnchor="middle" x={x + 39} y={y + 14}>
              {label}
            </text>
            <text fill="#333" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x={x + 39} y={y + 26}>
              {sub}
            </text>
          </g>
        ))}
        <ellipse cx="180" cy="130" fill="#0e0e0e" rx="40" ry="12" stroke="#2a2a2a" strokeWidth="1" />
        <text fill="#444" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="180" y="134">
          RabbitMQ
        </text>
        <line stroke="#1e1e1e" strokeDasharray="3 3" strokeWidth="1.5" x1="180" x2="180" y1="94" y2="118" />
      </svg>
    );
  }

  if (key === "form-recognizer") {
    return (
      <svg height="148" style={{ display: "block" }} viewBox="0 0 360 148" width="100%">
        <rect fill="#080808" height="148" width="360" />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} stroke="#0f0f0f" strokeWidth="1" x1={i * 45} x2={i * 45} y1="0" y2="148" />
        ))}
        <rect fill="#0d0d0d" height="120" rx="4" stroke="#222" strokeWidth="1" width="120" x="80" y="14" />
        <rect fill="#1a1a1a" height="7" rx="2" width="70" x="88" y="22" />
        <rect fill="#161616" height="5" rx="2" width="50" x="88" y="33" />
        <rect fill="none" height="18" rx="2" stroke="#00a4ef" strokeWidth="1.5" width="80" x="86" y="46" />
        <text fill="#00a4ef" fontFamily="JetBrains Mono" fontSize="6" x="90" y="53">
          Name
        </text>
        <rect fill="rgba(0,164,239,0.06)" height="10" rx="1" width="74" x="88" y="50" />
        <rect fill="none" height="18" rx="2" stroke="#7fba00" strokeWidth="1.5" width="106" x="86" y="70" />
        <text fill="#7fba00" fontFamily="JetBrains Mono" fontSize="6" x="90" y="77">
          Organisation
        </text>
        <rect fill="none" height="18" rx="2" stroke="#ffb900" strokeWidth="1.5" width="50" x="86" y="94" />
        <text fill="#ffb900" fontFamily="JetBrains Mono" fontSize="6" x="90" y="101">
          Date
        </text>
        <rect fill="#141414" height="14" rx="2" width="106" x="86" y="114" />
        <rect fill="#1a1a1a" height="5" rx="1" width="60" x="88" y="116" />
        <rect fill="#0d0d0d" height="24" rx="4" stroke="#00a4ef" strokeWidth="1" width="90" x="228" y="30" />
        <text fill="#00a4ef" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="273" y="43">
          Azure AI
        </text>
        <line stroke="#222" strokeDasharray="3 2" strokeWidth="1.5" x1="200" x2="226" y1="74" y2="74" />
        <polygon fill="#333" points="224,71 228,74 224,77" />
        {[
          [273, 68, "Name", "98%"],
          [273, 86, "Org", "96%"],
          [273, 104, "Date", "99%"],
        ].map(([x, y, label, value]) => (
          <text fill="#333" fontFamily="JetBrains Mono" fontSize="7" key={`${label}-${value}`} textAnchor="middle" x={x} y={y}>
            {label}: <tspan fill="#555">{value}</tspan>
          </text>
        ))}
      </svg>
    );
  }

  if (key === "portfolio") {
    return (
      <svg height="148" style={{ display: "block" }} viewBox="0 0 360 148" width="100%">
        <rect fill="#080808" height="148" width="360" />
        <rect fill="#0d0d0d" height="120" rx="6" stroke="#1e1e1e" strokeWidth="1" width="300" x="30" y="14" />
        <rect fill="#111" height="26" rx="6" width="300" x="30" y="14" />
        <rect fill="#111" height="10" width="300" x="30" y="30" />
        <circle cx="46" cy="27" fill="#ff5f57" r="4" />
        <circle cx="60" cy="27" fill="#febc2e" r="4" />
        <circle cx="74" cy="27" fill="#28c840" r="4" />
        <rect fill="#0e0e0e" height="13" rx="3" stroke="#222" strokeWidth="1" width="180" x="90" y="20" />
        <text fill="#333" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="180" y="30">
          me.bookmountain.work
        </text>
        <rect fill="#0a0a0a" height="20" width="300" x="30" y="40" />
        {[50, 90, 130, 170, 210, 250].map((x) => (
          <rect fill="#161616" height="6" key={x} rx="2" width="28" x={x} y="47" />
        ))}
        <rect fill="#1a1a1a" height="12" rx="2" width="120" x="42" y="68" />
        <rect fill="#141414" height="7" rx="2" width="90" x="42" y="84" />
        <rect fill="#141414" height="7" rx="2" width="60" x="42" y="96" />
        <rect fill="#00e676" height="14" opacity="0.8" rx="3" width="44" x="42" y="110" />
        <rect fill="#161616" height="14" rx="3" stroke="#222" strokeWidth="1" width="44" x="92" y="110" />
        <rect fill="#111" height="70" rx="5" stroke="#1e1e1e" strokeWidth="1" width="116" x="200" y="64" />
        <rect fill="#1a1a1a" height="8" rx="2" width="60" x="208" y="72" />
        <rect fill="#161616" height="6" rx="2" width="90" x="208" y="84" />
        <rect fill="#161616" height="6" rx="2" width="70" x="208" y="94" />
        <rect fill="#161616" height="6" rx="2" width="50" x="208" y="104" />
        <rect fill="#0e0e0e" height="12" rx="3" stroke="#222" strokeWidth="1" width="36" x="208" y="116" />
      </svg>
    );
  }

  return (
    <div
      style={{
        height: 148,
        background: "linear-gradient(135deg, #0d0d0d 0%, #111 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--muted-foreground)" }}>{project.eyebrow}</span>
    </div>
  );
}

export function PostVisual({ entry }: { entry: WritingEntry }) {
  const key = getPostVisualKey(entry);

  const visuals: Record<
    string,
    { bg: string; accent: string; pattern: ReactNode; icon: ReactNode }
  > = {
    "life-in-microsoft": {
      bg: "linear-gradient(135deg, #001f3f 0%, #003a6e 60%, #001a33 100%)",
      accent: "#00a4ef",
      pattern: (
        <g opacity="0.15">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <circle cx={40 + i * 60} cy="55" fill="none" r={18 + i * 4} stroke="#00a4ef" strokeWidth="0.8" />
            </g>
          ))}
        </g>
      ),
      icon: (
        <g>
          <rect fill="rgba(0,164,239,0.12)" height="54" rx="4" stroke="#00a4ef" strokeWidth="1.5" width="76" x="142" y="28" />
          <rect fill="rgba(0,164,239,0.4)" height="6" rx="2" width="44" x="150" y="36" />
          <rect fill="rgba(0,164,239,0.2)" height="4" rx="2" width="60" x="150" y="46" />
          <rect fill="rgba(0,164,239,0.2)" height="4" rx="2" width="50" x="150" y="54" />
          <rect fill="rgba(0,164,239,0.2)" height="4" rx="2" width="38" x="150" y="62" />
          <text fill="rgba(0,164,239,0.5)" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle" x="180" y="96">
            Microsoft · VDI Team · 2022–2025
          </text>
        </g>
      ),
    },
    "building-with-ai": {
      bg: "linear-gradient(135deg, #001a0e 0%, #003320 60%, #001208 100%)",
      accent: "#00e676",
      pattern: (
        <g opacity="0.1">
          {Array.from({ length: 8 }, (_, i) =>
            [0, 1, 2].map((j) => <circle cx={20 + i * 46} cy={20 + j * 40} fill="#00e676" key={`${i}-${j}`} r="2" />),
          )}
        </g>
      ),
      icon: (
        <g>
          <rect fill="rgba(0,230,118,0.07)" height="70" rx="5" stroke="rgba(0,230,118,0.25)" strokeWidth="1" width="120" x="120" y="20" />
          {[
            ["$ claude complete", 38, "#00e676"],
            ["> Reasoning...", 50, "#555"],
            ["> Architecture looks good.", 62, "#00e676"],
            ['$ git commit -m "AI-assisted"', 76, "#aaa"],
          ].map(([text, y, color]) => (
            <text fill={String(color)} fontFamily="JetBrains Mono" fontSize="7.5" key={String(y)} x="128" y={Number(y)}>
              {String(text)}
            </text>
          ))}
          <rect fill="rgba(0,230,118,0.15)" height="1" width="120" x="120" y="97" />
        </g>
      ),
    },
    "adelaide-uni": {
      bg: "linear-gradient(135deg, #1a0a2e 0%, #2d1254 60%, #120820 100%)",
      accent: "#a78bfa",
      pattern: (
        <g opacity="0.12">
          {[30, 90, 150, 210, 270, 330].map((x) => (
            <line key={x} stroke="#a78bfa" strokeWidth="0.8" x1={x} x2={x} y1="0" y2="110" />
          ))}
          {[22, 55, 88].map((y) => (
            <line key={y} stroke="#a78bfa" strokeWidth="0.8" x1="0" x2="360" y1={y} y2={y} />
          ))}
        </g>
      ),
      icon: (
        <g>
          <circle cx="180" cy="55" fill="rgba(167,139,250,0.08)" r="32" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
          <circle cx="180" cy="55" fill="rgba(167,139,250,0.08)" r="20" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
          <text fill="rgba(167,139,250,0.9)" fontFamily="JetBrains Mono" fontSize="9" fontWeight="500" textAnchor="middle" x="180" y="51">
            Adelaide
          </text>
          <text fill="rgba(167,139,250,0.5)" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="180" y="63">
            University
          </text>
          <text fill="rgba(167,139,250,0.35)" fontFamily="JetBrains Mono" fontSize="7.5" textAnchor="middle" x="180" y="100">
            Master of IT · 2025–2027
          </text>
        </g>
      ),
    },
  };

  const visual = visuals[key];

  return (
    <svg height="110" style={{ display: "block" }} viewBox="0 0 360 110" width="100%">
      <rect fill="transparent" height="110" width="360" />
      <defs>
        <linearGradient id={`bg-${entry.slug}`} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={visual.accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect fill={`url(#bg-${entry.slug})`} height="110" width="360" />
      {visual.pattern}
      {visual.icon}
    </svg>
  );
}

export function MsLogo({ size = 20 }: { size?: number }) {
  const s = size / 2 - 1;

  return (
    <svg fill="none" height={size} viewBox="0 0 20 20" width={size}>
      <rect fill="#f25022" height={s} width={s} x="1" y="1" />
      <rect fill="#7fba00" height={s} width={s} x={s + 2} y="1" />
      <rect fill="#00a4ef" height={s} width={s} x="1" y={s + 2} />
      <rect fill="#ffb900" height={s} width={s} x={s + 2} y={s + 2} />
    </svg>
  );
}

export function ProjectCard({ delay = 0, project }: { delay?: number; project: Project }) {
  const detailHref = `/projects/${project.slug}`;
  const coverShot = project.screenshots.find((shot) => shot.image_src);

  return (
    <Reveal delay={delay}>
      <article className="card prototype-project-card" style={{ cursor: "default", position: "relative" }}>
        {project.is_featured ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, var(--accent), transparent)",
              zIndex: 2,
            }}
          />
        ) : null}

        <Link className="prototype-project-cover-link" href={detailHref} style={{ overflow: "hidden" }}>
          {coverShot ? (
            <ProjectCover
              alt={coverShot.alt_text || project.title}
              caption={null}
              className="h-[148px] rounded-none border-0"
              imageSrc={coverShot.image_src}
              title={coverShot.title || project.title}
            />
          ) : (
            <ProjectVisual project={project} />
          )}
        </Link>

        <div style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <span className="tag green">{project.eyebrow}</span>
            <span style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-mono-stack)" }}>case file</span>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 9, lineHeight: 1.35 }}>
            <Link className="prototype-project-title-link" href={detailHref}>
              {project.title}
            </Link>
          </h3>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.65, marginBottom: 16 }}>{project.summary}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.stack
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
              .map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
          </div>
          <div className="prototype-project-actions">
            <Link className="btn btn-primary" href={detailHref}>
              Project details
            </Link>
            {project.live_url ? (
              <a className="btn btn-ghost" href={project.live_url} rel="noreferrer" target="_blank">
                Live demo ↗
              </a>
            ) : null}
            {project.repo_url ? (
              <a className="btn btn-ghost" href={project.repo_url} rel="noreferrer" target="_blank">
                Repo ↗
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function PostRow({ delay = 0, entry }: { delay?: number; entry: WritingEntry }) {
  return (
    <Reveal delay={delay}>
      <Link className="prototype-post-row" href={`/blog/${entry.slug}`}>
        <span className="tag" style={{ flexShrink: 0, minWidth: 56, textAlign: "center" }}>
          {entry.category}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: "var(--foreground)", fontSize: 14, marginBottom: 4 }}>{entry.title}</div>
          <div
            style={{
              fontSize: 13,
              color: "var(--muted-foreground)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {entry.summary}
          </div>
        </div>
        <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--muted-foreground)", flexShrink: 0 }}>
          {entry.reading_time}
        </span>
      </Link>
    </Reveal>
  );
}

export function AISection({ capabilities }: { capabilities: CapabilityRow[] }) {
  const items = capabilities.slice(0, 8);

  if (!items.length) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-label">03 / AI Practice</div>
        <h2 className="section-title">Embracing the AI shift — hands-on.</h2>
        <p className="section-sub">Not just using AI tools; understanding how they work and building with them purposefully.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {items.map((item, index) => (
            <Reveal delay={index * 70} key={item.label}>
              <div className="card" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: "var(--foreground)" }}>{item.label}</span>
                  <span className="tag green" style={{ fontSize: 10 }}>
                    Focus
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{item.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogCard({ delay = 0, entry }: { delay?: number; entry: WritingEntry }) {
  const visualKey = getPostVisualKey(entry);
  const accentMap: Record<string, string> = {
    "life-in-microsoft": "#00a4ef",
    "building-with-ai": "#00e676",
    "adelaide-uni": "#a78bfa",
  };
  const accent = accentMap[visualKey] ?? "#00e676";

  return (
    <Reveal delay={delay}>
      <Link className="card prototype-blog-card" href={`/blog/${entry.slug}`} style={cssVars({ "--card-accent": accent })}>
        <div style={{ position: "relative", borderBottom: "1px solid var(--border)" }}>
          {entry.cover_src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={entry.title}
              src={entry.cover_src}
              style={{ display: "block", width: "100%", height: 148, objectFit: "cover" }}
            />
          ) : (
            <PostVisual entry={entry} />
          )}
        </div>
        <div style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span
              className="tag"
              style={{
                borderColor: `${accent}33`,
                color: accent,
                background: `${accent}0d`,
              }}
            >
              {entry.category}
            </span>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--muted-foreground)" }}>
              {entry.reading_time}
            </span>
          </div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)", marginBottom: 8, lineHeight: 1.4 }}>{entry.title}</h2>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.65 }}>{entry.summary}</p>
        </div>
      </Link>
    </Reveal>
  );
}

const bookCovers = [
  { spine: "#00e676", bg: "linear-gradient(160deg,#001a0e 0%,#003320 100%)", label: "CRAFT" },
  { spine: "#00a4ef", bg: "linear-gradient(160deg,#001229 0%,#002a55 100%)", label: "DESIGN" },
  { spine: "#f59e0b", bg: "linear-gradient(160deg,#1a0f00 0%,#3d2400 100%)", label: "QUALITY" },
  { spine: "#a78bfa", bg: "linear-gradient(160deg,#10052e 0%,#2a0f6e 100%)", label: "SYSTEMS" },
];

export function BookShelfCard({ book, index }: { book: BookNote; index: number }) {
  const cover = bookCovers[index % bookCovers.length];
  const hasUploadedCover = Boolean(book.cover_src);

  return (
    <Reveal delay={index * 100}>
      <div className="card prototype-book-card">
        <div
          style={{
            background: cover.bg,
            height: 200,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: "0 0 20px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {hasUploadedCover ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`${book.title} cover`}
                src={book.cover_src}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(8,8,8,0.06) 0%, rgba(8,8,8,0.48) 100%)",
                }}
              />
            </>
          ) : (
            <>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: cover.spine, opacity: 0.9 }} />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontFamily: "JetBrains Mono",
                  fontSize: 9,
                  color: cover.spine,
                  opacity: 0.35,
                  letterSpacing: "0.15em",
                }}
              >
                {cover.label}
              </div>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} viewBox="0 0 200 200">
                {Array.from({ length: 13 }, (_, line) => (
                  <line key={line} stroke={cover.spine} strokeWidth="1" x1="0" x2="200" y1={line * 17} y2={line * 17} />
                ))}
              </svg>
            </>
          )}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 18,
              fontFamily: "JetBrains Mono",
              fontSize: 11,
              color: hasUploadedCover ? "rgba(255,255,255,0.78)" : cover.spine,
              opacity: hasUploadedCover ? 1 : 0.6,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3, maxWidth: 150, textWrap: "pretty" }}>{book.title}</div>
            <div
              style={{
                fontSize: 11,
                color: hasUploadedCover ? "rgba(255,255,255,0.82)" : cover.spine,
                opacity: hasUploadedCover ? 1 : 0.8,
                marginTop: 5,
                fontFamily: "JetBrains Mono",
              }}
            >
              {book.author}
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 18px" }}>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.65, fontStyle: "italic" }}>
            "{book.takeaway || book.summary}"
          </p>
        </div>
      </div>
    </Reveal>
  );
}
