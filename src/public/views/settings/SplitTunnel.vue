<template>
  <div class="split-settings">
    <h2>Split tunneling</h2>
    <p>Choose which apps use VPN-protected connections.</p>

    <!-- Master toggle -->
    <div class="setting-row">
      <span>Split Tunneling</span>
      <label class="switch">
        <input type="checkbox" v-model="enabled" @change="saveState">
        <span class="slider"></span>
      </label>
    </div>

    <div v-if="enabled" class="radio-options">
      <label>
        <input type="radio" value="exclude" v-model="mode" @change="saveState" />
        Disable VPN for selected apps
      </label>
      <label>
        <input type="radio" value="include" v-model="mode" @change="saveState" />
        Enable VPN for selected apps only
      </label>
    </div>

    <div v-if="enabled" class="app-box">
      <div v-if="apps.length === 0" class="empty">
        No apps selected. All apps use a secure VPN connection.
      </div>
      <ul v-else>
        <li v-for="(app, i) in apps" :key="i">
          {{ app }}
          <button @click="removeApp(i)">×</button>
        </li>
      </ul>
      <button class="add-btn" @click="addApp">Add apps</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const enabled = ref(false)
const mode = ref('exclude')
const apps = ref([])

onMounted(() => {
  enabled.value = localStorage.getItem('split_enabled') === 'true'
  mode.value = localStorage.getItem('split_mode') || 'exclude'
  apps.value = JSON.parse(localStorage.getItem('split_apps') || '[]')
})

function saveState() {
  localStorage.setItem('split_enabled', enabled.value)
  localStorage.setItem('split_mode', mode.value)
  localStorage.setItem('split_apps', JSON.stringify(apps.value))
}

function addApp() {
  const name = prompt("Enter app name or path:")
  if (name) {
    apps.value.push(name)
    saveState()
  }
}

function removeApp(index) {
  apps.value.splice(index, 1)
  saveState()
}
</script>

<style scoped>
.split-settings {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 8px;
}

.app-box {
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  padding: 14px;
}
.empty {
  font-style: italic;
  color: #777;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
li button {
  background: red;
  color: white;
  border: none;
  padding: 0 6px;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  margin-top: 10px;
  padding: 6px 12px;
  background: #00b2ff;
  border: none;
  color: white;
  border-radius: 4px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 22px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 22px;
  transition: 0.3s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}
input:checked + .slider {
  background-color: #00b2ff;
}
input:checked + .slider:before {
  transform: translateX(18px);
}
</style>
