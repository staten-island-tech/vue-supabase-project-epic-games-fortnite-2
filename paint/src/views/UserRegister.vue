<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabaseClient.ts'
const { data, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
</script>

<style scoped>

</style>