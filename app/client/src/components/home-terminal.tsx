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
      <div className="flex items-center gap-2 border-b px-5 py-4" style={{ borderColor: "var(--border)", background: "var(--window-bar)" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--window-red)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--window-yellow)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--window-green)" }} />
        <span className="ml-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
          book@adelaide ~ portfolio
        </span>
      </div>

      {/* Every line is laid out from the start and revealed as it types, so the box
          keeps its final height and the page below never jumps. */}
      <div className="space-y-3 px-5 py-5 font-mono text-[0.78rem] leading-6 sm:space-y-5 sm:px-6 sm:py-6 sm:text-[0.8rem] sm:leading-7">
        {renderedLines.map((line, index) => {
          const shown = done ? line.text : displayed[index]?.text ?? "";
          const isTyping = !done && index === displayed.length - 1;

          return (
            <div key={`${index}-${line.type}`} style={{ color: line.type === "cmd" ? "var(--foreground)" : "var(--primary)", whiteSpace: "pre-wrap" }}>
              {shown}
              {isTyping ? <span className="terminal-cursor" style={{ marginRight: "-0.5rem" }} /> : null}
              <span aria-hidden="true" style={{ visibility: "hidden" }}>
                {line.text.slice(shown.length)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
