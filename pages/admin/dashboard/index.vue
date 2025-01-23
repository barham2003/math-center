<script setup lang="ts">
definePageMeta({ middleware: "admin-auth" });
import { Users, ListTodo } from "lucide-vue-next";
</script>

<template>
  <div>
    <section class="py-4">
      <h3 class="flex items-center gap-2 pb-2 font-dm">
        <ListTodo />
        <span class="text-3xl">Today Shifts</span>
      </h3>

      <ShiftCards
        class="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3"
      />
    </section>

    <section>
      <h3 class="flex items-center gap-2">
        <Users />
        <span class="font-dm text-3xl">Tutors</span>
      </h3>
      <CreateTutorForm />
      <TutorsTable />
    </section>
  </div>
</template>
