"use client";

import { useEffect, useId, useState } from "react";

import {
  DEFAULT_TERMINAL_SCHEME,
  isTerminalScheme,
  TERMINAL_SCHEMES,
  TERMINAL_THEME_STORAGE_KEY,
  type TerminalScheme,
} from "@/lib/terminal-schemes";

function resolveScheme(value: string | null | undefined): TerminalScheme {
  return isTerminalScheme(value) ? value : DEFAULT_TERMINAL_SCHEME;
}

export function TerminalThemeSwitcher() {
  const selectId = useId();
  const [scheme, setScheme] = useState<TerminalScheme>(DEFAULT_TERMINAL_SCHEME);

  useEffect(() => {
    const next = resolveScheme(window.localStorage.getItem(TERMINAL_THEME_STORAGE_KEY) ?? document.documentElement.dataset.terminalScheme);
    document.documentElement.dataset.terminalScheme = next;
    setScheme(next);
  }, []);

  const activeScheme = TERMINAL_SCHEMES.find((item) => item.value === scheme) ?? TERMINAL_SCHEMES[0];

  function handleChange(next: TerminalScheme) {
    document.documentElement.dataset.terminalScheme = next;
    window.localStorage.setItem(TERMINAL_THEME_STORAGE_KEY, next);
    setScheme(next);
  }

  return (
    <div className="prototype-theme-switcher" title={activeScheme.note}>
      <label className="prototype-theme-label" htmlFor={selectId}>
        scheme://
      </label>
      <select
        aria-label="Choose a terminal color scheme"
        className="prototype-theme-select"
        id={selectId}
        onChange={(event) => handleChange(resolveScheme(event.target.value))}
        value={scheme}
      >
        {TERMINAL_SCHEMES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="prototype-theme-comment">{activeScheme.note}</span>
    </div>
  );
}
