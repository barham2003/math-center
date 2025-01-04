<script setup lang="ts">
const { loggedIn, clear, user, session, fetch: refreshsession } = useUserSession()
</script>



<template>

  <div>
    {{ session }}
    <div v-if="loggedIn">
      <h1>Welcome {{ user.login }}!</h1>
      <p>Logged in since </p>
      <button @click="clear">Logout</button>
    </div>
    <div v-else>
      <a href="api/auth/google">google</a>
    </div>
  </div>


</template>
