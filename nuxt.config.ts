import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: "MCS Management System",
      link: [{
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
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
        redirectURL: "http://localhost:3000/api/auth/google",
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
