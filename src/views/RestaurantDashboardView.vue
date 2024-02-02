<script>
const dummyData = {
  "restaurant": {
    "id": 1,
    "name": "Isobel Weimann",
    "tel": "488.464.1578 x94525",
    "address": "1697 Mitchell Avenue",
    "opening_hours": "08:00",
    "description": "dolorem odit velit",
    "image": "https://loremflickr.com/320/240/restaurant,food/?random=20.919451761011775",
    "viewCounts": 1,
    "createdAt": "2024-01-31T07:20:03.000Z",
    "updatedAt": "2024-02-02T02:57:55.000Z",
    "CategoryId": 4,
    "Category": {
      "id": 4,
      "name": "墨西哥料理",
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z"
    },
    "Comments": [
      {
        "id": 1,
        "text": "Vel saepe minima.",
        "UserId": 1,
        "RestaurantId": 1,
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z",
        "User": {
          "id": 1,
          "name": "root",
          "email": "root@example.com",
          "password": "$2a$10$imeDGioZkuOzi7fV/g3I.ekVZS.SecTN2yp93Gx5q0qGuSYd3GIu2",
          "isAdmin": true,
          "image": null,
          "createdAt": "2024-01-31T07:20:03.000Z",
          "updatedAt": "2024-01-31T07:20:03.000Z"
        }
      },
      {
        "id": 51,
        "text": "Facere aliquid quis molestiae nobis enim possimus velit perferendis.",
        "UserId": 3,
        "RestaurantId": 1,
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z",
        "User": {
          "id": 3,
          "name": "user2",
          "email": "user2@example.com",
          "password": "$2a$10$jFzslGypP3tvjKg0iYfVYe/MHKTb.JjUqmVS3jXFZRC.LOm9nuFBW",
          "isAdmin": false,
          "image": null,
          "createdAt": "2024-01-31T07:20:03.000Z",
          "updatedAt": "2024-01-31T07:20:03.000Z"
        }
      },
      {
        "id": 101,
        "text": "Rerum delectus est nihil quasi non officia voluptas.",
        "UserId": 1,
        "RestaurantId": 1,
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z",
        "User": {
          "id": 1,
          "name": "root",
          "email": "root@example.com",
          "password": "$2a$10$imeDGioZkuOzi7fV/g3I.ekVZS.SecTN2yp93Gx5q0qGuSYd3GIu2",
          "isAdmin": true,
          "image": null,
          "createdAt": "2024-01-31T07:20:03.000Z",
          "updatedAt": "2024-01-31T07:20:03.000Z"
        }
      }
    ]
  }
}

export default {
  data: function() {
    return {
      restaurant: {}
    }
  },

  methods: {
    fetchRestaurant(restaurantId) {
      console.log('fetchRestaurant id: ', restaurantId)
      this.restaurant = {
        ...dummyData.restaurant,
        commentCounts: dummyData.restaurant.Comments.length
      }
    }
  },

  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  }
}
</script>

<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge rounded-pill text-bg-secondary mt-1 mb-3">
        {{ restaurant.Category.name }}
      </span>
    </div>

    <hr>

    <ul>
      <li>評論數： {{ restaurant.commentCounts }} </li>
      <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>
