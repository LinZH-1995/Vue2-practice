<script>
import NavTabsComponent from '../components/NavTabsComponent.vue'
import UsersTopComponent from '../components/UsersTopComponent.vue'

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

export default {
  components: {
    NavTabsComponent,
    UsersTopComponent
  },

  data: function() {
    return {
      users: []
    }
  },

  methods: {
    fetchUsers() {
      this.users = dummyData.users
    }
  },

  created() {
    this.fetchUsers()
  }
}
</script>

<template>
  <div class="container py-5">
    <NavTabsComponent />
    <h1 class="mt-5">
      美食達人
    </h1>
    <hr>
    <div class="row text-center">
      <UsersTopComponent v-for="user in users" :key="user.id" :init-user="user"/>
    </div>
  </div>
</template>
