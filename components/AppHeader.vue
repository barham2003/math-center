<script setup lang="ts">
import {
  LogOut,
  LogIn,
  User,
  Mail,
  House,
  LayoutDashboard,
  Users,
  Clipboard,
} from "lucide-vue-next";
import { ROLE } from "../server/models/role.enum.js";
import { cn } from "~/lib/utils";

const { loggedIn, clear, user, session } = useUserSession();
const route = useRoute();
const hasVerifyToken = useCookie("verify-token")

async function logout() {
  await clear();
  await navigateTo("/");
}

const invisibleLink = { label: "", to: "/", isVisible: false, icon: null };

const dashboardLink = computed(() => {
  if (!user.value) return invisibleLink;
  else if (user.value.role === ROLE.ADMIN)
    return {
      label: "Dashboard",
      to: "/admin/dashboard",
      isVisible: true,
      icon: LayoutDashboard,
    };
  else if (user.value.role === ROLE.TUTOR)
    return {
      label: "Dashboard",
      to: "/tutor/dashboard",
      isVisible: true,
      icon: LayoutDashboard,
    };
});

let tutorsLink = computed(() => {
  if (!user.value) return invisibleLink;
  else if (user.value.role === ROLE.ADMIN)
    return {
      label: "Tutors",
      to: "/admin/dashboard/tutors",
      isVisible: true,
      icon: Users,
    };
  else return invisibleLink;
});

let attendancesLink = computed(() => {
  if (!user.value) return invisibleLink;
  else if (user.value.role === ROLE.TUTOR) return invisibleLink;
  else if (user.value.role === ROLE.ADMIN)
    return {
      label: "Attendances",
      to: "/admin/dashboard/attendances",
      isVisible: true,
      icon: Clipboard,
    };
});

const links = [
  { label: "Home", to: "/", isVisible: true, icon: House },
  dashboardLink.value,
  tutorsLink.value,
  attendancesLink.value,
];
</script>

<template>
  <nav class="flex h-[4rem] w-full items-center justify-between border-b border-input bg-background px-5 text-gray-600">
    <div>
      <ul class="flex items-center gap-4">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link?.to" v-if="link.isVisible"
            :class="cn(route.path === link.to && 'font-bold text-primary')">
            <component :is="link.icon" v-if="link.icon && link.isVisible" class="mr-2" />
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div v-if="hasVerifyToken">
      <div v-if="loggedIn" class="flex flex-col gap-1">
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage v-if="user.picture" :src="user?.picture" alt="@radix-vue" class="h-[3rem] rounded-md" />
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
    </div>
  </nav>
</template>
