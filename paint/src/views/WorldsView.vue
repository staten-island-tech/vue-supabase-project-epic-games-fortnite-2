<template>
    <div>
        u made it work, gj!
    </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import { supabase } from '../lib/supabaseClient'

const props = defineProps(['session'])
const { session } = toRefs(props)
</script>

<style scoped>

</style>