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
import { supabase } from '@/lib/supabaseClient'
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

<style scoped>
@import '../assets/base.css';

nav {
  background-color: var(--color-background-mute);
  color: var(--color-heading);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 25px 0 black;
}

nav * {
  display: inline;
  margin-left: 20px;
}
</style>
