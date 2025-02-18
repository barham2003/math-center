import { defineNuxtRouteMiddleware } from "nuxt/app";
import { ROLE } from "~/server/models/role.enum.ts";

export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession();
  if (!user.value) return navigateTo("/");
  const isTutor = user?.value.role === ROLE.TUTOR;

  if (!isTutor) {
    return navigateTo("/");
  }
});
