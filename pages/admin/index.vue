<script setup lang="ts">
definePageMeta({ middleware: "admin-auth" });
const {
  loggedIn,
  clear,
  user,
  session,
  fetch: refreshSession,
} = useUserSession();

async function logout() {
  await clear();
  await refreshSession();
  await navigateTo("/login");
}
</script>

<template>
  <div>
    {{ session }}
    <h1 class="text-4xl">Admin</h1>
    <p>It is secured, you cannot come in here</p>
    <NuxtLink to="/admin/dashboard">Dashboard</NuxtLink>
  </div>
</template>
