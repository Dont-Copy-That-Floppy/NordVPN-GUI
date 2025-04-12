<template>
  <div class="settings-layout">
    <SettingsSidebar :routes="menuRoutes" @navigate="current = $event" />
    <div class="settings-content">
      <component :is="current.component" v-if="current" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SettingsSidebar from './components/SettingsSidebar.vue'

// Dynamically import all setting pages except this file & components
const pages = import.meta.glob('./*.vue', { eager: true })

const allRoutes = Object.entries(pages)
  .filter(([path]) => !path.includes('index.vue'))
  .map(([path, module]) => {
    const name = path
      .split('/')
      .pop()
      .replace('.vue', '')
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Format to "Split Tunneling"
    const route = `/settings/${name.toLowerCase().replace(/\s+/g, '-')}`
    return { name, route, component: module.default }
  })

const current = ref(allRoutes[0])

// Expose to sidebar for route list
const menuRoutes = computed(() =>
  allRoutes.map(r => ({
    name: r.name,
    route: r.route,
    alert: r.name === 'My Account'
  }))
)
</script>

<style scoped>
.settings-layout {
  display: flex;
  height: 100vh;
}
.settings-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: #fefefe;
}
</style>
