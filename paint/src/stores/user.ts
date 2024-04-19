import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {

  function $reset() {
    sessionToken.value = ''
    refreshToken.value= ''
    userID.value = ''
  }
  const sessionToken = ref('')
  const refreshToken = ref('')
  const userID = ref('')
  return { sessionToken, refreshToken, userID, $reset }
})
