<script lang="ts" setup>
definePageMeta({ middleware: "admin-auth" });
import {
  Trash2,
  Calendar,
  X,
  Check,
  Plus,
  CalendarDays,
  Clock10,
  MoveRight,
} from "lucide-vue-next";

const route = useRoute();
const id = route.params.id;
const { data: tutor, error, refresh } = useFetch(`/api/tutors/${id}`);
const isAddShiftDialogOpen = ref(false);

function toggleAddShiftDialog() {
  isAddShiftDialogOpen.value = !isAddShiftDialogOpen.value;
}

let from = ref<string>("");
let until = ref<string>("");
let day = ref<any>({ name: "Sunday", code: "sun" });

let weekdays = ref([
  { name: "Sunday", code: "sun" },
  { name: "Monday", code: "mon" },
  { name: "Tuesday", code: "tue" },
  { name: "Wednesday", code: "wed" },
  { name: "Thursday", code: "thu" },
]);

async function handleAddShift(tutorId: string) {
  await fetch("/api/shifts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: from.value,
      until: until.value,
      day: day.value.code,
      tutorId,
    }),
  });

  from.value = "";
  until.value = "";

  await refresh();

  toggleAddShiftDialog();
}

async function handleDeleteShift(shiftId: string) {
  await fetch(`/api/shifts`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shiftId }),
  });
  await refresh();
}
</script>

<template>
  <div>
    <div v-if="error">Could not fetch tutor</div>
    <div v-else class="space-y-2 px-4">
      <TutorCard :tutor="tutor" />

      <Card>
        <CardHeader>
          <CardTitle class="flex gap-2">
            <CalendarDays /> <span> Shifts </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog :open="isAddShiftDialogOpen" @close="toggleAddShiftDialog">
            <DialogTrigger as-child @click="toggleAddShiftDialog">
              <Button> <Plus /> Add Shift </Button>
            </DialogTrigger>
            <DialogContent>
              <form
                @submit.prevent="handleAddShift(tutor._id)"
                class="grid grid-cols-2 gap-2"
              >
                <fieldset class="flex items-center gap-2">
                  <label for="from"> From:</label>
                  <Input
                    required
                    id="from"
                    placeholder="from"
                    type="time"
                    v-model="from"
                  />
                </fieldset>
                <fieldset class="flex items-center gap-2">
                  <label for="until"> Until: </label>
                  <Input
                    required
                    placeholder="until"
                    id="until"
                    type="time"
                    v-model="until"
                  />
                </fieldset>
                <fieldset class="col-span-2">
                  <Select v-model="day">
                    <SelectTrigger placeholder="Select A day">
                      <SelectValue placeholder="Select A day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Days</SelectLabel>
                        <SelectItem
                          v-for="day in weekdays"
                          :key="day.code"
                          :value="day"
                        >
                          {{ day.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </fieldset>

                <Button type="submit" class="col-span-2">
                  <Check />
                  Submit
                </Button>
                <Button
                  variant="outline"
                  class="col-span-2"
                  @click="toggleAddShiftDialog"
                >
                  <X />
                  Cancel
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <ul class="my-4 space-y-2 text-base md:text-lg" v-if="tutor.shifts">
            <Card v-for="shift in tutor.shifts" :key="shift._id">
              <CardContent class="flex flex-col rounded-md border py-4">
                <div class="flex items-center gap-2">
                  <Clock10 />
                  <span> {{ shift.fromTime }} </span>
                  <span>
                    <MoveRight />
                  </span>
                  <span> {{ shift.untilTime }} </span>
                </div>
                <div class="flex items-center gap-2">
                  <Calendar />
                  <WeekCalendar class="py-2" :selected-day="shift.day" />
                </div>

                <Dialog>
                  <DialogTrigger as-child class="w-10">
                    <Button variant="ghost">
                      <Trash2 class="w-10 text-red-500" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle> Delete shift </DialogTitle>
                    </DialogHeader>
                    <p class="my-2">Are you sure about deleting this shift?</p>
                    <div class="flex gap-2">
                      <Button
                        variant="destructive"
                        @click="handleDeleteShift(shift._id)"
                        class="w-[10rem]"
                        >Yes, Delete</Button
                      >
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
