<template>
  <div 
  class="body"
  v-if="sessionStore.expires > Math.floor(Date.now() / 1000)">
    <button @click="toggleCreateScreen()" class="buttonblock">create a world</button>
    <CreateWorld v-show="showCreate" @close="toggleCreateScreen" />
    <button class="buttonblock" @click="getWorlds()">Load worlds</button>
    <!-- <h1>
    {{ namedWorlds }}</h1> -->
    <div v-if="hasWorlds === true">
      <h3>Click to enter world: </h3>
      <div class="world-container" v-for="world in namedWorlds" :key="world">
        <h1 @click="enterWorld(world.worldID)">
          Name: {{ world.worldName }}
        </h1>
        <button @click="deleteWorld(world.worldID)" class="buttonblock">delete world</button>
      </div>
    </div>
    <h1 v-else>no worlds </h1>
  </div>
  <div v-else>
    Please <router-link to="/login">log in</router-link> first to access your worlds!
  </div>
</template>

<style scoped>
.body {
  margin-top: 100px;
}

.enter-world {
  display: inline;
  margin: auto auto;
}

.world-container {
  display: flex;
  align-items: center;
  justify-content: left;
}

h1 {
  display: inline;
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
const worlds = ref(new Array())
const namedWorlds = ref(new Array())
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
    if (error) throw error;
    worlds.value = data[0].worlds_own
    
    namedWorlds.value = []
    worlds.value.forEach(async (world: any) => {
      let name = await worldName(world)
      namedWorlds.value.push({ worldID: world, worldName: name![0].name })
      hasWorlds = true
    })
    if (worlds.value.length > 1) {
      hasWorlds = true
    } else {
      hasWorlds = false
    }
    console.log(worlds)
  } catch (error) {
    console.log(error)
  }
}

async function worldName(id: UUID) {
  try {
    const { data, error } = await supabase.from('worlds').select('name').eq('id', id)
    if (error) throw error
    return data
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

<style scoped>
.body {
  margin-top: 80px;

  .buttonblock {
  background-color: #FFFFFF;
  border: 1px solid rgb(209,213,219);
  border-radius: .5rem;
  box-sizing: border-box;
  color: hsla(160, 100%, 37%, 1);
  line-height: 1.25rem;
  text-align: center;
  text-decoration: none #d1dbd6 solid;
  text-decoration-thickness: auto;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.buttonblock:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

.buttonblock:focus {
  outline: 1px solid transparent;
  outline-offset: 1px;
}

.buttonblock:focus-visible {
  box-shadow: none;
}
}</style>
