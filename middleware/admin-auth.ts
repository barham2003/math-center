import { defineNuxtRouteMiddleware } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession();
  const isAdmin = user?.value?.email === "baranali6688@gmail.com";

  if (!isAdmin) {
    return navigateTo("/login");
  }
});
