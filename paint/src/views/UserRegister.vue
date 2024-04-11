<template>
  <div>
    <form @submit.prevent="signUp(email, pass)" class="user-login">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" v-model="email" />
      <label for="pwd">Password:</label>
      <input type="password" id="pwd" name="pwd" v-model="pass" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabaseClient'

const signUp = async function (email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })
}
</script>

<style scoped></style>
