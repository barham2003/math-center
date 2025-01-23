<script lang="ts" setup>
import { ListTodo, Clipboard, ClockAlert } from "lucide-vue-next";

const selectedDay = ref(getToday())


function handleDaySelect(day: any) {
  selectedDay.value = day
}

</script>
<template>
  <div>
    <section class="pb-4">
      <h3 class="flex font-dm items-center gap-2 pb-2">
        <ListTodo />
        <span class="text-3xl">Week Shifts</span>
      </h3>
      <WeekCalendar :selected-day="selectedDay" @onSelect="handleDaySelect" class="my-2" />
      <ShiftCards class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2" :day="selectedDay" />
    </section>

    <section>
      <h3 class="flex font-dm items-center gap-2 pb-2">
        <Clipboard />
        <span class="text-3xl">Attendances</span>
      </h3>
      <AttendancesTable />
    </section>


    <section>
      <h3 class="flex font-dm items-center gap-2 py-2">
        <ClockAlert />
        <span class="text-3xl">Absents</span>
      </h3>

      <div>
        <AbsentsTable />
      </div>

    </section>
  </div>

</template>
