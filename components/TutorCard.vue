<script lang="ts" setup>
import { Mail } from "lucide-vue-next"
import { IUser } from "~/server/models/user"
const { tutor } = defineProps<{
  tutor: IUser | { picture: string, name: string, email: string }
}>()
</script>
<template>
  <Card>
    <CardHeader class="flex flex-col items-center space-y-4">
      <Avatar class="h-24 w-24">
        <AvatarImage v-if="tutor.picture" :src="tutor.picture" alt="user pic" class="rounded-md" />
        <AvatarFallback v-else>
          <User class="h-full w-full" />
        </AvatarFallback>
      </Avatar>
      <CardTitle class="text-center text-2xl font-bold">
        {{ tutor.name || "Not Signed" }}
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <p class="text-sm flex gap-2 items-center">

        <Mail />
        {{ tutor.email }}
      </p>
    </CardContent>
  </Card>
</template>
