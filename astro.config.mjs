import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://sky-azurewood.vercel.app",
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), solidJs()],
});
