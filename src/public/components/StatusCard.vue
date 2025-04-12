<template>
  <div class="status-card" v-if="isConnected">
    <h4>Connection Info</h4>
    <ul>
      <li><strong>Server:</strong> {{ status.Server || 'N/A' }}</li>
      <li><strong>IP:</strong> {{ status['Your new IP'] || 'N/A' }}</li>
      <li><strong>Country:</strong> {{ status.Country || 'N/A' }}</li>
      <li><strong>Technology:</strong> {{ status.Technology || 'N/A' }}</li>
      <li><strong>Protocol:</strong> {{ status.Protocol || 'N/A' }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useStatus } from '@/public/composables/useStatus'

const { isConnected, status } = useStatus()
</script>

<style scoped>
.status-card {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-size: 13px;
  max-width: 250px;
}

.status-card h4 {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
}

.status-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.status-card li {
  margin: 4px 0;
}
</style>
