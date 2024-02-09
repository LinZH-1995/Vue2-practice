<script>
import AdminNavComponent from '../components/AdminNavComponent.vue'
import SpinnerComponent from '../components/SpinnerComponent.vue'
import { adminApi } from '../apis/admin'
import { Toast } from '../utils/sweetalert'
import { useUserStore } from '../stores/user'

export default {
  components: {
    AdminNavComponent,
    SpinnerComponent
  },

  setup() {
    const userStore = useUserStore()
    return { userStore }
  },

  data: function () {
    return {
      users: [],
      isLoading: true
    }
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await adminApi.getUsers()
        this.users = response.data.users
        this.isLoading = false // stop loading

      } catch (error) {
        this.isLoading = false // stop loading
        Toast.fire({ icon: 'error', titleText: '無法取得使用者資料，請稍後再試!' })
        console.error(error)
      }
    },

    async toggleUserRole(userId) {
      try {
        const user = this.users.find(user => user.id === userId)
        const response = await adminApi.toggleUserRole(userId, user.isAdmin)
        if (response.data.status !== 'success') {
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }

        user.isAdmin = !user.isAdmin

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法更改使用者權限，請稍後再試!' })
        console.error(error)
      }
    }
  },

  created() {
    this.fetchUsers()
  }
}
</script>

<template>
  <div class="container py-5">
    <AdminNavComponent />
    <SpinnerComponent v-if="isLoading" />

    <template v-else>
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col" width="140">Role</th>
            <th scope="col" width="140">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.email }}</td>

            <td>
              <span v-show="user.isAdmin">admin</span>
              <span v-show="!user.isAdmin">user</span>
            </td>

            <td>
              <button v-show="user.isAdmin && userStore.currentUser.id === user.id" class="btn btn-link" disabled>root
                user</button>
              <button v-show="user.isAdmin && userStore.currentUser.id !== user.id"
                @click.stop.prevent="toggleUserRole(user.id)" type="button" class="btn btn-link">set as user</button>
              <button v-show="!user.isAdmin && userStore.currentUser.id !== user.id"
                @click.stop.prevent="toggleUserRole(user.id)" type="button" class="btn btn-link">set as admin</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style scoped>
button {
  min-width: 110px;
}
</style>
    