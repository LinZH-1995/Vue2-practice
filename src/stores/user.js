import { defineStore } from 'pinia'
import { usersApi } from '../apis/users'

export const useUserStore = defineStore('user', {
  // similar with Vue data
  state: () => {
    return {
      currentUser: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: false
      },
      isAuthenticated: false
    }
  },

  //Actions are the equivalent of methods in components
  actions: {
    setCurrentUser(currentUserData) {
      // 將 API 取得的 currentUserData 覆蓋掉 state 中的 currentUser
      this.currentUser = Object.assign(this.currentUser, currentUserData)

      // 將使用者的登入狀態改為 true
      this.isAuthenticated = true
    },

    async fetchCurrentUser() {
      try {
        const response = await usersApi.getCurrentUser()
        this.setCurrentUser(response.data)

      } catch (error) {
        console.log('fetch user error')
      }
    }
  }
})
