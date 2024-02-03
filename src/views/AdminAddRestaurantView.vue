<script>
import AdminRestaurantFormComponent from '../components/AdminRestaurantFormComponent.vue'

export default {
  components: {
    AdminRestaurantFormComponent
  },

  methods: {
    handleAfterSubmit(formData) {

      // for test
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  }
}
</script>

<template>
  <div class="container py-5">
    <AdminRestaurantFormComponent @after-submit="handleAfterSubmit" />
  </div>
</template>
