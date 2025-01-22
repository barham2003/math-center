<script lang="ts" setup>
import { SquareCheckBig, CheckCheck, Trash2, Mail, LogIn, LogOut, Calendar, X, Check, Plus, CalendarDays, Clock10, User, MoveRight } from "lucide-vue-next";
import type { IAttendance } from "~/server/models/attendance.js";
import { cn } from "@/lib/utils"

const { user } = useUserSession()
const isAdmin = user.value.role === "admin"
const isTutor = user.value.role === "tutor"

function isLate(shift: any) {
  const isLate = convertTimeToNumber(new Date(shift.todayAttendance?.checkinTime).toTimeString().split(" ")[0]) + 600 > shift.from
  return isLate
}


const { data: shifts } = await useFetch<IAttendance[]>("/api/shifts", { key: 'shifts' })

async function checkinAttendance(shiftId: string) {
  if (isAdmin) return
  await fetch("/api/attendances/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shiftId }),
  })
  await refreshNuxtData("shifts")
}

async function checkOutAttendance(id: string) {
  if (isAdmin) return
  console.log(id)
  await fetch(`/api/attendances/checkout/${id}`, { method: "PATCH" })
  await refreshNuxtData("shifts")

}

</script>
<template>
  <div>
    <Card v-for="shift in shifts" :key="shift._id" :class="cn(isTutor && 'py-4')">

      <CardHeader v-if="isAdmin && shift.tutor">
        <NuxtLink :to="`/admin/dashboard/tutors/${shift.tutor._id}`">
          <div class="flex items-center gap-2">
            <Avatar class="h-8 w-8 ">
              <AvatarImage v-if="shift.tutor.picture" :src="shift.tutor.picture" alt="user pic" class="rounded-md" />
              <AvatarFallback v-else>
                <User class="h-full w-full" />
              </AvatarFallback>
            </Avatar>
            <span>{{ shift.tutor.name }}</span>
          </div>
        </NuxtLink>
      </CardHeader>

      <CardContent class="flex flex-col py-4">
        <div class="flex items-center gap-2">
          <Clock10 />
          <span> {{ shift.fromTime }} </span>
          <span>
            <MoveRight />
          </span>
          <span> {{ shift.untilTime }} </span>
        </div>
        <div class="flex gap-2 items-center">
          <Calendar />
          <WeekCalendar class="py-2" :selected-day="shift.day" />
        </div>

        <div class="h-[3.5rem]">
          <p v-if="shift.todayAttendance" class="flex gap-2 items-center">
            <Check size="18" />
            Checked in at
            {{ new Date(shift.todayAttendance.checkinTime).toLocaleTimeString() }}
          </p>
          <p v-if="shift.todayAttendance && shift.todayAttendance.checkoutTime" class="flex gap-2 items-center">
            <CheckCheck size="18" />
            <span>
              Checked out at
              {{ new Date(shift.todayAttendance.checkoutTime).toLocaleTimeString() }}
            </span>
          </p>
        </div>

        <Button v-if="!shift.todayAttendance" class="w-fit" variant="outline" @click="checkinAttendance(shift._id)">
          <LogIn class="text-green-600" />
          {{ isTutor ? "Check in" : "Still" }}
        </Button>
        <Button v-else-if="(shift.todayAttendance && !shift.todayAttendance.checkoutTime)" class="w-fit"
          variant="outline" @click="checkOutAttendance(shift.todayAttendance._id)">
          <LogOut class="text-red-700" />
          {{ isTutor ? "Check Out" : "Attending" }}
        </Button>
        <Button v-else-if="shift.todayAttendance.checkoutTime" class="w-fit">
          <SquareCheckBig />
          Done

        </Button>
      </CardContent>
    </Card>

  </div>
</template>
