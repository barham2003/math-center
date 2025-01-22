<script lang="ts" setup>
import { Plus } from "lucide-vue-next"

const newEmail = ref<string>("");
async function handleAdd() {
  try {
    await fetch("/api/tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail.value }),
    });
    await refreshNuxtData("tutors")
    newEmail.value = "";
  } catch (error) {
    console.error("Failed to add tutor:", error);
  }
}
</script>
<template>


  <form @submit.prevent="handleAdd" class="flex items-center gap-2">
    <Input name="email" v-model="newEmail" placeholder="Email" type="email" required class="w-full max-w-md" />
    <Button type="submit" :disabled="!newEmail">
      <Plus />
      Add Tutor
    </Button>
  </form>

</template>
