<script setup lang="ts">
definePageMeta({ middleware: "admin-auth" });

let newName = ref<string>("");
let newEmail = ref<string>("");
const header = useRequestHeaders(["cookie"]);

const { data: admins } = await useFetch("/api/admins");
const { data: tutors, refresh: refreshTutors } = await useFetch("/api/tutors");

const { data: newData, execute } = await useFetch("/api/tutors", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  immediate: false,
  watch: false,
  body: JSON.stringify({ name: newName.value, email: newEmail.value }),
});

// async function handleSubmit() {
//   console.log("GOT HERE")
//
//
//   console.log(data)
//
// }
</script>
<template>
  <div>
    {{ admins }}

    <h1 class="h-20 text-3xl">Admin Dashboard</h1>
    <p>Here is the dashboard for our page</p>

    <section>
      <h3>Admins</h3>
      <ul>
        <li v-for="admin in admins" :key="admin._id">
          name: {{ admin.name }}, email: {{ admin.email }}, picture:
          {{ admin.picture }}
        </li>
      </ul>
    </section>

    <section>
      <form @submit.prevent="handleSubmit">
        <input name="name" v-model="newName" class="border-2 border-black" />
        <input name="email" v-model="newEmail" class="border-2 border-black" />
        <button type="submit" class="border border-black">Submit</button>
      </form>

      <div>
        <h3>Tutors</h3>
        <ul>
          <li v-for="tutor in tutors" :key="tutor._id">
            name: {{ tutor.name }}, email: {{ tutor.email }}, picture:
            {{ tutor.picture }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
