<script setup lang="ts">
const { class: className } = defineProps<{ class: string }>()

definePageMeta({ middleware: "admin-auth" });
import type { IUser } from "~/server/models/user.js";
import type { IAttendance } from "~/server/models/attendance.js";
import { UserCog, Users, ListTodo, SquareCheckBig, Trash2, Mail, LogIn, LogOut, Calendar, X, Check, Plus, CalendarDays, Clock10, User, MoveRight } from "lucide-vue-next";



const { data: admins, error: adminError } = await useFetch<IUser[]>("/api/admins",);
const { data: shifts } = await useFetch<IAttendance[]>("/api/shifts/all")




</script>

<template>
  <div :class="className">
    <section class="mb-8">
      <div class="flex items-center gap-2">
        <UserCog />
        <h3 class="text-3xl">Admins</h3>
      </div>
      <div v-if="adminError" class="text-red-500">Failed to load admins</div>
      <ul v-else-if="admins" class="w-full space-y-2">
        <li v-for="admin in admins" :key="admin._id" class="rounded bg-gray-50 p-4">
          <div class="flex items-center gap-4">
            <Avatar>
              <AvatarImage :src="admin.picture" alt="@radix-vue" class="h-[3rem] rounded-md" />
              <AvatarFallback>{{ admin.name }}</AvatarFallback>
            </Avatar>

            <span class="hidden md:block">{{ admin.name }}</span>
            <span class="hidden md:block">/</span>
            <span>{{ admin.email }}</span>
          </div>
        </li>
      </ul>
      <div v-else class="text-gray-500">Loading admins...</div>
    </section>


    <section class="py-4">
      <h3 class="flex items-center gap-2 pb-2">
        <ListTodo />
        <span class="text-3xl">Today Attendances</span>
      </h3>

      <ShiftCard class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2" />
    </section>

    <section>
      <h3 class="flex items-center gap-2">
        <Users />
        <span class="text-3xl">Tutors</span>
      </h3>
      <CreateTutorForm />
      <TutorsTable />
    </section>
  </div>

</template>
