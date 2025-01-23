<script setup lang="ts">
definePageMeta({ middleware: "admin-auth" });
import type { IUser } from "~/server/models/user.js";
import type { IAttendance } from "~/server/models/attendance.js";
import { UserCog, Users, ListTodo, SquareCheckBig, Trash2, Mail, LogIn, LogOut, Calendar, X, Check, Plus, CalendarDays, Clock10, User, MoveRight } from "lucide-vue-next";


</script>

<template>
  <div>
    <section class="py-4">
      <h3 class="flex font-dm items-center gap-2 pb-2">
        <ListTodo />
        <span class="text-3xl">Today Shifts</span>
      </h3>

      <ShiftCards class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2" />
    </section>

    <section>
      <h3 class="flex items-center gap-2">
        <Users />
        <span class="text-3xl font-dm">Tutors</span>
      </h3>
      <CreateTutorForm />
      <TutorsTable />
    </section>
  </div>

</template>
