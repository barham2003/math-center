<script setup lang="ts">
definePageMeta({ middleware: ["tutor-auth"] });
import { SquareCheckBig, ListTodo, CheckCheck, Trash2, Mail, LogIn, LogOut, Calendar, X, Check, Plus, CalendarDays, Clock10, User, MoveRight } from "lucide-vue-next";
const { user } = useUserSession()


</script>
<template>

  <section>
    <TutorCard :tutor="user" />
    <h1 class="text-3xl my-2 font-dm flex gap-2 items-center">
      <ListTodo />
      <span>
        Today's Shifts
      </span>
    </h1>

    <ShiftCards class="flex flex-col gap-2" />

  </section>

</template>
