<template>
  <div class="startup-page">
    <header>
      <img src="/icon.png" alt="App Logo" class="logo" />
    </header>

    <main class="content">
      <section class="left">
        <h1>Online security starts<br />with a click</h1>

        <div class="buttons">
          <button class="btn primary" @click="handleLogin" :disabled="loading">
            <span v-if="loading">Logging in...</span>
            <span v-else>Log in</span>
          </button>

          <button class="btn secondary" @click="createAccount">
            Create Nord Account
          </button>
        </div>
      </section>

      <section class="right">
        <img src="/startup-hero.svg" alt="Hero Illustration" />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/public/composables/useAuth'

const router = useRouter()
const { isLoggedIn, isChecking, checkLogin, login } = useAuth()
const loading = ref(false)

onMounted(async () => {
  await checkLogin()
  if (isLoggedIn.value) {
    router.push('/dashboard')
  }
})

function handleLogin() {
  loading.value = true
  login().then(() => {
    if (isLoggedIn.value) {
      router.push('/dashboard')
    } else {
      loading.value = false
      alert('Login failed. Please try again.')
    }
  })
}

function createAccount() {
  window.open('https://nordvpn.com/', '_blank')
}
</script>

<style scoped>
.startup-page {
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

header {
  padding: 20px;
  display: flex;
  align-items: center;
}

.logo {
  height: 32px;
}

.content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
}

.left {
  max-width: 400px;
}

.left h1 {
  font-size: 2.2rem;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn {
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s ease;
}

.primary {
  background: #0057ff;
  color: white;
  border: none;
}

.secondary {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}

.right img {
  height: 300px;
  max-width: 100%;
}
</style>
