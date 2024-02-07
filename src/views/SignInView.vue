<script>
import { usersApi } from '../apis/users'
import { Toast } from '../utils/sweetalert'
import { crypto } from '../utils/crypto'
import { useUserStore } from '../stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },

  data: function () {
    return {
      email: '',
      password: '',
      isProcessing: false
    };
  },

  methods: {
    toggleIsProcessing() {
      this.isProcessing = !this.isProcessing
    },

    async handleSubmit() {
      try {
        const email = this.email.trim()
        const password = this.password.trim()
        if (email === '' || password === '') {
          return Toast.fire({ icon: 'warning', titleText: '所有欄位皆為必填!' })
        }

        this.toggleIsProcessing() // avoid double click submit button 
        const response = await usersApi.signIn({ email, password })

        const token = response.data.token
        const encryptedToken = crypto.encrypted(token)
        localStorage.setItem('token', encryptedToken)

        this.userStore.setCurrentUser(response.data.user)
        this.$router.push('/restaurants') // equal <router-link :to="...URL...">

        Toast.fire({ icon: 'success', titleText: '成功登入!' }) // trigger success sweetalert
      } catch (error) {
        this.toggleIsProcessing() // sigin fail then change isProcessing to false

        // 將欄位清空
        this.email = ''
        this.password = ''

        // trigger warning sweetalert
        Toast.fire({ icon: 'warning', titleText: '請確認您輸入了正確的帳號密碼!' })
        console.error(error)
      }


    }
  }
}
</script>

<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-3">
        <label for="email" class="mb-2">email</label>
        <input v-model="email" id="email" name="email" type="email" class="form-control" placeholder="email"
          autocomplete="username" required autofocus>
      </div>

      <div class="form-label-group mb-3">
        <label for="password" class="mb-2">Password</label>
        <input v-model="password" id="password" name="password" type="password" class="form-control"
          placeholder="Password" autocomplete="current-password" required>
      </div>

      <div class="d-grid gap-3">
        <button type="submit" class="btn btn-primary" v-if="isProcessing" disabled>處理中...</button>
        <button type="submit" class="btn btn-primary" v-else>Submit</button>

        <router-link to="/signup" class="btn text-primary" role="button">Sign Up</router-link>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>
