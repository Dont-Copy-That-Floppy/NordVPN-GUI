import { ref } from 'vue'

const accountInfo = ref(null)
const isLoggedIn = ref(false)
const isChecking = ref(true)

export function useAuth() {
  async function checkLogin() {
    isChecking.value = true
    try {
      const output = await window.nordvpnAPI.getAccount()
      isLoggedIn.value = output.toLowerCase().includes('email:')
      accountInfo.value = output.trim()
    } catch (err) {
      isLoggedIn.value = false
      accountInfo.value = null
    } finally {
      isChecking.value = false
    }
  }

  async function login() {
    await window.nordvpnAPI.login()
    await checkLogin()
  }

  async function logout() {
    await window.nordvpnAPI.logout()
    await checkLogin()
  }

  return {
    isLoggedIn,
    isChecking,
    accountInfo,
    checkLogin,
    login,
    logout,
  }
}
