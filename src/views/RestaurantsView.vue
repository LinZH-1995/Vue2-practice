<script>
import NavTabsComponent from '../components/NavTabsComponent.vue'
import RestaurantCardComponent from '../components/RestaurantCardComponent.vue'
import RestaurantsNavPillsComponent from '../components/RestaurantsNavPillsComponent.vue'
import RestaurantPaginationComponent from '../components/RestaurantPaginationComponent.vue'

const dummyData = {
  restaurants: [
    {
      "id": 1,
      "name": "Isobel Weimann",
      "tel": "488.464.1578 x94525",
      "address": "1697 Mitchell Avenue",
      "opening_hours": "08:00",
      "description": "dolorem odit velit",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=20.919451761011775",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 2,
      "name": "Miss Arianna Fritsch",
      "tel": "1-131-086-5885 x58580",
      "address": "50900 Smith Hill",
      "opening_hours": "08:00",
      "description": "Laudantium vitae id assumenda reprehenderit eligen",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=85.0147183329278",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 3,
      "name": "Dr. Yadira Kerluke",
      "tel": "307-207-3277 x109",
      "address": "136 Legros Forks",
      "opening_hours": "08:00",
      "description": "Vel atque voluptas omnis possimus. Magni aliquam a",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=54.43856780223908",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 4,
      "name": "Alysa Abbott",
      "tel": "1-031-881-3414",
      "address": "50563 Morar Mount",
      "opening_hours": "08:00",
      "description": "Earum debitis sequi saepe deleniti minus vitae eli",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=41.628316878126185",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 5,
      "name": "Glennie Okuneva",
      "tel": "894-283-4905 x9301",
      "address": "577 Dicki Turnpike",
      "opening_hours": "08:00",
      "description": "voluptatum",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=84.04262448988425",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 6,
      "name": "Humberto Mohr",
      "tel": "1-234-225-9747 x4715",
      "address": "0455 Jaquelin Stravenue",
      "opening_hours": "08:00",
      "description": "fugit sed quisquam",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=0.9653514235592242",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 7,
      "name": "Sage Feest",
      "tel": "(886) 736-9041 x7682",
      "address": "08507 Schamberger Springs",
      "opening_hours": "08:00",
      "description": "Accusantium earum illum commodi.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=30.609418595488712",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 8,
      "name": "Mrs. Reginald McClure",
      "tel": "1-192-486-0845 x522",
      "address": "651 Muller Isle",
      "opening_hours": "08:00",
      "description": "In assumenda qui iusto accusantium non omnis. Repr",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=14.11764045587265",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 9,
      "name": "Kasey Bergnaum",
      "tel": "1-201-938-0261",
      "address": "3135 Derick Orchard",
      "opening_hours": "08:00",
      "description": "Temporibus dolorum unde deserunt optio totam ratio",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=53.88876225206165",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 10,
      "name": "Brenna Little IV",
      "tel": "(828) 223-8874 x3910",
      "address": "343 Kellen Curve",
      "opening_hours": "08:00",
      "description": "Soluta tempora nisi eius non. Velit accusamus corp",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=34.142189707542705",
      "viewCounts": 0,
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2024-01-31T07:20:03.000Z",
        "updatedAt": "2024-01-31T07:20:03.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    }
  ],
  categories: [
    {
      "id": 1,
      "name": "中式料理",
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z"
    },
    {
      "id": 2,
      "name": "日本料理",
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z"
    },
    {
      "id": 3,
      "name": "義大利料理",
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z"
    },
    {
      "id": 4,
      "name": "墨西哥料理",
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z"
    },
    {
      "id": 5,
      "name": "素食料理",
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z"
    },
    {
      "id": 6,
      "name": "美式料理",
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z"
    },
    {
      "id": 7,
      "name": "複合式料理",
      "createdAt": "2024-01-31T07:20:03.000Z",
      "updatedAt": "2024-01-31T07:20:03.000Z"
    }
  ],
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2,
  categoryId: ''
}

export default {
  components: {
    NavTabsComponent,
    RestaurantCardComponent,
    RestaurantsNavPillsComponent,
    RestaurantPaginationComponent
  },

  data: function () {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1
    }
  },

  methods: {
    fetchRestaurants() {
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next
      } = dummyData
      this.restaurants = restaurants
      this.categories = categories
      this.categoryId = categoryId
      this.currentPage = page
      this.totalPage = totalPage
      this.previousPage = prev
      this.nextPage = next
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
    <RestaurantsNavPillsComponent :categories="categories" />

    <div class="row">
      <RestaurantCardComponent v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
    </div>

    <RestaurantPaginationComponent class="px-auto" v-if="totalPage.length > 1" :current-page="currentPage" :total-page="totalPage"
      :category-id="categoryId" :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>
