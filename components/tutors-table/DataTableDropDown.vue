<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-vue-next";
import { Trash2, Eye } from "lucide-vue-next";
import type { IUser } from "~/server/models/user";

defineProps<{
  tutor: IUser;
}>();

let open = ref(false);
async function handleDeleteTutor(tutorId: string) {
  await fetch(`/api/tutors/${tutorId}`, { method: "DELETE" });
  await refreshNuxtData("tutors");
  open.value = false;
}

function toggleModal() {
  open.value = !open.value;
}
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="">
          <MoreHorizontal class="w-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <NuxtLink :to="`/admin/dashboard/tutors/${tutor._id}`">
          <DropdownMenuItem> <Eye /> View Tutor </DropdownMenuItem>
        </NuxtLink>
        <DropdownMenuItem @click="toggleModal">
          <Trash2 />
          Delete Tutor
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog :open="open">
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Delete Tutor </DialogTitle>
        </DialogHeader>
        <p class="my-2">Are you sure about deleting this tutor?</p>
        <div class="flex gap-2">
          <Button variant="destructive" @click="handleDeleteTutor(tutor._id)"
            >Yes, Delete</Button
          >
          <Button variant="outline" @click="toggleModal">Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
