<template>
  <div class="refer-settings">
    <h2>Refer a Friend</h2>
    <p>Invite friends to NordVPN and earn free months of service when they subscribe.</p>

    <div class="section">
      <p><strong>Your referral link:</strong></p>
      <div class="referral-box">
        <input type="text" readonly :value="referralLink" />
        <button @click="copyLink">Copy</button>
      </div>
    </div>

    <div class="section">
      <p><strong>You’ve referred:</strong> {{ referrals }} friend(s)</p>
      <p><em>Each friend who subscribes gives you 1 free month.</em></p>
    </div>

    <div class="section">
      <p><strong>Share your link:</strong></p>
      <div class="share-buttons">
        <button @click="share('email')">📧 Email</button>
        <button @click="share('twitter')">🐦 Twitter</button>
        <button @click="share('facebook')">📘 Facebook</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const referralLink = ref('https://nordvpn.com/ref?code=YOURCODE123')
const referrals = ref(3)

function copyLink() {
  navigator.clipboard.writeText(referralLink.value)
  alert('Referral link copied to clipboard!')
}

function share(platform) {
  alert(`Simulated sharing via ${platform}.`)
}
</script>

<style scoped>
.refer-settings {
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

.referral-box {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}
.referral-box input {
  flex: 1;
  padding: 6px 10px;
}
.referral-box button {
  padding: 6px 12px;
  background: #00b2ff;
  color: white;
  border: none;
  border-radius: 4px;
}

.share-buttons {
  display: flex;
  gap: 10px;
}
.share-buttons button {
  padding: 6px 10px;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
</style>
