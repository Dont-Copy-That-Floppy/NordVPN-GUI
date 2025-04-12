<template>
  <button
    class="disconnect-button"
    @click="handleDisconnect"
    v-if="isConnected"
  >
    Disconnect
  </button>
</template>

<script setup>
import { useStatus } from '@/public/composables/useStatus'

const { isConnected, refreshStatus } = useStatus()

function handleDisconnect() {
  window.nordvpnAPI.runCommand('nordvpn disconnect').then(() => {
    refreshStatus()
  })
}
</script>

<style scoped>
.disconnect-button {
  background: #e53e3e;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s ease;
  margin-top: 10px;
  width: 100%;
}

.disconnect-button:hover {
  background: #c53030;
}
</style>
