<script>
import { usersApi } from '../apis/users'
import { Toast } from '../utils/sweetalert'
import { useUserStore } from '../stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },

  data: function () {
    return {
      user: {},
      editData: {},
      isProcessing: false
    }
  },

  methods: {
    async fetchUser(userId) {
      try {
        // check whether is currentUser
        const currentUserId = this.userStore.currentUser.id
        if (userId !== currentUserId) return this.$router.back()

        const response = await usersApi.getUser(userId)
        this.user = response.data.profile
        this.editData = {
          name: this.user.name,
          image: this.user.image
        }

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法取得使用者資料，請稍後再試!' })
        console.error(error)
      }
    },

    handleFileChange(e) {
      const files = e.target.files // files[]
      if (files.length === 0) {
        this.editData.image = this.user.image
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.editData.image = imageURL
      }
    },

    async handleSubmit(e) {
      try {
        this.toggleIsProcessing() // set isProcessing to true when start
        const form = e.target  // <form>...</form>

        // avoid use devtool change DOM tree required attribute
        const name = form[0].value.trim()
        if (name === '') {
          this.toggleIsProcessing() // fail then change isProcessing to false
          return Toast.fire({ icon: 'warning', titleText: '必填欄位不可為空!' })
        }

        const formData = new FormData(form)
        for (let [key, value] of formData.entries()) {
          if (typeof value === 'string') formData.set(key, value.trim())
        }

        const response = await usersApi.putUser(this.user.id, formData)
        if (response.data.status !== 'success') {
          this.toggleIsProcessing() // fail then change isProcessing to false
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }

        this.$router.push(`/users/${this.user.id}`) // redirect to path, equal <router-link :to="...">

      } catch (error) {
        this.toggleIsProcessing() // fail then change isProcessing to false
        Toast.fire({ icon: 'error', titleText: '無法更新餐廳資料，請稍後再試!' })
        console.error(error)
      }
    },

    toggleIsProcessing() {
      this.isProcessing = !this.isProcessing
    }
  },

  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  }
}
</script>

<template>
  <div class="container py-5" v-if="userStore.currentUser.id === user.id">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="editData.name" id="name" type="text" name="name" class="form-control" placeholder="Enter Name"
          required>
      </div>

      <div class="form-group mb-5">
        <label for="image" class="form-label d-flex">Image</label>
        <input @change="handleFileChange" id="image" type="file" name="image" accept="image/png, image/jpeg, image/jpg"
          class="form-control-file mb-2">
        <img v-if="editData.image" :src="editData.image" class="d-block img-thumbnail mb-3" width="200" height="200">
      </div>

      <button type="submit" class="btn btn-primary" v-if="isProcessing" disabled>處理中...</button>
      <button type="submit" class="btn btn-primary" v-else>Submit</button>
    </form>
  </div>
</template>
