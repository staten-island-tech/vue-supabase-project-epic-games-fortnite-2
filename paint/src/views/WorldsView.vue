<template>
  <div v-if="sessionStore.expires > Math.floor(Date.now() / 1000)">worlds</div>
  <div v-else>Please <router-link to="/login">log in</router-link> first to access your worlds!</div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useSessionStore } from '@/stores/user'

const sessionStore = useSessionStore()
</script>

<style scoped></style>
