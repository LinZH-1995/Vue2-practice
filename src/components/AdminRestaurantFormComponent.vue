<script>
const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  ]
}

export default {
  props: {
    initialRestaurant: {
      type: Object,
      default: () => ({
        name: '',
        CategoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        opening_hours: '',
      })
    }
  },

  data() {
    return {
      restaurant: {
        name: '',
        CategoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        opening_hours: ''
      },
      categories: []
    }
  },

  methods: {
    fetchCategories() {
      this.categories = dummyData.categories
    },
    handleFileChange(e) {
      const files = e.target.files // files[]
      if (files.length === 0) {
        this.restaurant.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.restaurant.image = imageURL
      }
    },
    handleSubmit(e) {
      const form = e.target  // <form>...</form>
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  },

  created() {
    this.fetchCategories()
    this.restaurant = {
      ...this.restaurant,
      ...this.initialRestaurant
    }
  }
}
</script>

<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-2">
      <label for="name" class="form-label">Name：</label>
      <input v-model="restaurant.name" id="name" type="text" class="form-control" name="name" placeholder="Enter name"
        required>
    </div>

    <div class="form-group mb-2">
      <label for="categoryId" class="form-label">Category：</label>
      <select v-model="restaurant.CategoryId" id="categoryId" class="form-control" name="categoryId" required>
        <option value="" selected disabled>
          --請選擇--
        </option>
        <option v-for="category in categories" :key="category.id" :value="category.id" :selected="restaurant.CategoryId === category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group mb-2">
      <label for="tel" class="form-label">Tel：</label>
      <input v-model="restaurant.tel" id="tel" type="text" class="form-control" name="tel"
        placeholder="Enter telephone number">
    </div>

    <div class="form-group mb-2">
      <label for="address" class="form-label">Address：</label>
      <input v-model="restaurant.address" id="address" type="text" class="form-control" placeholder="Enter address"
        name="address" required>
    </div>

    <div class="form-group mb-2">
      <label for="opening-hours" class="form-label">Opening Hours：</label>
      <input v-model="restaurant.opening_hours" id="opening-hours" type="time" class="form-control" name="opening_hours">
    </div>

    <div class="form-group mb-2">
      <label for="description" class="form-label">Description：</label>
      <textarea v-model="restaurant.description" id="description" class="form-control" rows="3" name="description" />
    </div>

    <div class="form-group mb-5">
      <label for="image" class="form-label d-flex">Image：</label>
      <input @change="handleFileChange" id="image" type="file" name="image" accept="image/png, image/jpeg, image/jpg"
        class="form-control-file mb-2">
      <img v-if="restaurant.image" :src="restaurant.image" class="d-block img-thumbnail mb-3" width="200" height="200">
    </div>

    <button type="submit" class="btn btn-primary">
      送出
    </button>
  </form>
</template>
