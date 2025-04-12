<template>
  <div class="account-settings">
    <h2>My Account</h2>

    <!-- Banner -->
    <div class="alert-banner">
      <strong>⚠️ Turn on subscription auto-renewal</strong>
      <p>Enjoy the convenience of seamless NordVPN protection.</p>
      <a href="https://my.nordaccount.com/billing" target="_blank">Turn on auto-renewal</a>
    </div>

    <!-- Account Info -->
    <div class="section">
      <p><strong>Account created:</strong> {{ created }}</p>
      <a href="https://my.nordaccount.com/security" target="_blank">Change password</a>
    </div>

    <!-- MFA -->
    <div class="section">
      <p><strong>Multi-factor authentication</strong><br>
      Add an extra security layer to your account.</p>
      <a href="https://my.nordaccount.com/security" target="_blank">Set up</a>
    </div>

    <!-- Subscription -->
    <div class="section">
      <p><strong>Subscription</strong><br>
      Valid until: {{ subscription }}</p>
    </div>

    <!-- Install Link -->
    <div class="section">
      <p><strong>Get NordVPN for all your devices</strong><br>
      Open the email on your device and click install button.</p>
      <div class="send-link">
        <input v-model="email" placeholder="you@example.com" />
        <button @click="sendInstallLink">Send Link</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const created = ref('Loading...')
const subscription = ref('Loading...')
const email = ref('')

onMounted(async () => {
  const output = await window.nordvpnAPI.runCommand('nordvpn account')
  const lines = output.split('\n')
  lines.forEach(line => {
    const [key, value] = line.split(':').map(x => x.trim())
    if (key === 'Created') created.value = value
    if (key === 'Expires') subscription.value = value
  })
})

function sendInstallLink() {
  alert(`Link sent to: ${email.value}`)
}
</script>

<style scoped>
.account-settings {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.alert-banner {
  background: #fff7e6;
  border-left: 5px solid #ffa500;
  padding: 12px 16px;
  border-radius: 6px;
}
.alert-banner a {
  color: #007bff;
  text-decoration: underline;
}

.section {
  background: #fff;
  padding: 14px 18px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.send-link {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.send-link input {
  flex: 1;
  padding: 6px 10px;
}
.send-link button {
  padding: 6px 14px;
  background: #00b2ff;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
