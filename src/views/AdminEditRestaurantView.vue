<script>
import AdminRestaurantFormComponent from '../components/AdminRestaurantFormComponent.vue'

const dummyData = {
  'restaurant': {
    'id': 1,
    'name': 'Laurence Reynolds',
    'tel': '1-657-067-3756 x9782',
    'address': '187 Kirlin Squares',
    'opening_hours': '08:00',
    'description': 'sit est mollitia',
    'image': 'https://loremflickr.com/320/240/restaurant,food/?random=91.29816290184887',
    'viewCounts': 1,
    'createdAt': '2019-07-30T16:24:55.432Z',
    'updatedAt': '2019-07-30T17:26:43.260Z',
    'CategoryId': 3,
    'Category': {
      'id': 3,
      'name': '義大利料理',
      'createdAt': '2019-07-30T16:24:55.429Z',
      'updatedAt': '2019-07-30T16:24:55.429Z'
    }
  }
}

export default {
  components: {
    AdminRestaurantFormComponent
  },

  data: function () {
    return {
      restaurant: {}
    }
  },

  methods: {
    handleAfterSubmit(formData) {

      // for test
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    },

    fetchRestaurant(restaurantId) {
      console.log('fetchRestaurant id:', restaurantId)
      this.restaurant = dummyData.restaurant
    }
  },

  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
}
</script>

<template>
  <div class="container py-5">
    <AdminRestaurantFormComponent @after-submit="handleAfterSubmit" :initial-restaurant="restaurant" />
  </div>
</template>
