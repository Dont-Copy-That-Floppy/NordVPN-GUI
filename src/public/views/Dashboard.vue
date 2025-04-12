<template>
  <div class="dashboard">
    <!-- Sidebar Icons -->
    <aside class="sidebar-icons">
      <button title="Dashboard"><i>🌐</i></button>
      <button title="Meshnet"><i>🔗</i></button>
      <button title="Settings" @click="goSettings"><i>⚙️</i></button>
    </aside>

    <!-- Left Panel -->
    <section class="left-panel">
      <h2>VPN</h2>

      <input
        type="text"
        class="search"
        placeholder="Search here..."
        v-model="search"
      />

      <div class="section">
        <h3>Specialty servers</h3>
        <ul>
          <li @click="connect('dedicatedip')">Dedicated IP</li>
          <li @click="connect('doublevpn')">Double VPN</li>
          <li @click="connect('onionovervpn')">Onion Over VPN</li>
          <li @click="connect('p2p')">P2P</li>
        </ul>
      </div>

      <div class="section">
        <h3>All countries</h3>
        <ul class="country-list">
          <li
            v-for="country in filteredCountries"
            :key="country"
            class="country-row"
          >
            <span @click="connect(country)">{{ country }}</span>
            <button @click="toggleExpanded(country)">⋯</button>

            <div v-if="expanded === country" class="expand-box">
              <label>
                City:
                <select v-model="selectedCity">
                  <option value="Fastest">Fastest</option>
                  <option
                    v-for="city in cities"
                    :key="city"
                    :value="city"
                  >
                    {{ city }}
                  </option>
                </select>
              </label>

              <label>
                Server:
                <select v-model="selectedServer" disabled>
                  <option value="Fastest">Fastest</option>
                </select>
              </label>

              <button class="connect-btn" @click="connectCity(country)">Connect</button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Right Panel -->
    <section class="map-panel">
      <QuickConnect />
      <DisconnectButton />
      <RefreshStatusButton />
      <DiagnosticsButton />
      <StatusCard />
      <img src="/map.png" alt="Map" class="map" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Custom dashboard components
import QuickConnect from '@/public/components/QuickConnect.vue'
import DisconnectButton from '@/public/components/DisconnectButton.vue'
import RefreshStatusButton from '@/public/components/RefreshStatusButton.vue'
import DiagnosticsButton from '@/public/components/DiagnosticsButton.vue'
import StatusCard from '@/public/components/StatusCard.vue'

const router = useRouter()

const search = ref('')
const expanded = ref(null)
const selectedCity = ref('Fastest')
const selectedServer = ref('Fastest')
const cities = ref([])

const countries = [
  'Albania', 'Argentina', 'Australia', 'Austria', 'Belgium',
  'Brazil', 'Canada', 'Cyprus', 'Czech Republic', 'Denmark',
  'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece'
]

const filteredCountries = computed(() =>
  countries.filter(c => c.toLowerCase().includes(search.value.toLowerCase()))
)

function goSettings() {
  router.push('/settings')
}

function connect(target) {
  const cmd = target ? `nordvpn connect "${target}"` : `nordvpn connect`
  window.nordvpnAPI.runCommand(cmd)
}

function toggleExpanded(country) {
  if (expanded.value === country) {
    expanded.value = null
  } else {
    expanded.value = country
    selectedCity.value = 'Fastest'
    selectedServer.value = 'Fastest'
    cities.value = []

    window.nordvpnAPI.runCommand(`nordvpn cities "${country}"`)
      .then(out => {
        cities.value = out.trim().split('\n').filter(Boolean)
      })
  }
}

function connectCity(country) {
  const city = selectedCity.value
  const cmd = city === 'Fastest'
    ? `nordvpn connect "${country}"`
    : `nordvpn connect "${city}"`

  window.nordvpnAPI.runCommand(cmd)
  expanded.value = null
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.sidebar-icons {
  width: 60px;
  background: #e9eef3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 20px;
  border-right: 1px solid #ccc;
}

.sidebar-icons button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
}

.left-panel {
  width: 300px;
  padding: 20px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}

.search {
  width: 100%;
  padding: 10px;
  margin: 10px 0 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.section {
  margin-bottom: 30px;
}

.section h3 {
  margin-bottom: 10px;
  font-size: 16px;
}

.section ul {
  list-style: none;
  padding: 0;
}

.country-list {
  max-height: 300px;
  overflow-y: auto;
}

.country-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 5px 0;
}

.country-row button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
}

.expand-box {
  position: absolute;
  top: 25px;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  width: 220px;
  z-index: 10;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.expand-box label {
  display: block;
  margin-bottom: 10px;
  font-size: 13px;
}

.connect-btn {
  background: #0057ff;
  color: white;
  padding: 6px 12px;
  border: none;
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
}

.map-panel {
  flex: 1;
  position: relative;
  background: #f6faff;
}

.map {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
</style>
