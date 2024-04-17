import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'
import UserLogin from '@/views/UserLogin.vue'
import UserRegister from '@/views/UserRegister.vue'
import WorldsView from '@/views/WorldsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', name: 'login', component: UserLogin },
    { path: '/register', name: 'register', component: UserRegister },
    { path: '/worlds', name:'worlds', component: WorldsView }
  ]
})

export default router
