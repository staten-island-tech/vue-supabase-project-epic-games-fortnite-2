<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    <div class="log-out" v-if="sessionStore.expires > Math.floor(Date.now() / 1000)">
      <router-link to="/login" class="router-link-active router-link-exact-active" @click="logOut">Log Out</router-link>
      <router-link to="/worlds">Worlds</router-link>
    </div>
    <h1 class="title">Minecraft: Wish dot com Edition</h1>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import { useSessionStore } from '@/stores/user'

const sessionStore = useSessionStore()

const logOut = async function () {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    sessionStore.$reset()
  } catch (error) {
    console.log(error)
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

.title {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.log-out {
  margin-left: 0px;
}
</style>
