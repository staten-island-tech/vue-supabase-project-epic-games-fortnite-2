<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <div v-if="sessionStore.expires > Math.floor(Date.now() / 1000)">
        <button @click="logOut">Log Out</button>
        <router-link to="/worlds">Worlds</router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { supabase } from '../lib/supabaseClient'
import { useSessionStore } from '@/stores/user'
import router from '@/router'

const sessionStore = useSessionStore()

const logOut = async function () {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    sessionStore.$reset()
    router.push('/')
  } catch (error) {
    console.log(error)
    router.push('/')
  }
}
</script>

<style scoped></style>
