<script lang="ts" setup>
const route = useRoute()
const id = route.params.id

const { data: tutor, error } = useFetch(`/api/tutors/${id}`)

let from = ref("")
let until = ref("")
let day = ref("")


let fromInSec = computed(() => {
  return convertTimeToNumber(from.value)
})

let untilInSec = computed(() => {
  return convertTimeToNumber(until.value)
})






async function handleAddShift() {
  convertTimeToNumber(from.value)
  convertTimeToNumber(until.value)
  await fetch("/api/tutors/shifts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: from.value, until: until.value, day: day.value })
  })
}

</script>

<template>
  <div>
    <span class="text-4xl">
      Hello
    </span>
    {{ tutor }}



    <section>
      shifts
      <ul>
        <li v-for="shift in tutor.shifts" :key="shift._id">
          {{ shift }}
        </li>
      </ul>
    </section>
    <form @submit.prevent="handleAddShift">
      <input required placeholder="from" type="time" v-model="from" />
      <input required placeholder="until" type="time" v-model="until" />
      <input required placeholder="day" v-model="day" />
      <button>Add Shift</button>
    </form>
  </div>

</template>
