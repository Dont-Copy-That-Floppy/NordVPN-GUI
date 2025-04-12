<template>
  <div class="darkweb-settings">
    <h2>Dark Web Monitor</h2>
    <p>Stay alert if your credentials are found in leaked databases.</p>

    <div class="section">
      <div class="setting-row">
        <span>Enable Dark Web Monitoring</span>
        <label class="switch">
          <input type="checkbox" v-model="enabled" @change="saveState" />
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div class="section">
      <p><strong>Status:</strong> {{ status }}</p>
      <p v-if="enabled">
        No breaches found for your account.<br />
        We'll notify you by email if anything changes.
      </p>
      <p v-else style="color: gray;">
        Monitoring disabled. Enable it to stay informed.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const enabled = ref(false)
const status = ref('Monitoring inactive')

onMounted(() => {
  enabled.value = localStorage.getItem('darkweb_enabled') === 'true'
  updateStatus()
})

function saveState() {
  localStorage.setItem('darkweb_enabled', enabled.value)
  updateStatus()
}

function updateStatus() {
  status.value = enabled.value ? 'Monitoring active — all clear' : 'Monitoring inactive'
}
</script>

<style scoped>
.darkweb-settings {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.section {
  background: #fff;
  padding: 14px 18px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
