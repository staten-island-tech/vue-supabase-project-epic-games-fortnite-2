<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import NavBar from './components/NavBar.vue'


</script>

<template>
<NavBar/>
<RouterView/>
</template>