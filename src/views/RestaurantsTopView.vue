<script>
import NavTabsComponent from '../components/NavTabsComponent.vue'
import RestaurantsTopComponent from '../components/RestaurantsTopComponent.vue'

const dummyData = {
  "restaurants": [
    {
      "id": 50,
      "name": "Berneice Barton",
      "tel": "(572) 096-6666",
      "address": "741 Little Tunnel",
      "opening_hours": "08:00",
      "description": "non neque quia",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=88.94646565387478",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 3,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 49,
      "name": "Derek Gerhold",
      "tel": "1-527-612-7690 x406",
      "address": "25898 Murphy Springs",
      "opening_hours": "08:00",
      "description": "tenetur eaque corrupti",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=19.72181531175734",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 3,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 48,
      "name": "Wilfredo Little",
      "tel": "(538) 311-1542 x660",
      "address": "611 Hailie Vista",
      "opening_hours": "08:00",
      "description": "illum",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=59.9577788539377",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 3,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 47,
      "name": "Coby Crist",
      "tel": "(376) 794-9712 x3576",
      "address": "39061 Dorcas Mall",
      "opening_hours": "08:00",
      "description": "Accusantium aut numquam saepe assumenda iure.\nOffi",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=39.716167988640635",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 46,
      "name": "Dallas Volkman",
      "tel": "1-130-934-3211",
      "address": "715 Meredith Mission",
      "opening_hours": "08:00",
      "description": "Quo atque suscipit enim ea. Excepturi impedit dolo",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=40.98083876934435",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 4,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 45,
      "name": "Maya Daugherty PhD",
      "tel": "358-964-8035 x68594",
      "address": "99231 Schimmel Lodge",
      "opening_hours": "08:00",
      "description": "Natus necessitatibus incidunt eos. Id libero quia ",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=91.58562841735613",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 3,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 44,
      "name": "Miles Schmitt",
      "tel": "(091) 178-6187",
      "address": "3339 Brendan Summit",
      "opening_hours": "08:00",
      "description": "Molestias magni soluta natus at in id et adipisci.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=54.77526211441046",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 2,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 43,
      "name": "Albertha Schmeler",
      "tel": "1-847-947-8556",
      "address": "33971 Tromp Ville",
      "opening_hours": "08:00",
      "description": "Quibusdam quae ipsa atque. Voluptatem fugit modi m",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=23.76518550531128",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 4,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 42,
      "name": "Mrs. Sabina Fisher",
      "tel": "1-389-555-5415",
      "address": "3367 Schmeler Estate",
      "opening_hours": "08:00",
      "description": "sit",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=51.45341564141079",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 41,
      "name": "Cathy O'Hara",
      "tel": "059-435-9865",
      "address": "361 Duncan Plains",
      "opening_hours": "08:00",
      "description": "Sapiente culpa occaecati quia asperiores repellat ",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=46.179740814942114",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 4,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    }
  ]
}

export default {
  components: {
    NavTabsComponent,
    RestaurantsTopComponent
  },

  data: function() {
    return {
      restaurants: []
    }
  },

  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants
    }
  },

  created() {
    this.fetchRestaurants()
  }
}
</script>

<template>
  <div class="container py-5">
    <NavTabsComponent />
    <h1 class="mt-5">
      人氣餐廳
    </h1>
    <hr>
    <RestaurantsTopComponent v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant"/>
  </div>
</template>
