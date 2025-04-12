<template>
  <button class="refresh-button" @click="refreshStatus">
    Refresh Status
  </button>
</template>

<script setup>
import { useStatus } from '@/public/composables/useStatus'

const { refreshStatus } = useStatus()
</script>

<style scoped>
.refresh-button {
  background: #f1f1f1;
  color: #333;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-weight: 500;
  transition: background 0.2s ease;
  margin-top: 10px;
}

.refresh-button:hover {
  background: #e2e2e2;
}
</style>
