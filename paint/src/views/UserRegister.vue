<template>
  <div class="body">
    <form class="row flex-center flex" @submit.prevent="signUp(email, pass)">
      <div class="col-6 form-widget">
        <h1 class="tiny5-regular" id="head">register</h1>
        <div>
          <input
            class="inputField"
            required
            type="email"
            placeholder="Your email"
            v-model="email"
          /><br>
          <input type="password" required placeholder="password" v-model="pass" />
          <p>make sure your password has at least 8 characters</p>
        </div>
        <div>
          <input type="submit" class="buttonblock" :value="'Register'" />
        </div>
      </div>
    </form>
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
@import url('https://fonts.googleapis.com/css2?family=Tiny5&display=swap');
.body {
  margin-top: 80px;;
}
.tiny5-regular {
  font-family: "Tiny5", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.micro-5-charted-regular {
  font-family: "Micro 5 Charted", sans-serif;
  font-weight: 400;
  font-style: normal;
}

#head{
  font-size: 8rem;
}

/* CSS */
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
