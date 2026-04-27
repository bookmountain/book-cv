"use client";

import { useEffect, useId, useState } from "react";

type MermaidBlockProps = {
  chart: string;
};

type RenderState =
  | { status: "idle" | "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; svg: string };

function sanitizeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

export function MermaidBlock({ chart }: MermaidBlockProps) {
  const reactId = useId();
  const [state, setState] = useState<RenderState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      setState({ status: "loading" });

      try {
        const mermaid = (await import("mermaid")).default;
        const root = document.documentElement;
        const styles = getComputedStyle(root);

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "antiscript",
          theme: "base",
          themeVariables: {
            background: "transparent",
            primaryColor: styles.getPropertyValue("--card").trim() || "#1f2937",
            primaryTextColor: styles.getPropertyValue("--foreground").trim() || "#e5e7eb",
            primaryBorderColor: styles.getPropertyValue("--border-strong").trim() || "#334155",
            lineColor: styles.getPropertyValue("--accent").trim() || "#60a5fa",
            secondaryColor: styles.getPropertyValue("--secondary").trim() || "#111827",
            tertiaryColor: styles.getPropertyValue("--background").trim() || "#0f172a",
            clusterBkg: styles.getPropertyValue("--secondary").trim() || "#111827",
            clusterBorder: styles.getPropertyValue("--border-strong").trim() || "#334155",
            edgeLabelBackground: styles.getPropertyValue("--card").trim() || "#1f2937",
            fontFamily: 'var(--font-mono-stack), "JetBrains Mono", monospace',
          },
        });

        const diagramId = `mermaid-${sanitizeId(reactId)}`;
        const { svg } = await mermaid.render(diagramId, chart);

        if (!cancelled) {
          setState({ status: "ready", svg });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: "error",
            message: error instanceof Error ? error.message : "Unable to render diagram.",
          });
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (state.status === "error") {
    return (
      <div className="mermaid-block">
        <pre className="mermaid-block__fallback">{chart}</pre>
        <p className="mermaid-block__error">{state.message}</p>
      </div>
    );
  }

  if (state.status !== "ready") {
    return (
      <div className="mermaid-block">
        <div className="mermaid-block__loading">Rendering diagram…</div>
      </div>
    );
  }

  return (
    <div className="mermaid-block">
      <div
        className="mermaid-block__diagram"
        dangerouslySetInnerHTML={{ __html: state.svg }}
      />
    </div>
  );
}
