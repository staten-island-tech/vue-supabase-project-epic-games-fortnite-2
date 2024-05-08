<template>
  <div v-if="sessionStore.expires > Math.floor(Date.now() / 1000)">
    <button @click="toggleCreateScreen()">create a world</button>
    <CreateWorld v-show="showCreate" @close="toggleCreateScreen" />
    <h1 v-for="world in worlds[0]" :key="world">{{ world }} <button @click="deleteWorld(world)">delet world</button></h1>
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
import type { UUID } from 'crypto';

const sessionStore = useSessionStore()
const showCreate = ref(false)
const worlds = ref(new Array())

onMounted(async () => {
  if (sessionStore.expires < Math.floor(Date.now() / 1000)) {
    //checks user session expiration
    console.log(sessionStore.expires, Math.floor(Date.now() / 1000))
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      sessionStore.$reset()
    } catch (error) {
      console.log(error)
    }
  } else {
    getWorlds()
  }
  const channelA = supabase //listen for changes in db, update worlds
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles'
      },
      (payload) => {
        console.log(payload)
        getWorlds()
      }
    )
    .subscribe()
    console.log('subbed!')
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

async function getWorlds() {
  try {
    const { data, error } = await supabase.from('profiles').select('worlds_own') //get worlds
    if (error) throw error
    data.forEach((world) => {
      worlds.value.push(world.worlds_own)
    })
    console.log(worlds)
  } catch (error) {
    console.log(error)
  }
}

async function deleteWorld(world: UUID) {
  try {
    const { error } = await supabase.from('worlds').delete().eq('id', world)
    if (error) throw error
  } catch (error) {
    console.log(error)
  }
  try {
    const { error } = await supabase
    .rpc('delete_world_uuid_from_user', {id: uuid, userid: sessionStore.userID})
    if (error) throw error
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
