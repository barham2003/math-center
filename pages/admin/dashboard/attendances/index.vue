<script lang="ts" setup>
definePageMeta({ middleware: "admin-auth" });
import { ListTodo, Clipboard, ClockAlert } from "lucide-vue-next";

const selectedDay = ref(getToday());

function handleDaySelect(day: any) {
  selectedDay.value = day;
}
</script>
<template>
  <div>
    <section class="pb-4">
      <h3 class="flex items-center gap-2 pb-2 font-dm">
        <ListTodo />
        <span class="text-3xl">Week Shifts</span>
      </h3>
      <WeekCalendar
        :selected-day="selectedDay"
        @onSelect="handleDaySelect"
        class="my-2"
      />
      <ShiftCards
        class="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3"
        :day="selectedDay"
      />
    </section>

    <section>
      <h3 class="flex items-center gap-2 pb-2 font-dm">
        <Clipboard />
        <span class="text-3xl">Attendances</span>
      </h3>
      <AttendancesTable />
    </section>

    <section>
      <h3 class="flex items-center gap-2 py-2 font-dm">
        <ClockAlert />
        <span class="text-3xl">Absents</span>
      </h3>

      <div>
        <AbsentsTable />
      </div>
    </section>
  </div>
</template>
