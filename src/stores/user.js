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
      isAuthenticated: false,
      token: ''
    }
  },

  //Actions are the equivalent of methods in components
  actions: {
    setCurrentUser(currentUserData) {
      // 將 API 取得的 currentUserData 覆蓋掉 state 中的 currentUser
      this.currentUser = Object.assign(this.currentUser, currentUserData)

      // 將使用者的登入狀態改為 true
      this.isAuthenticated = true

      this.token = localStorage.getItem('token')
    },

    async fetchCurrentUser() {
      try {
        const response = await usersApi.getCurrentUser()
        this.setCurrentUser(response.data)

      } catch (error) {
        this.removeToken() // 一旦驗證失敗，觸發登出，清空state
        console.log('fetch user error')
      }
    },

    removeToken() {
      this.currentUser = {}
      this.isAuthenticated = false
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})
