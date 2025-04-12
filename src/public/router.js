import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuth } from '@/public/composables/useAuth'

import Startup from './views/Startup.vue'
import Dashboard from './views/Dashboard.vue'
import SettingsLayout from './views/settings/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Root',
      beforeEnter: async (to, from, next) => {
        const { checkLogin, isLoggedIn } = useAuth()
        await checkLogin()
        if (isLoggedIn.value) {
          next('/dashboard')
        } else {
          next('/startup')
        }
      }
    },
    {
      path: '/startup',
      name: 'Startup',
      component: Startup
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: async (to, from, next) => {
        const { checkLogin, isLoggedIn } = useAuth()
        await checkLogin()
        isLoggedIn.value ? next() : next('/startup')
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsLayout,
      beforeEnter: async (to, from, next) => {
        const { checkLogin, isLoggedIn } = useAuth()
        await checkLogin()
        isLoggedIn.value ? next() : next('/startup')
      },
      children: [
        // Optionally auto-generate or define subroutes
      ]
    }
  ]
})

export default router
