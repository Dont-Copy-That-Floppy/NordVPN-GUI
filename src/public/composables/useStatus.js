import { ref, onMounted, onUnmounted } from 'vue'

const isConnected = ref(false)
const status = ref({})
let interval = null

export function useStatus(pollInterval = 5000) {
  async function fetchStatus() {
    try {
      const output = await window.nordvpnAPI.getStatus()
      const parsed = parseStatus(output)
      isConnected.value = parsed.Status === 'Connected'
      status.value = parsed
    } catch (err) {
      isConnected.value = false
      status.value = {}
    }
  }

  function parseStatus(output) {
    const result = {}
    output.split('\n').forEach(line => {
      const [key, val] = line.split(':').map(x => x.trim())
      if (key && val) result[key] = val
    })
    return result
  }

  onMounted(() => {
    fetchStatus()
    interval = setInterval(fetchStatus, pollInterval)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  return {
    isConnected,
    status,
    refreshStatus: fetchStatus
  }
}
