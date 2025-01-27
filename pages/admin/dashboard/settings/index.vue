<script lang="ts" setup>
definePageMeta({ middleware: "admin-auth" });
import type { IUser } from "~/server/models/user.js";
import { UserCog } from "lucide-vue-next";
const { data: admins, error: adminError } =
  await useFetch<IUser[]>("/api/admins");
</script>
<template>
  <section class="mb-8">
    <div class="flex items-center gap-2 font-dm">
      <UserCog />
      <h3 class="text-3xl">Admins</h3>
    </div>
    <div v-if="adminError" class="text-red-500">Failed to load admins</div>
    <ul v-else-if="admins" class="w-full space-y-2">
      <li v-for="admin in admins" :key="admin._id" class="rounded bg-white p-4">
        <div class="flex items-center gap-4">
          <Avatar>
            <AvatarImage :src="admin.picture" alt="@radix-vue" class="h-[3rem] rounded-md" />
            <AvatarFallback>{{ admin.name }}</AvatarFallback>
          </Avatar>

          <span class="hidden md:block">{{ admin.name }}</span>
          <span class="hidden md:block">/</span>
          <span>{{ admin.email }}</span>
        </div>
      </li>
    </ul>
    <div v-else class="text-gray-500">Loading admins...</div>
  </section>
</template>
