<template>
  <div class="backdrop">
    <div class="modal">
      <h2>Create a World</h2>
      <button class="btn-close" @click="$emit('close')">X</button>
      <form @submit.prevent="createWorld(name)">
        <input type="text" name="input" id="input" v-model="name" />
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useSessionStore } from '@/stores/user'
import type { data, boardDisplay, placed } from 'index.d.ts'

const sessionStore = useSessionStore()
const name = ref('')
const emits = defineEmits(['close'])
const boardConfig: boardDisplay = {
  boardSize: 25,
  tileSize: 25
}
let placedStuff: placed[] = []

async function createWorld(name: string) {
  let uuid = crypto.randomUUID()
  let worldData: data = {
    worldsize: { boardConfig },
    placedBLocks: [placedStuff]
  }
  console.log(worldData)
  try {
    const { error } = await supabase
      .from('worlds')
      .insert({ name: name, id: uuid, data: worldData })
    if (error) throw error
  } catch (error) {
    console.log(error)
  }
  try {
    const { error } = await supabase.rpc('append_world_uuid_to_user', {
      id: uuid,
      userid: sessionStore.userID
    })
    if (error) throw error
    emits('close')
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.0001);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: rgba(173, 173, 173, 0.9);
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50vw;
  height: 80vh;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
  background: transparent;
}
</style>
