<script>
import { usersApi } from '../apis/users'
import { Toast } from '../utils/sweetalert'

export default {
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // check if required field is empty
        const name = this.name.trim()
        const email = this.email.trim()
        const password = this.password.trim()
        const passwordCheck = this.passwordCheck.trim()
        if (name === '' || email === '' || password === '' || passwordCheck === '') {
          return Toast.fire({ icon: 'warning', titleText: '所有欄位皆不可為空!' })
        }

        // check password and passwordCheck
        if (password !== passwordCheck) {
          this.password = ''
          this.passwordCheck = ''
          return Toast.fire({ icon: 'warning', titleText: '密碼與確認密碼不同!' })
        }

        this.toggleIsProcessing() // set isProcessing to true when start
        const data = { name, email, password, passwordCheck }
        const response = await usersApi.signUp(data)
        if (response.data.status !== 'success') {
          this.toggleIsProcessing() // fail then change isProcessing to false
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }

        this.$router.push('/signin')  //  redirect to path, equal <router-link :to="...">

      } catch (error) {
        this.toggleIsProcessing() // fail then change isProcessing to false
        Toast.fire({ icon: 'error', titleText: '無法註冊帳號，請稍後再試!' })
        console.error(error)
      }
    },

    toggleIsProcessing() {
      this.isProcessing = !this.isProcessing
    }
  }
}
</script>

<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-3">* 為必填欄位</div>

      <div class="form-label-group mb-3">
        <label for="name" class="mb-2">* Name</label>
        <input v-model="name" id="name" name="name" type="text" class="form-control" placeholder="name"
          autocomplete="username" required autofocus>
      </div>

      <div class="form-label-group mb-3">
        <label for="email" class="mb-2">* Email</label>
        <input v-model="email" id="email" name="email" type="email" class="form-control" placeholder="email"
          autocomplete="email" required>
      </div>

      <div class="form-label-group mb-3">
        <label for="password" class="mb-2">* Password</label>
        <input v-model="password" id="password" name="password" type="password" class="form-control"
          placeholder="Password" autocomplete="new-password" required>
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check" class="mb-2">* Password Check</label>
        <input v-model="passwordCheck" id="password-check" name="passwordCheck" type="password" class="form-control"
          placeholder="Password Check" autocomplete="new-password" required>
      </div>

      <div class="d-grid gap-3">
        <button type="submit" class="btn btn-primary" v-if="isProcessing" disabled>處理中...</button>
        <button class="btn btn-primary" type="submit" v-else>Submit</button>
        <router-link to="/signin" class="btn text-primary" role="button">Sign In</router-link>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>
