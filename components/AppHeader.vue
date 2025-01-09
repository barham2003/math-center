<script setup lang="ts">
const links = [
  { label: "Home", to: "/" },
  { label: "Admin", to: "/admin" },
];
const { loggedIn, clear, user, session, fetch: refreshSession, } = useUserSession();

async function logout() {
  await clear()
  await navigateTo("/")
}
</script>
<template>
  <header>
    <nav class="flex justify-between px-4 bg-gray-200 md:flex">
      <ul class="flex gap-4">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <div v-if="loggedIn">
        <img alt="PROBLEM" :src="user.picture" />
        <span>{{ user.name }}</span>
        <button @click="logout">Logout</button>
      </div>

    </nav>
  </header>
</template>
