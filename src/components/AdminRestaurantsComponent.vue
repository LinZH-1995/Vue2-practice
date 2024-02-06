<script>
import { adminApi } from '../apis/admin'
import { Toast } from '../utils/sweetalert'

export default {
  data: function () {
    return {
      restaurants: [],
      isProcessing: false
    }
  },

  methods: {
    async fetchRestaurants() {
      try {
        const response = await adminApi.getRestaurants()
        this.restaurants = response.data.restaurants

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法取得餐廳資料，請稍後再試!' })
        console.error(error)
      }
    },

    async deleteRestaurant(restaurantId) {
      try {
        this.toggleIsProcessing() // isProcessing = true

        const response = await adminApi.deleteRestaurant(restaurantId)
        if (response.data.status !== 'success') throw new Error(response.data.message)
        this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId)

        this.toggleIsProcessing() // isProcessing = false

      } catch (error) {
        this.toggleIsProcessing() // isProcessing = false
        Toast.fire({ icon: 'error', titleText: '無法刪除餐廳資料，請稍後再試!' })
        console.error(error)
      }
    },

    toggleIsProcessing() {
      this.isProcessing = !this.isProcessing
    }
  },

  created() {
    this.fetchRestaurants()
  }
}
</script>

<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
            class="btn btn-link">Show</router-link>
          <router-link :to="{ name: 'admin-restaurant-edit', params: { id: restaurant.id } }"
            class="btn btn-link">Edit</router-link>

          <button type="button" class="btn btn-link" v-if="isProcessing" disabled>處理中...</button>
          <button type="button" class="btn btn-link" v-else @click.stop.prevent="deleteRestaurant(restaurant.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
