<script>
import NavTabsComponent from '../components/NavTabsComponent.vue'
import UsersTopComponent from '../components/UsersTopComponent.vue'
import SpinnerComponent from '../components/SpinnerComponent.vue'
import { usersApi } from '../apis/users'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    NavTabsComponent,
    UsersTopComponent,
    SpinnerComponent
  },

  data: function () {
    return {
      users: [],
      isLoading: true
    }
  },

  methods: {
    async fetchTopUsers() {
      try {
        const response = await usersApi.getTopUsers()
        this.users = response.data.users
        this.isLoading = false // stop loading

      } catch (error) {
        this.isLoading = false // stop loading
        Toast.fire({ icon: 'error', titleText: '無法取得美食達人，請稍後再試!' })
        console.log(error)
      }
    }
  },

  created() {
    this.fetchTopUsers()
  }
}
</script>

<template>
  <div class="container py-5">
    <NavTabsComponent />
    <SpinnerComponent v-if="isLoading" />

    <template v-else>
      <h1 class="mt-5">
        美食達人
      </h1>
      <hr>
      <div class="row text-center">
        <UsersTopComponent v-for="user in users" :key="user.id" :init-user="user" />
      </div>
    </template>
  </div>
</template>
