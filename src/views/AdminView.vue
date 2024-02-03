<script>
import AdminNavComponent from '../components/AdminNavComponent.vue'
import AdminRestaurantsComponent from '../components/AdminRestaurantsComponent.vue'

export default {
  components: {
    AdminNavComponent,
    AdminRestaurantsComponent
  }
}
</script>

<template>
  <div class="container py-5">
    <AdminNavComponent />

    <router-link :to="{}" class="btn btn-primary mb-4">
      New Restaurant
    </router-link>

    <AdminRestaurantsComponent />
  </div>
</template>
