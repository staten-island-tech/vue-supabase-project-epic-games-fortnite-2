<template>
  <div>
    <form class="row flex-center flex" @submit.prevent="signIn(email, pass)">
      <div class="col-6 form-widget">
        <h1 class="header">Supabase + Vue 3</h1>
        <p class="description">Log In</p>
        <div>
          <input
            class="inputField"
            required
            type="email"
            placeholder="Your email"
            v-model="email"
          />
          <input type="password" required placeholder="password" v-model="pass" />
        </div>
        <div>
          <input type="submit" class="button block" :value="'Log In'" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { supabase } from '../lib/supabaseClient'

let email: string
let pass: string

const signIn = async function (email: string, pass: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass
    })
    router.push({path: '/worlds'})
    if (error) throw error
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
