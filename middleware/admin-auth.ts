import { defineNuxtRouteMiddleware } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession();
  console.log(user.value);
  const isAdmin = user?.value?.email === "baranali6688@gmail.com";

  if (!isAdmin) {
    return navigateTo("/login");
  }
});
