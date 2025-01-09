<script lang="ts" setup>
definePageMeta({
  middleware: ["admin-auth"],
})

const { data: tutors } = await useFetch("/api/tutors")
</script>
<template>
  <div>
    <ul>
      <li v-for="tutor of tutors" :key="tutor._id" class="">
        <NuxtLink :to="`/admin/dashboard/tutors/${tutor._id}`">
          email:
          {{ tutor.email }}
        </NuxtLink>
      </li>
    </ul>
  </div>

</template>
