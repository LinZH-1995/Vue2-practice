<script>
// seed data
const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  // Vue 會在沒有資料時使用此預設值
  data: function () {
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

  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser
      }
      this.isAuthenticated = dummyUser.isAuthenticated
    }
  },

  created() {
    this.fetchUser()
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand ms-3 me-5" to="/">
        餐廳評論網
      </router-link>

      <div class="d-flex me-2" role="search">
        <router-link v-if="currentUser.isAdmin" to="#" class="text-white me-3 my-1">
          管理員後台
        </router-link>
        <template v-if="isAuthenticated">
          <router-link to="#" class="text-white me-3 my-1">
            {{ currentUser.name || '使用者' }} 您好
          </router-link>
          <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0">
            登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>
