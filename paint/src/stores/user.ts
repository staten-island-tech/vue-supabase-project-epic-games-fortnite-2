import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {

  function $reset() {
    sessionToken.value = ''
    refreshToken.value= ''
    userID.value = ''
    expires.value = 0
  }
  const sessionToken = ref('')
  const refreshToken = ref('')
  const userID = ref('')
  const expires = ref(0)
  const currentWorldID = ref('')
  return { sessionToken, refreshToken, userID, expires, currentWorldID, $reset }
})
