import { defineNuxtConfig } from "nuxt/config";
import "dotenv/config"
import "process"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
    renderJsonPayloads: true,
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: "MSC Management System",
      link: [{
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
      }, {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap",
      }, {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "",
      }, {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      }],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    port: 3000,
  },
  $production: {
    routeRules: {
      "./**": { ssr: true },
    },
  },
  runtimeConfig: {
    oauth: {
      google: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectURL: process.env.REDIRECT_URL,
      },
    },
  },
  typescript: {
    strict: false,
    tsConfig: {
      compilerOptions: {
        module: "NodeNext",
        moduleResolution: "NodeNext",
      },
    },
  },
  modules: [
    "nuxt-auth-utils",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt",
  ],
  googleFonts: {
    families: {
      Roboto: true,
      "Open+Sans": [400, 700],
    },
    display: "swap",
  },
  shadcn: {
    prefix: "",
    /**
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
