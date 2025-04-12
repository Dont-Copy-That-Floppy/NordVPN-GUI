<script setup>
import { useAuth } from './composables/useAuth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { checkAuth, isLoggedIn } = useAuth()
const router = useRouter()

onMounted(async () => {
  await checkAuth()
  if (isLoggedIn.value) {
    router.push('/dashboard')
  } else {
    router.push('/startup')
  }
})
</script>

<template>
  <router-view />
</template>
