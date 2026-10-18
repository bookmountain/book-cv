import {
  Bot,
  Braces,
  BrainCircuit,
  Cable,
  Cloud,
  Database,
  FileSearch,
  FlaskConical,
  FolderTree,
  Hammer,
  Layers,
  MapPinned,
  MonitorSmartphone,
  RadioTower,
  Server,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

// Logos live in /public/skills. Full-colour logos render as <img>; single-colour
// logos render as a CSS mask so they follow the theme's text colour (or a fixed brand colour).
export type SkillIcon =
  | { kind: "logo"; src: string }
  | { kind: "mask"; src: string; color?: string }
  | { kind: "lucide"; icon: LucideIcon };

const logo = (name: string): SkillIcon => ({ kind: "logo", src: `/skills/${name}.svg` });
const mask = (name: string, color?: string): SkillIcon => ({ kind: "mask", src: `/skills/${name}.svg`, color });
const lucide = (icon: LucideIcon): SkillIcon => ({ kind: "lucide", icon });

const SKILL_ICONS: Record<string, SkillIcon[]> = {
  typescript: [logo("typescript")],
  javascript: [logo("javascript")],
  "c#": [logo("csharp")],
  java: [logo("java")],
  python: [logo("python")],
  sql: [lucide(Database)],
  "html/css": [logo("html5"), logo("css3")],
  react: [logo("react")],
  "next.js": [mask("nextdotjs")],
  "vue 3": [logo("vuejs")],
  vue: [logo("vuejs")],
  "redux toolkit": [logo("redux")],
  "rtk query": [logo("redux")],
  "react native": [logo("react")],
  expo: [mask("expo")],
  monorepo: [lucide(FolderTree)],
  "node.js": [logo("nodejs")],
  nestjs: [logo("nestjs")],
  "asp.net core": [logo("dotnetcore")],
  "spring boot": [logo("spring")],
  graphql: [logo("graphql")],
  signalr: [lucide(RadioTower)],
  rabbitmq: [logo("rabbitmq")],
  grpc: [lucide(Cable)],
  "cloudflare workers": [logo("cloudflareworkers")],
  azure: [logo("azure")],
  docker: [logo("docker")],
  "github actions": [logo("githubactions")],
  linux: [mask("linux")],
  proxmox: [mask("proxmox", "#E57000")],
  "prometheus/grafana": [logo("prometheus"), logo("grafana")],
  postgresql: [logo("postgresql")],
  mysql: [mask("mysql")],
  mongodb: [logo("mongodb")],
  redis: [logo("redis")],
  pgvector: [lucide(Waypoints)],
  postgis: [lucide(MapPinned)],
  rag: [lucide(FileSearch)],
  "ai agents": [lucide(Bot)],
  "tool calling": [lucide(Hammer)],
  mcp: [mask("mcp")],
  "spring ai": [logo("spring")],
  langchain4j: [logo("langchain")],
  langgraph4j: [mask("langgraph")],
  ollama: [mask("ollama")],
  jest: [logo("jest")],
  "react testing library": [mask("testinglibrary", "#E33332")],
  selenium: [logo("selenium")],
  git: [logo("git")],
  "claude code": [logo("claude")],
  codex: [mask("openai")],
};

const GROUP_ICONS: Record<string, LucideIcon> = {
  languages: Braces,
  "frontend & mobile": MonitorSmartphone,
  backend: Server,
  "cloud & devops": Cloud,
  data: Database,
  "ai engineering": BrainCircuit,
  "testing & tools": FlaskConical,
};

export function getSkillIcons(name: string): SkillIcon[] {
  return SKILL_ICONS[name.trim().toLowerCase()] ?? [];
}

export function getSkillGroupIcon(label: string): LucideIcon {
  return GROUP_ICONS[label.trim().toLowerCase()] ?? Layers;
}

export function splitSkills(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
