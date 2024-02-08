<script>
import RestaurantDetailComponent from '../components/RestaurantDetailComponent.vue'
import RestaurantCommentsComponent from '../components/RestaurantCommentsComponent.vue'
import CreateCommentComponent from '../components/CreateCommentComponent.vue'
import { restaurantsApi } from '../apis/restaurants'
import { Toast } from '../utils/sweetalert'
import { useUserStore } from '../stores/user'

const dummyUser = {
  "id": 1,
  "name": "root",
  "email": "root@example.com",
  "image": null,
  "isAdmin": true
}

export default {
  components: {
    RestaurantDetailComponent,
    RestaurantCommentsComponent,
    CreateCommentComponent
  },

  data: function () {
    return {
      restaurant: {},
      currentUser: dummyUser
    }
  },

  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const response = await restaurantsApi.getRestaurant(restaurantId)
        this.restaurant = {
          ...response.data.restaurant,
          isFavorited: response.data.isFavorited,
          isLiked: response.data.isLiked
        }

      } catch (error) {
        Toast.fire({ icon: 'error', title: '無法取得餐廳資料，請稍後再試' })
        console.error(error)
      }
    },

    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(
        comment => comment.id !== commentId
      )
    },

    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload
      this.restaurantComments.push({
        id: commentId,
        text,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        createdAt: new Date()
      })
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
    <h1 class="mb-3">餐廳描述頁</h1>
    <RestaurantDetailComponent :initial-restaurant="restaurant" />
    <hr>
    <RestaurantCommentsComponent :restaurant-comments="restaurant.Comments" @after-delete-comment="afterDeleteComment" />
    <CreateCommentComponent :restaurant-id="restaurant.id" @after-create-comment="afterCreateComment" />
  </div>
</template>
