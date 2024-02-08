<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import NavbarComponent from './components/NavbarComponent.vue'
</script>

<template>
  <div id="restaurant-forum">
    <NavbarComponent />
    <main role="main" class="mt-5 bg-white">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
main {
  margin-top: 65px !important;
}
</style>
