<script setup lang='ts'>
import { Users } from "lucide-vue-next";
</script>
<template>


  <section>
    <div class="flex items-center gap-2">
      <Users />
      <h3 class="text-3xl">Tutors</h3>
    </div>
    <CreateTutorForm />
    <TutorsTable />
  </section>
</template>
