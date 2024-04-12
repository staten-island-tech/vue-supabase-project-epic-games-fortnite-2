<template>
  <div>
    <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
        <input type="password" required placeholder="password" v-model="password">
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabaseClient'

let email: string
let pass: string

const signUp = async function (email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })
}

</script>

<style scoped></style>
