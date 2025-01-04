import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
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

  modules: ["nuxt-auth-utils"],
});
