<script setup lang="ts">
const links = [{ label: "Home", to: "/" }, { label: "Admin", to: "/admin" }]

</script>
<template>
  <header>
    <nav>
      <ul>
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
