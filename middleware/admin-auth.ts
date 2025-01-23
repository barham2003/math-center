import { defineNuxtRouteMiddleware } from "nuxt/app";
import { ROLE } from "~/server/models/role.enum.ts";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession();
  if (!user.value) return navigateTo("/");

  const isAdmin = user?.value?.email === "baranali6688@gmail.com" ||
    user?.vaule?.role === ROLE.ADMIN;

  if (!isAdmin) {
    return navigateTo("/");
  }
});
