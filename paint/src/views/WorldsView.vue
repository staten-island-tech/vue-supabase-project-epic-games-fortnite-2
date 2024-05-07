<template>
  <div v-if="sessionStore.expires > Math.floor(Date.now() / 1000)">
    <button @click="toggleCreateScreen()">create a world</button>
    <CreateWorld v-show="showCreate" @close="toggleCreateScreen" />
    <h1 v-for="world in worlds[0]" :key="world">{{ world }}</h1>
  </div>
  <div v-else>
    Please <router-link to="/login">log in</router-link> first to access your worlds!
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useSessionStore } from '@/stores/user'
import CreateWorld from '../components/CreateWorld.vue'

const sessionStore = useSessionStore()
const showCreate = ref(false)
const worlds = ref(new Array)

onMounted(async () => {
  if (sessionStore.expires < Math.floor(Date.now() / 1000)) {
    console.log(sessionStore.expires, Math.floor(Date.now() / 1000))
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      sessionStore.$reset()
    } catch (error) {
      console.log(error)
    }
  }
  else {
  try {
    const { data, error } = await supabase.from('profiles').select('worlds_own')
    if (error) throw error
    data.forEach((world)=> {
      worlds.value.push(world.worlds_own)
    })
  } catch (error) {
    console.log(error)
  }}
})

function toggleCreateScreen() {
  switch (showCreate.value) {
    case true:
      showCreate.value = false
      break
    case false:
      showCreate.value = true
      break
  }
}
</script>

<style scoped></style>
