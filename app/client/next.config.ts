import path from "node:path";
import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

loadEnvConfig(path.resolve(process.cwd(), "../.."));

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    // The old About page was replaced by the Experience section on the home page.
    return [{ source: "/about", destination: "/experience", permanent: true }];
  },
};

export default nextConfig;
