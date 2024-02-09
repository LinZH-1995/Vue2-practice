<script>
import NavTabsComponent from '../components/NavTabsComponent.vue'
import NewestRestaurantsComponent from '../components/NewestRestaurantsComponent.vue'
import NewestCommentsComponent from '../components/NewestCommentsComponent.vue'
import SpinnerComponent from '../components/SpinnerComponent.vue'
import { restaurantsApi } from '../apis/restaurants'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    NavTabsComponent,
    NewestRestaurantsComponent,
    NewestCommentsComponent,
    SpinnerComponent
  },

  data: function () {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },

  methods: {
    async fetchFeeds() {
      try {
        const response = await restaurantsApi.getRestaurantsFeeds()
        this.restaurants = response.data.restaurants
        this.comments = response.data.comments

        this.isLoading = false // stop loading

      } catch (error) {
        this.isLoading = false // stop loading
        Toast.fire({ icon: 'error', titleText: '無法取得資料，請稍後再試!' })
        console.error(error)
      }
    }
  },

  created() {
    this.fetchFeeds()
  }
}
</script>

<template>
  <div class="container py-5">
    <NavTabsComponent />
    <SpinnerComponent v-if="isLoading" />

    <template v-else>
      <h1 class="mt-5 fw-bolder">
        最新動態
      </h1>
      <hr>

      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <NewestRestaurantsComponent :restaurants="restaurants" />
          <h4 v-if="restaurants.length === 0">暫無資料</h4>
        </div>

        <div class="col-md-6">
          <h3>最新評論</h3>
          <NewestCommentsComponent :comments="comments" />
          <h4 v-if="comments.length === 0">暫無資料</h4>
        </div>
      </div>
    </template>
  </div>
</template>
