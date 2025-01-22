<script setup lang="ts">
import { LogOut, LogIn, User, Mail } from 'lucide-vue-next'
import { ROLE } from "../server/models/role.enum.js"
const { loggedIn, clear, user, session, fetch: refreshSession, } = useUserSession();

async function logout() {
  await clear()
  await navigateTo("/")

}

const invisibleLink = { label: '', to: "/", isVisible: false }

const dashboardLink = computed(() => {
  // ? "/admin/dashboard" : "/tutor/dashboard";
  if (!user.value) return invisibleLink
  else if (user.value.role === ROLE.ADMIN) return { label: "Dashboard", to: "/admin/dashboard", isVisible: true }
  else if (user.value.role === ROLE.TUTOR) return { label: "Dashboard", to: "/tutor/dashboard", isVisible: true }

})

let tutorsLink = computed(() => {
  if (user.value.role === ROLE.ADMIN) return { label: "Tutors", to: "/admin/dashboard/tutors", isVisible: true }
  else return invisibleLink
})

let attendancesLink = computed(() => {
  if (user.value.role === ROLE.ADMIN) return { label: "Attendances", to: "/admin/dashboard/attendances", isVisible: true }
  else return invisibleLink
})


const links = [
  { label: "Home", to: "/", isVisible: true },
  dashboardLink.value,
  tutorsLink.value,
  attendancesLink.value,

];

</script>

<template>
  <nav class="flex w-full justify-between items-center px-4  h-[4rem] border-b border-input">
    <div>
      <ul class="flex items-center gap-4">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link?.to" v-if="link.isVisible">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div v-if="loggedIn" class="flex flex-col gap-1">
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage :src="user.picture" alt="@radix-vue" class="h-[3rem]  rounded-md " />
            <AvatarFallback>{{ user.name }}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div class="">
            <p class="flex gap-2">
              <User /> {{ session.user.name }}
            </p>
            <p class="flex gap-2">
              <Mail /> {{ session.user.email }}
            </p>
          </div>
          <Button @click="logout">
            <LogOut />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
    <div v-else>
      <a href="api/auth/google">

        <!-- <a href="api/auth/google">google</a> -->
        <Button variant="outline">
          <LogIn />
        </Button>
      </a>
    </div>

  </nav>
</template>
