<template>
  <div class="body" v-if="sessionStore.expires > Math.floor(Date.now() / 1000)">
    <button @click="toggleCreateScreen()">create a world</button>
    <CreateWorld v-show="showCreate" @close="toggleCreateScreen" />
    <h1>{{ worlds }}</h1>
    <div v-if="hasWorlds === true">
      <div class="world-container" v-for="world in worlds.worlds_own" :key="world">
        <h1 @click="enterWorld(world)">
          {{ world }}
        </h1>
        <button @click="deleteWorld(world)">delet world</button>
      </div>
    </div>
    <h1 v-else>no worlds :(</h1>
  </div>
  <div v-else>
    Please <router-link to="/login">log in</router-link> first to access your worlds!
  </div>
</template>

<style scoped>
.body {
  margin-top: 100px;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useSessionStore } from '@/stores/user'
import CreateWorld from '@/components/CreateWorld.vue'
import type { UUID } from 'crypto'
import router from '@/router'

const sessionStore = useSessionStore()
const showCreate = ref(false)
const worlds = ref({})
let hasWorlds = false

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const listenToDBChanges = supabase //listen for changes in db, update worlds
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: '*'
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

async function enterWorld(world: UUID) {
  router.push({
    name: 'world',
    params: { id: world }
  })
  sessionStore.currentWorldID = world
}

async function getWorlds() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('worlds_own')
      .eq('id', sessionStore.userID) //get worlds
    if (error) throw error
    worlds.value = data
    if (worlds.value.worlds_own[0] !== undefined) {
      hasWorlds = true
    } else {
      hasWorlds = false
    }
    console.log(worlds)
  } catch (error) {
    console.log(error)
  }
}

async function deleteWorld(world: UUID) {
  console.log(`deleting world ${world}`)
  try {
    const { error } = await supabase.from('worlds').delete().eq('id', world)
    if (error) throw error
  } catch (error) {
    console.log('Unable to delete world:')
    console.log(error)
  }
  try {
    const { error } = await supabase.rpc('delete', {
      world_id: world,
      user_id: sessionStore.userID
    })
    if (error) throw error
  } catch (error) {
    console.log('Unable to delete world from user db:')
    console.log(error)
  }
}
</script>
