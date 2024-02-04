<script>
import AdminNavComponent from '../components/AdminNavComponent.vue'

const dummyData = {
  "users": [
    {
      "id": 1,
      "name": "root",
      "email": "root@example.com",
      "password": "$2a$10$imeDGioZkuOzi7fV/g3I.ekVZS.SecTN2yp93Gx5q0qGuSYd3GIu2",
      "isAdmin": true,
      "image": null,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    },
    {
      "id": 2,
      "name": "user1",
      "email": "user1@example.com",
      "password": "$2a$10$RRHRcZKVXOkLHyavs3OZ3uGOMKh3F0TmjiOZ82keF9LlgI/CDcHsy",
      "isAdmin": false,
      "image": null,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    },
    {
      "id": 3,
      "name": "user2",
      "email": "user2@example.com",
      "password": "$2a$10$jFzslGypP3tvjKg0iYfVYe/MHKTb.JjUqmVS3jXFZRC.LOm9nuFBW",
      "isAdmin": false,
      "image": null,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    }
  ]
}

const dummyUser = {
  "profile": {
    "id": 1,
    "name": "root",
    "email": "root@example.com",
    "password": "$2a$10$imeDGioZkuOzi7fV/g3I.ekVZS.SecTN2yp93Gx5q0qGuSYd3GIu2",
    "isAdmin": true,
    "image": null,
    "createdAt": "2024-01-31T07:20:03.000Z",
    "updatedAt": "2024-01-31T07:20:03.000Z",
    "Comments": [],
    "FavoritedRestaurants": [],
    "Followers": [],
    "Followings": []
  },
  "isFollowed": false
}

export default {
  components: {
    AdminNavComponent
  },

  data: function () {
    return {
      users: [],
      currentUser: dummyUser.profile
    }
  },

  methods: {
    fetchUsers() {
      this.users = dummyData.users
    },
    toggleUserRole(userId) {
      const user = this.users.find(user => user.id === userId)
      user.isAdmin = !user.isAdmin
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
            <button v-show="user.isAdmin && currentUser.id === user.id" class="btn btn-link" disabled>root
              user</button>
            <button v-show="user.isAdmin && currentUser.id !== user.id" @click.stop.prevent="toggleUserRole(user.id)"
              type="button" class="btn btn-link">set as user</button>
            <button v-show="!user.isAdmin && currentUser.id !== user.id" @click.stop.prevent="toggleUserRole(user.id)"
              type="button" class="btn btn-link">set as admin</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
