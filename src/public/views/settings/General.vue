<template>
  <div class="general-settings">
    <h2>General Settings</h2>

    <div class="setting-row">
      <span>Launch at startup</span>
      <label class="switch">
        <input type="checkbox" v-model="autostart" @change="toggle('autostart', autostart)">
        <span class="slider"></span>
      </label>
    </div>

    <div class="setting-row">
      <span>Launch the app minimized</span>
      <label class="switch">
        <input type="checkbox" v-model="minimized" @change="saveMinimized">
        <span class="slider"></span>
      </label>
    </div>

    <div class="setting-row">
      <span>Show VPN connection status notifications</span>
      <label class="switch">
        <input type="checkbox" v-model="notify" @change="toggle('notify', notify)">
        <span class="slider"></span>
      </label>
    </div>

    <div class="setting-row">
      <span>CyberSec: block ads and malicious websites</span>
      <label class="switch">
        <input type="checkbox" v-model="cybersec" @change="toggle('threatprotectionlite', cybersec)">
        <span class="slider"></span>
      </label>
    </div>

    <div class="setting-row">
      <span>Language</span>
      <select v-model="language" @change="setLanguage">
        <option>English</option>
        <option>Spanish</option>
        <option>German</option>
        <option>French</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const autostart = ref(false)
const minimized = ref(false)
const notify = ref(false)
const cybersec = ref(false)
const language = ref('English')

function toggle(setting, value) {
  const state = value ? 'on' : 'off'
  window.nordvpnAPI.runCommand(`nordvpn set ${setting} ${state}`)
}

function saveMinimized() {
  localStorage.setItem('launchMinimized', minimized.value)
}

function setLanguage() {
  console.log('Language set to:', language.value)
  // You can store this for UI only — not tied to CLI
  localStorage.setItem('language', language.value)
}

onMounted(async () => {
  const out = await window.nordvpnAPI.runCommand('nordvpn settings')
  const map = {}
  out.split('\n').forEach(line => {
    const [key, val] = line.split(':').map(s => s.trim().toLowerCase())
    map[key] = val
  })

  notify.value = map['notify'] === 'enabled'
  cybersec.value = map['threat protection lite'] === 'enabled'

  // Simulate launch + language from localStorage
  minimized.value = localStorage.getItem('launchMinimized') === 'true'
  language.value = localStorage.getItem('language') || 'English'

  // No native CLI support for startup, so keep as is
  autostart.value = true // or read from backend file if persisted
})
</script>

<style scoped>
.general-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 14px 18px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
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
