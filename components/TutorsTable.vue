<script setup lang="ts">
import { columns } from "./tutors-table/columns";
import DataTable from "./tutors-table/DataTable.vue";
import type { IUser } from "~/server/models/user.js";
const { data, error } = await useFetch<IUser[]>("/api/tutors", { key: "tutors" });
</script>

<template>
  <div>
    <div class="pt-3">
      <div v-if="error" class="text-red-500">
        Failed to load tutors
      </div>
      <div v-else-if="data">
        <DataTable :columns="columns" :data="data" class="w-full" />
      </div>
      <div v-else class="text-gray-500">Loading tutors...</div>
    </div>
  </div>
</template>
