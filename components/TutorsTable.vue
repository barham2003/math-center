<script setup lang="ts">
import { columns } from "./tutors-table/columns";
import type { IUser } from "~/server/models/user.js";
const { data, error } = await useFetch<IUser[]>("/api/tutors", {
  key: "tutors",
});

const formattedData = data.value?.map((tutor) => {
  return {
    name: tutor.name,
    email: tutor.email,
    "Joined At": new Date(tutor.createdAt).toLocaleDateString(),
  };
});
</script>

<template>
  <div>
    <div class="pt-3">
      <div v-if="error" class="text-red-500">Failed to load tutors</div>
      <div v-else-if="data">
        <DownloadCsvButton :data="formattedData" name="Tutors Data" />
        <DataTable :columns="columns" :data="data" class="w-full" filter-key="name" />
      </div>
      <div v-else class="text-gray-500">Loading tutors...</div>
    </div>
  </div>
</template>
