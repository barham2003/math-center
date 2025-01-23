<!-- components/WeekCalendar.vue -->
<script setup lang="ts">
import { cn } from '@/lib/utils'
const { selectedDay } = defineProps<{ selectedDay: "sun" | "mon" | "tue" | "wed" | "thu" }>()
const emit = defineEmits<{ onSelect: [day: string] }>()

const days = ["sun", "mon", "tue", "wed", "thu"]
</script>

<template>
  <div class="flex gap-1">
    <span v-for="day in days" :key="day" :class="cn(
      'border-input border text-sm rounded-full bg-background p-2 hidden md:block',
      day === selectedDay && 'bg-primary block text-background', 'cursor-pointer'
    )" @click="$emit('onSelect', day)">
      {{ day.toUpperCase() }}
    </span>
  </div>
</template>
