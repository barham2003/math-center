<script lang="ts" setup>
import Vue from "vue";
import { User } from "lucide-vue-next";
import type { IUser } from "~/server/models/user";
defineProps<{ tutor: IUser }>();
</script>

<template>
  <NuxtLink :to="`/admin/dashboard/tutors/${tutor._id}`">
    <Avatar>
      <AvatarImage :src="tutor.picture" alt="@radix-vue" />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  </NuxtLink>
</template>
