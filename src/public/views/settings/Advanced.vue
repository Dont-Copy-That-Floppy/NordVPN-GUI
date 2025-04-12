<template>
  <div class="advanced-settings">
    <h2>Advanced</h2>

    <!-- Custom DNS -->
    <div class="setting-row">
      <div class="label">
        <strong>Custom DNS</strong><br />
        <a href="#" @click.prevent="showDNSInput = !showDNSInput">Set a DNS server address</a>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="hasDNS">
        <span class="slider"></span>
      </label>
    </div>

    <div v-if="showDNSInput" class="dns-input">
      <input v-model="dnsValue" placeholder="e.g. 1.1.1.1 8.8.8.8" />
      <button @click="applyDNS">Apply</button>
    </div>

    <!-- Obfuscate -->
    <div class="setting-row">
      <div class="label">Obfuscated servers (OpenVPN)</div>
      <label class="switch">
        <input type="checkbox" v-model="obfuscate" @change="toggle('obfuscate', obfuscate)">
        <span class="slider"></span>
      </label>
    </div>

    <!-- LAN Discovery -->
    <div class="setting-row">
      <div class="label">
        Invisibility on LAN
        <p class="subtext">Keeps your device invisible on a local network...</p>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="lan" @change="toggle('lan-discovery', !lan)">
        <span class="slider"></span>
      </label>
    </div>

    <!-- Remote Access -->
    <div class="setting-row">
      <div class="label">Allow remote access while connected to VPN</div>
      <label class="switch">
        <input type="checkbox" v-model="remoteAccess" @change="saveRemoteAccess">
        <span class="slider"></span>
      </label>
    </div>

    <!-- Analytics -->
    <div class="setting-row">
      <div class="label">
        Help us improve
        <p class="subtext">Help us make NordVPN better by sending anonymous data...</p>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="analytics" @change="toggle('analytics', analytics)">
        <span class="slider"></span>
      </label>
    </div>

    <!-- Diagnostics -->
    <div class="setting-row">
      <div class="label">
        Diagnostics<br />
        <a href="#" @click.prevent="runDiagnostics">Run diagnostics tool</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const obfuscate = ref(false)
const lan = ref(false)
const analytics = ref(false)
const remoteAccess = ref(false)
const showDNSInput = ref(false)
const dnsValue = ref('')
const hasDNS = ref(false)

onMounted(async () => {
  const out = await window.nordvpnAPI.runCommand('nordvpn settings')
  const map = {}
  out.split('\n').forEach(line => {
    const [key, val] = line.split(':').map(s => s.trim().toLowerCase())
    map[key] = val
  })

  obfuscate.value = map['obfuscate'] === 'enabled'
  lan.value = map['lan discovery'] === 'enabled'
  analytics.value = map['analytics'] === 'enabled'
  dnsValue.value = map['dns'] || ''
  hasDNS.value = dnsValue.value.length > 0
  remoteAccess.value = localStorage.getItem('remoteAccess') === 'true'
})

function toggle(setting, state) {
  const value = state ? 'on' : 'off'
  window.nordvpnAPI.runCommand(`nordvpn set ${setting} ${value}`)
}

function applyDNS() {
  if (dnsValue.value.trim()) {
    window.nordvpnAPI.runCommand(`nordvpn set dns ${dnsValue.value.trim()}`)
    hasDNS.value = true
  }
}

function saveRemoteAccess() {
  localStorage.setItem('remoteAccess', remoteAccess.value)
}

function runDiagnostics() {
  window.nordvpnAPI.runCommand('nordvpn diagnostics')
  alert('Diagnostics started (see console for output)')
}
</script>

<style scoped>
.advanced-settings {
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

.label a {
  font-size: 13px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.subtext {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  max-width: 380px;
}

.dns-input {
  margin: -10px 0 10px 0;
  display: flex;
  gap: 10px;
  align-items: center;
}
.dns-input input {
  padding: 6px 10px;
  flex: 1;
}
.dns-input button {
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
