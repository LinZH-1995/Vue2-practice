<script>
import { useUserStore } from '../stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },

  methods: {
    logout() {
      this.userStore.removeToken()
      this.$router.push('/signin')
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand ms-3 me-5 my-auto" to="/">
        餐廳評論網
      </router-link>

      <div class="d-flex me-2" role="search">
        <router-link v-if="userStore.currentUser.isAdmin" to="/admin" class="text-white me-3 my-auto">
          管理員後台
        </router-link>
        <template v-if="userStore.isAuthenticated">
          <router-link :to="{ name: 'user', params: { id: userStore.currentUser.id } }" class="text-white me-3 my-auto">
            {{ userStore.currentUser.name || '使用者' }} 您好
          </router-link>
          <button @click="logout" type="button" class="btn btn-sm btn-outline-success my-auto my-sm-0">
            登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav.bg-dark {
  padding: 14px 16px;
  background-color: #bd2333 !important;
}

.navbar-brand {
  font-size: 19px;
  padding: 0;
}
</style>
