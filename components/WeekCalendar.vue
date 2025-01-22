<script setup lang="ts">

import { cn } from '@/lib/utils'
const { selectedDay } = defineProps<{
  selectedDay: "sun" | "mon" | "tue" | "wed" | "thu"
}>()

const days = ["sun", "mon", "tue", "wed", "thu"]

</script>
<template>
  <div class="flex gap-1">
    <span v-for="day in days" :key="day"
      :class="cn('border-input border text-sm rounded-full p-2 hidden md:block', day === selectedDay && 'bg-foreground block text-background')">
      {{ day.toUpperCase() }}</span>
  </div>
</template>
