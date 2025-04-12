<template>
  <div class="killswitch-settings">
    <h2>Kill Switch</h2>

    <!-- Internet Kill Switch -->
    <div class="setting-row">
      <div class="label">
        Internet Kill Switch
        <p class="subtext">
          You will be able to access the internet only when connected to VPN.
        </p>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="internetKill" @change="toggleInternetKill">
        <span class="slider"></span>
      </label>
    </div>

    <!-- App Kill Switch -->
    <div class="setting-row">
      <div class="label">
        App Kill Switch
        <p class="subtext">
          Applications to kill if a VPN connection unexpectedly drops.
          <br /><em>(UI-only — local setting)</em>
        </p>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="appKill" @change="saveAppKill">
        <span class="slider"></span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const internetKill = ref(false)
const appKill = ref(false)

onMounted(async () => {
  const out = await window.nordvpnAPI.runCommand('nordvpn settings')
  const map = {}
  out.split('\n').forEach(line => {
    const [k, v] = line.split(':').map(x => x.trim().toLowerCase())
    map[k] = v
  })

  internetKill.value = map['kill switch'] === 'enabled'
  appKill.value = localStorage.getItem('appKillSwitch') === 'true'
})

function toggleInternetKill() {
  const cmd = `nordvpn set killswitch ${internetKill.value ? 'on' : 'off'}`
  window.nordvpnAPI.runCommand(cmd)
}

function saveAppKill() {
  localStorage.setItem('appKillSwitch', appKill.value)
}
</script>

<style scoped>
.killswitch-settings {
  display: flex;
  flex-direction: column;
  gap: 22px;
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

.label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.subtext {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
  max-width: 440px;
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
