import UserLogin from '@/views/UserLogin.vue'
import UserRegister from '@/views/UserRegister.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: UserLogin },
    { path: '/register', component: UserRegister }
  ]
})

export default router
