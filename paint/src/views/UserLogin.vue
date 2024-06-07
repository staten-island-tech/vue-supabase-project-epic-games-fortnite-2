<template>
  <div class="body">
    <form class="row flex-center flex" @submit.prevent="signIn(email, pass)">
      <div class="col-6 form-widget">
        <h1 class="micro-5-charted-regular" id="head">log in</h1>
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
import router from '@/router'
import { supabase } from '@/lib/supabaseClient'
import { useSessionStore } from '@/stores/user'

const sessionStore = useSessionStore()
let email: string
let pass: string

const signIn = async function (email: string, pass: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass
    })
    console.log(data)
    sessionStore.$patch({
      sessionToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
      userID: data.user?.id,
      expires: data.session?.expires_at
    })
    router.push({ path: '/worlds' })
    if (error) throw error
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
  .body {
    margin-top: 5rem
  }
  
.micro-5-charted-regular {
  font-family: "Micro 5 Charted", sans-serif;
  font-weight: 400;
  font-style: normal;
}

#head{
  font-size: 8rem;
}

</style>
