<template>
  <div class="body">
    <form class="row flex-center flex" @submit.prevent="signUp(email, pass)">
      <div class="col-6 form-widget">
        <h1 class="micro-5-charted-regular" id="head">register</h1>
        <div>
          <input
            class="inputField"
            required
            type="email"
            placeholder="Your email"
            v-model="email"
          />
          <input type="password" required placeholder="password" v-model="pass" />
          <p>make sure your password has at least 8 characters</p>
        </div>
      </form>
      <p>Already have an account? <router-link to="/login">Log in here!</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useSessionStore } from '@/stores/user'
import { supabase } from '@/lib/supabaseClient'

const sessionStore = useSessionStore()
let email: string
let pass: string

const signUp = async function (email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    if (error) {
      throw Error
    } else {
      console.log(data)
      sessionStore.$patch({
        sessionToken: data.session?.access_token,
        refreshToken: data.session?.refresh_token,
        userID: data.user?.id,
        expires: data.session?.expires_at
      })
      router.push({ path: '/worlds' })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.body {
  margin-top: 80px;;
}
.micro-5-charted-regular {
  font-family: "Micro 5 Charted", sans-serif;
  font-weight: 400;
  font-style: normal;
}

#head{
  font-size: 8rem;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
}
#outer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
</style>
