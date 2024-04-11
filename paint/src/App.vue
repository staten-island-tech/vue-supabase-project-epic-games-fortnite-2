<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import { routerView } from 'vue-router'
import NavBar from './components/NavBar.vue'

const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('Users').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
<NavBar/>

<router-view></router-view>
</template>