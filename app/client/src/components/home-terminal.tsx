"use client";

import { useEffect, useMemo, useState } from "react";

type TerminalEntry = {
  command: string;
  output: string;
};

type RenderedLine = {
  text: string;
  type: "cmd" | "out";
  instant?: boolean;
  pause?: number;
};

type HomeTerminalProps = {
  lines: TerminalEntry[];
};

function useTypewriter(lines: RenderedLine[], speed = 32) {
  const [displayed, setDisplayed] = useState<RenderedLine[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayed(lines);
      setDone(true);
    }
  }, [lines]);

  useEffect(() => {
    if (done) {
      return;
    }

    if (lineIndex >= lines.length) {
      setDone(true);
      return;
    }

    const currentLine = lines[lineIndex];

    if (currentLine.instant) {
      setDisplayed((previous) => {
        const next = [...previous];
        next[lineIndex] = currentLine;
        return next;
      });

      const timer = window.setTimeout(() => {
        setLineIndex((value) => value + 1);
        setCharIndex(0);
      }, currentLine.pause ?? 380);

      return () => window.clearTimeout(timer);
    }

    if (charIndex <= currentLine.text.length) {
      const timer = window.setTimeout(() => {
        setDisplayed((previous) => {
          const next = [...previous];
          next[lineIndex] = { ...currentLine, text: currentLine.text.slice(0, charIndex) };
          return next;
        });
        setCharIndex((value) => value + 1);
      }, speed);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setLineIndex((value) => value + 1);
      setCharIndex(0);
    }, currentLine.pause ?? 320);

    return () => window.clearTimeout(timer);
  }, [charIndex, done, lineIndex, lines, speed]);

  return { displayed, done };
}

export function HomeTerminal({ lines }: HomeTerminalProps) {
  const renderedLines = useMemo<RenderedLine[]>(
    () =>
      lines.flatMap((line) => [
        { text: line.command, type: "cmd", pause: 380 },
        { text: line.output, type: "out", instant: true, pause: 520 },
      ]),
    [lines],
  );

  const { displayed, done } = useTypewriter(renderedLines);

  return (
    <div className="terminal-shell terminal-grid motion-fade-up relative" style={{ animationDelay: "420ms" }}>
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-5 py-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
          book@adelaide ~ portfolio
        </span>
      </div>

      <div className="space-y-5 px-5 py-6 font-mono text-[0.8rem] leading-7 sm:px-6">
        {displayed.map((line, index) => (
          <div key={`${index}-${line.type}`} className={line.type === "cmd" ? "text-foreground" : "text-primary/90"}>
            {line.text}
          </div>
        ))}

        {!done ? <span className="terminal-cursor" /> : null}
      </div>
    </div>
  );
}
