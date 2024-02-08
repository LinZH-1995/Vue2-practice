<script>
import AdminRestaurantFormComponent from '../components/AdminRestaurantFormComponent.vue'
import { adminApi } from '../apis/admin'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    AdminRestaurantFormComponent
  },

  data: function () {
    return {
      restaurant: {},
      isProcessing: false
    }
  },

  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.toggleIsProcessing() // set isProcessing to true when start

        // force string value call trim()
        for (let [key, value] of formData.entries()) {
          if (typeof value === 'string') formData.set(key, value.trim())
        }

        const response = await adminApi.editRestaurant(this.restaurant.id, formData)
        if (response.data.status !== 'success') {
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }
        
        this.$router.push('/admin/restaurants') // redirect to path, equal <router-link :to="...">

      } catch (error) {
        this.toggleIsProcessing() // fail then change isProcessing to false
        Toast.fire({ icon: 'error', titleText: '無法更新餐廳資料，請稍後再試!' })
        console.error(error)
      }
    },

    async fetchRestaurant(restaurantId) {
      try {
        const response = await adminApi.getRestaurant(restaurantId)
        this.restaurant = response.data.restaurant

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法取得餐廳資料，請稍後再試!' })
        console.error(error)
      }
    },

    toggleIsProcessing() {
      this.isProcessing = !this.isProcessing
    }
  },

  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },

  beforeRouteUpdate(to, _from, next) {
    // 路由改變時重新抓取資料
    const restaurantId = to.params.id
    this.fetchRestaurant(restaurantId)
    next()
  }
}
</script>

<template>
  <div class="container py-5">
    <AdminRestaurantFormComponent @after-submit="handleAfterSubmit" :initial-restaurant="restaurant"
      :is-processing="isProcessing" />
  </div>
</template>
