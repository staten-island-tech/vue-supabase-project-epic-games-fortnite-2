<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient.js'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

const {data, error} = await supabase
.from('')
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>
