export const TERMINAL_THEME_STORAGE_KEY = "bookcv-terminal-scheme";
export const DEFAULT_TERMINAL_SCHEME = "one-half-dark";

export const TERMINAL_SCHEMES = [
  {
    value: "campbell",
    label: "Campbell",
    note: "/* cmd.exe nostalgia, but your eyes filed a ticket */",
  },
  {
    value: "campbell-powershell",
    label: "Campbell PowerShell",
    note: "/* blue enough to feel official, calm enough to read */",
  },
  {
    value: "vintage",
    label: "Vintage",
    note: "/* retro terminal energy, less actual time travel */",
  },
  {
    value: "one-half-dark",
    label: "One Half Dark",
    note: "/* modern, readable, and not trying too hard */",
  },
  {
    value: "one-half-light",
    label: "One Half Light",
    note: "/* daylight debugging without the washed-out regret */",
  },
  {
    value: "solarized-dark",
    label: "Solarized Dark",
    note: "/* the classic answer to \"can we reduce the eye strain\" */",
  },
  {
    value: "solarized-light",
    label: "Solarized Light",
    note: "/* for engineers who open windows on purpose */",
  },
  {
    value: "tango-dark",
    label: "Tango Dark",
    note: "/* desktop-linux muscle memory, preserved */",
  },
  {
    value: "tango-light",
    label: "Tango Light",
    note: "/* reads like docs, still feels like a terminal */",
  },
] as const;

export type TerminalScheme = (typeof TERMINAL_SCHEMES)[number]["value"];

export function isTerminalScheme(value: string | null | undefined): value is TerminalScheme {
  return TERMINAL_SCHEMES.some((scheme) => scheme.value === value);
}

export function getThemeBootScript() {
  const values = TERMINAL_SCHEMES.map((scheme) => scheme.value);

  return `(() => {
    try {
      const key = ${JSON.stringify(TERMINAL_THEME_STORAGE_KEY)};
      const allowed = ${JSON.stringify(values)};
      const fallback = ${JSON.stringify(DEFAULT_TERMINAL_SCHEME)};
      const stored = window.localStorage.getItem(key);
      const next = allowed.includes(stored) ? stored : fallback;
      document.documentElement.dataset.terminalScheme = next;
    } catch {}
  })();`;
}
