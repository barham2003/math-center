<script setup lang="ts">
import type { NuxtError } from '#app'
import { AlertTriangle, Home } from 'lucide-vue-next'

const props = defineProps({
  error: Object as () => NuxtError
})

const errorMessages: Record<number, string> = {
  404: "Page Not Found",
  500: "Internal Server Error",
  403: "Forbidden",
  401: "Unauthorized"
}

const getMessage = (statusCode: number) => {
  return errorMessages[statusCode] || "An Unexpected Error Occurred"
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
      <div class="flex justify-center mb-6">
        <AlertTriangle :size="64" class="text-red-500" />
      </div>

      <h1 class="text-4xl font-bold mb-4 text-gray-800">
        {{ error.statusCode }}
      </h1>

      <h2 class="text-2xl font-semibold mb-4 text-gray-700">
        {{ getMessage(error.statusCode) }}
      </h2>

      <p class="text-gray-600 mb-6">
        {{ error.message || 'Something went wrong. Please try again later.' }}
      </p>

      <NuxtLink to="/" class="inline-flex items-center justify-center gap-2 px-4 py-2 
               bg-primary text-white rounded-md hover:bg-primary/90 
               transition-colors duration-300">
        <Home :size="20" />
        Go Back Home
      </NuxtLink>
    </div>
  </div>
</template>
