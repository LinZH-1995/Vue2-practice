<script>
import SpinnerComponent from '../components/SpinnerComponent.vue'
import { adminApi } from '../apis/admin'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    SpinnerComponent
  },

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
    },

    isProcessing: {
      type: Boolean,
      required: true,
      default: false
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
      categories: [],
      isLoading: true  // if loading disable form, if load success set value = false
    }
  },

  methods: {
    async fetchCategories() {
      try {
        const response = await adminApi.getAdminCategories()
        this.categories = response.data.categories
        this.isLoading = false

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法取得餐廳類別資料，請稍後再試!' })
        console.error(error)
      }
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

      // avoid use devtool change DOM tree required attribute
      // step1. check categoryId isExist
      const categoryId = form[1].value.trim()
      const isExist = this.categories.some(category => category.id.toString() === categoryId)
      if (!isExist) return Toast.fire({ icon: 'warning', titleText: '類別不存在!' })

      // step2. check required data isExist
      const name = form[0].value.trim()
      const address = form[3].value.trim()
      if (name === '' || address === '') return Toast.fire({ icon: 'warning', titleText: '必填欄位不可為空!' })

      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  },

  created() {
    this.fetchCategories()
  },

  watch: {
    initialRestaurant(newData) { // watch initialRestaurant props, if parent component get data then refresh
      this.restaurant = { ...this.restaurant, ...newData }
      console.log('watch', this.restaurant)
    }
  }
}
</script>

<template>
  <SpinnerComponent v-if="isLoading" />
  <form @submit.stop.prevent="handleSubmit" v-else>
    <div class="form-group mb-3">* 為必填欄位</div>

    <div class="form-group mb-2">
      <label for="name" class="form-label">* Name：</label>
      <input v-model="restaurant.name" id="name" type="text" class="form-control" name="name" placeholder="Enter name"
        required>
    </div>

    <div class="form-group mb-2">
      <label for="categoryId" class="form-label">* Category：</label>
      <select v-model="restaurant.CategoryId" id="categoryId" class="form-control" name="categoryId" required>
        <option value="" selected disabled>
          --請選擇--
        </option>
        <option v-for="category in categories" :key="category.id" :value="category.id"
          :selected="restaurant.CategoryId === category.id">
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
      <label for="address" class="form-label">* Address：</label>
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

    <button type="submit" class="btn btn-primary" v-if="isProcessing" disabled>處理中...</button>
    <button type="submit" class="btn btn-primary" v-else>送出</button>
    <button type="button" class="btn btn-link ms-5" @click="$router.back()">回上一頁</button>
  </form>
</template>
