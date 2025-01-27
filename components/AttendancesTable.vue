<script setup lang="ts">
import { columns } from "./attendances-table/columns";
import type { IAttendance } from "~/server/models/attendance.js";
const { data, error } = await useFetch<IAttendance[]>("/api/attendances", {
  key: "attendances",
});

const formattedAttendances = data.value?.map((attendance) => {
  return {
    name: attendance.shift.tutor.name,
    email: attendance.shift.tutor.email,
    date: new Date(attendance.checkinTime).toLocaleDateString(),
    day: attendance.shift.day,
    "Checkin Time": new Date(attendance.checkinTime).toLocaleTimeString(),
    "Checkout Time": new Date(attendance.checkoutTime).toLocaleTimeString(),
  };
});
</script>

<template>
  <div>
    <div class="pt-3">
      <div v-if="error" class="text-red-500">Failed to load attendances</div>
      <div v-else-if="data">
        <DownloadCsvButton
          :data="formattedAttendances"
          name="Attendances Data"
        />
        <DataTable
          :columns="columns"
          :data="data"
          class="w-full"
          filter-key="tutorName"
        />
      </div>
      <div v-else class="text-gray-500">Loading attendances...</div>
    </div>
  </div>
</template>
