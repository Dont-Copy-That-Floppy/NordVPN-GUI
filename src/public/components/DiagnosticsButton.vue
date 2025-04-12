<template>
  <div class="diagnostics-wrapper">
    <button class="diagnostics-button" @click="runDiagnostics">
      Run Diagnostics
    </button>

    <pre v-if="output" class="diagnostics-output">{{ output }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const output = ref('')

async function runDiagnostics() {
  const result = await window.nordvpnAPI.runCommand('nordvpn diagnostics')
  output.value = result.trim()
}
</script>

<style scoped>
.diagnostics-wrapper {
  margin-top: 10px;
  width: 100%;
}

.diagnostics-button {
  background: #edf2f7;
  color: #333;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
}

.diagnostics-button:hover {
  background: #e2e8f0;
}

.diagnostics-output {
  background: #111;
  color: #0f0;
  padding: 10px;
  margin-top: 8px;
  font-size: 12px;
  height: 150px;
  overflow-y: auto;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>
