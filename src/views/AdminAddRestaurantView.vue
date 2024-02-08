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
      isProcessing: false
    }
  },

  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.toggleIsProcessing() // avoid double click submit button 

        // force string value call trim()
        for (let [key, value] of formData.entries()) {
          if (typeof value === 'string') formData.set(key, value.trim())
        }

        const response = await adminApi.createRestaurant(formData)
        if (response.data.status !== 'success') {
          this.toggleIsProcessing() // fail then change isProcessing to false
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }

        this.$router.push('/admin/restaurants') // redirect to path, equal <router-link :to="...">

      } catch (error) {
        this.toggleIsProcessing() // fail then change isProcessing to false
        Toast.fire({ icon: 'error', titleText: '無法新增餐廳資料，請稍後再試!' })
        console.error(error)
      }
    },

    toggleIsProcessing() {
      this.isProcessing = !this.isProcessing
    }
  }
}
</script>

<template>
  <div class="container py-5">
    <AdminRestaurantFormComponent @after-submit="handleAfterSubmit" :is-processing="isProcessing" />
  </div>
</template>
