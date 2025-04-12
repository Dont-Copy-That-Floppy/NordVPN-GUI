<template>
  <div class="quick-connect">
    <p class="status" :class="{ connected: isConnected }">
      {{ isConnected ? 'PROTECTED' : 'UNPROTECTED' }}
    </p>
    <p>
      {{ isConnected
        ? `Connected to ${status.Country || status.Server}`
        : 'Pick a country or use quick connect' }}
    </p>
    <button @click="handleConnect">Quick Connect</button>
  </div>
</template>

<script setup>
import { useStatus } from '@/public/composables/useStatus'

const { isConnected, status } = useStatus()

function handleConnect() {
  window.nordvpnAPI.runCommand('nordvpn connect')
}
</script>

<style scoped>
.quick-connect {
  background: white;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-width: 220px;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.status {
  font-weight: bold;
  margin-bottom: 5px;
  color: red;
}

.status.connected {
  color: green;
}

button {
  background: #0057ff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
}
</style>
