<script setup lang="ts">
import { LogIn } from "lucide-vue-next";

const password = ref("")
const token = useCookie("verify-token")
const message = ref("")
const isVerified = ref(false)

const router = useRouter()

async function handleSubmit() {
  const res = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: password.value }),
  });

  const json = await res.json()
  if (res.ok && json.status == "success") {
    isVerified.value = true
  } else {
    isVerified.value = false
  }
  message.value = json.message

}
</script>

<template>
  <div class="w-full">
    <form @submit.prevent="handleSubmit">
      <span>
        {{ message }}
      </span>
      <Input v-model="password" required class="my-2 min-w-screen" placeholder="Password" />
      <Button :disabled="isVerified">
        {{ isVerified ? "Verified" : "Verify" }}
      </Button>
    </form>
    <div class="py-1"></div>
    <a href="api/auth/google" v-if="isVerified">
      <Button variant="outline">
        <LogIn />
      </Button>
    </a>
  </div>
</template>
