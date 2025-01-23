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
        clientId:
          "390832071799-o5su3apftkr1uvqdvtnjqouj1frqde6l.apps.googleusercontent.com",
        clientSecret: "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",
        redirectURL: process.env.CALLBACK_URL || "http://localhost:3000/api/auth/google",
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
