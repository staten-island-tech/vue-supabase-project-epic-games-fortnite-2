<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import NavBar from './components/NavBar.vue'
import { defineStore } from 'pinia';

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})

export const useSessionStore = defineStore('session', {
  
})

</script>

<template>
<NavBar/>

<router-view :session="session"></router-view>
</template>