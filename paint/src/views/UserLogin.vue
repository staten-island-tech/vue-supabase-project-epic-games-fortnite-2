<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabaseClient';

let email: string
let pass: string

const signIn = async function(email, pass) {
    const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: pass
})
}
</script>

<style scoped>

</style>