<script setup lang='ts'>
definePageMeta({ middleware: "admin-auth" });
import { Users } from "lucide-vue-next";


</script>
<template>
  <section>

    <div class="flex font-dm items-center gap-2">
      <Users />
      <h3 class="text-3xl">Tutors</h3>
    </div>
    <CreateTutorForm />
    <TutorsTable />
  </section>
</template>
