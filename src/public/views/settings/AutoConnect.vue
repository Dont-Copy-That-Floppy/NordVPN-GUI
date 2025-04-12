<template>
  <div class="autoconnect-settings">
    <h2>Auto-connect</h2>

    <div class="setting-row">
      <span>Always when the app launches</span>
      <label class="switch">
        <input type="checkbox" v-model="autoLaunch" @change="applyAutoLaunch">
        <span class="slider"></span>
      </label>
    </div>

    <div class="setting-row">
      <span>Auto-connect on Wi-Fi:</span>
      <select v-model="wifiPolicy" @change="saveWiFiPolicy">
        <option value="off">Off</option>
        <option value="all">All networks</option>
        <option value="trusted">Trusted only</option>
      </select>
    </div>

    <hr>

    <div class="setting-row">
      <span>Choose a VPN protocol and server automatically</span>
      <label class="switch">
        <input type="checkbox" v-model="autoProtocol" @change="setAutoProtocol">
        <span class="slider"></span>
      </label>
    </div>

    <div class="setting-row">
      <span>VPN protocol</span>
      <select v-model="protocol" @change="setProtocol">
        <option value="udp">OpenVPN (UDP)</option>
        <option value="tcp">OpenVPN (TCP)</option>
        <option value="nordlynx">NordLynx</option>
      </select>
    </div>

    <div class="setting-row">
      <span>Auto-connect to</span>
      <select v-model="autoLocation" @change="setAutoLocation">
        <option value="">Recommended server</option>
        <option value="us">United States</option>
        <option value="canada">Canada</option>
        <option value="germany">Germany</option>
      </select>
    </div>

    <hr>

    <div class="trusted-networks">
      <h3>Trusted Wi-Fi networks</h3>
      <p>You won’t be auto-connected to VPN on trusted Wi-Fi networks.</p>
      <p style="font-style: italic; color: gray;">(Coming soon — not supported in CLI)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const autoLaunch = ref(false)
const wifiPolicy = ref('off')
const autoProtocol = ref(false)
const protocol = ref('udp')
const autoLocation = ref('')

onMounted(async () => {
  const out = await window.nordvpnAPI.runCommand('nordvpn settings')
  const map = {}
  out.split('\n').forEach(line => {
    const [key, val] = line.split(':').map(s => s.trim().toLowerCase())
    map[key] = val
  })

  autoProtocol.value = map['technology'] === 'nordlynx'
  protocol.value = map['protocol'] || 'udp'

  // Simulated values
  wifiPolicy.value = localStorage.getItem('wifiPolicy') || 'off'
  autoLaunch.value = localStorage.getItem('vpnAutoLaunch') === 'true'
  autoLocation.value = localStorage.getItem('vpnAutoLocation') || ''
})

function applyAutoLaunch() {
  // No CLI mapping — store locally
  localStorage.setItem('vpnAutoLaunch', autoLaunch.value)
}

function saveWiFiPolicy() {
  localStorage.setItem('wifiPolicy', wifiPolicy.value)
}

function setAutoProtocol() {
  const tech = autoProtocol.value ? 'nordlynx' : 'openvpn'
  window.nordvpnAPI.runCommand(`nordvpn set technology ${tech}`)
}

function setProtocol() {
  window.nordvpnAPI.runCommand(`nordvpn set protocol ${protocol.value}`)
}

function setAutoLocation() {
  const cmd = autoLocation.value
    ? `nordvpn set autoconnect on ${autoLocation.value}`
    : 'nordvpn set autoconnect on'
  window.nordvpnAPI.runCommand(cmd)
  localStorage.setItem('vpnAutoLocation', autoLocation.value)
}
</script>

<style scoped>
.autoconnect-settings {
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

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
}

select {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
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
