<script setup lang="ts">
import { columns } from "./absents-table/columns";
import { type IAbsent } from "~/server/models/shift.js";
import { ArrowRight, CalendarDays } from "lucide-vue-next"
import type { DateRange } from 'radix-vue'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { getLocalTimeZone, today } from '@internationalized/date'
import { type Ref, ref } from 'vue'
import { ArrowDownToLine } from "lucide-vue-next"

const { tutorId } = defineProps<{ tutorId?: string }>()
const start = today(getLocalTimeZone()).subtract({ days: 7 })
const end = today(getLocalTimeZone())

const dates = ref({ start, end }) as Ref<DateRange>

const { data, error } = await useFetch<IAbsent[]>(() => {
  if (dates.value.start && dates.value.end && tutorId) return `/api/absents?from=${dates.value.start}&until=${dates.value.end}&tutorId=${tutorId}`
  else if (dates.value.start && dates.value.end) return `/api/absents?from=${dates.value.start}&until=${dates.value.end}`
  else if (tutorId) return `/api/absents?tutorId=${tutorId}`
  else return "/api/absents"

}, { key: "absents", watch: [dates] });


const formattedData = data.value.map((absent) => {

  return {
    name: absent.tutor.name,
    email: absent.tutor.email,
    date: absent.date,
    day: absent.day,
    from: absent.fromTime,
    until: absent.untilTime,
  }
})

</script>

<template>
  <div>
    <div class="pt-3">
      <div v-if="error" class="text-red-500">
        Failed to load absents
      </div>
      <div v-else-if="data">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button class="mx-3">
              <CalendarDays />
              {{ dates.start }}
              <ArrowRight />
              {{ dates.end }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <RangeCalendar v-model="dates" class="rounded-md " />
          </DropdownMenuContent>
        </DropdownMenu>
        <DownloadCsvButton :data="formattedData" name="Absents Data" />
        <DataTable :columns="columns" :data="data" class="w-full" filter-key="tutorName" />
      </div>
      <div v-else class="text-gray-500">Loading absents...</div>
    </div>
  </div>
</template>
