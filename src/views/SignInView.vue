<script>
export default {
  data: function () {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      const data = JSON.stringify({
        email: this.email,
        password: this.password
      })

      // TODO: 向後端驗證使用者登入資訊是否合法
      console.log('data', data)
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
        <button class="btn btn-primary" type="submit">Submit</button>
        <router-link to="/signup" class="btn text-primary" role="button">Sign Up</router-link>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>
