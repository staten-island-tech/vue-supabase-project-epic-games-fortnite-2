<template>
  <div id="outer">
    <form class="row flex-center flex" @submit.prevent="signIn(email, pass)">
      <div class="col-6 form-widget">
        <h1 class="tiny5-regular" id="head">log in</h1>
        <div>
          <input
            class="inputField"
            required
            type="email"
            placeholder="Your email"
            v-model="email"
          /><br>
          <input type="password" required placeholder="password" v-model="pass" />
        </div>
        <div>
          <input type="submit" class="buttonblock" :value="'Log In'" />
        </div>
      </div>
      <p>Don't have an account yet? <router-link to="/register">Register here</router-link></p>
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
@import url('https://fonts.googleapis.com/css2?family=Tiny5&display=swap');
  .body {
    margin-top: 8rem;
  }
  
  .tiny5-regular {
  font-family: "Tiny5", sans-serif;
  font-weight: 400;
  font-style: normal;
}


/* .micro-5-charted-regular {
  font-family: "Micro 5 Charted", sans-serif;
  font-weight: 400;
  font-style: normal;
} */

#head{
  font-size: 8rem;
}
#outer{
  margin-top: 7rem;
}
.buttonblock {
  background-color: #FFFFFF;
  border: 1px solid rgb(209,213,219);
  border-radius: .5rem;
  box-sizing: border-box;
  color: hsla(160, 100%, 37%, 1);
  line-height: 1.25rem;
  text-align: center;
  text-decoration: none #d1dbd6 solid;
  text-decoration-thickness: auto;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.buttonblock:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

.buttonblock:focus {
  outline: 1px solid transparent;
  outline-offset: 1px;
}

.buttonblock:focus-visible {
  box-shadow: none;
}
</style>
