<template>
  <aside class="sidebar">
    <div class="logo">🔒 NordVPN</div>
    <nav>
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-link"
        active-class="active"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="label">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
const navItems = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/servers', label: 'Servers', icon: '🌍' },
  { path: '/meshnet', label: 'Meshnet', icon: '🔗' },
  { path: '/kill-switch', label: 'Kill Switch', icon: '⚔️' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
  { path: '/account', label: 'Account', icon: '👤' },
]
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #0b1f3a;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: #00b2ff;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  color: #fff;
  text-decoration: none;
  margin-bottom: 8px;
  transition: background 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: #00b2ff;
}

.icon {
  margin-right: 10px;
}
</style>
