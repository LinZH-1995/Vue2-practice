<script>
import AdminNavComponent from '../components/AdminNavComponent.vue'
import { adminApi } from '../apis/admin'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    AdminNavComponent
  },

  data: function () {
    return {
      categories: [],
      newCategoryName: '',
      editCategory: {}
    }
  },

  methods: {
    async fetchCategories() {
      try {
        const response = await adminApi.getAdminCategories()
        this.categories = response.data.categories

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法取得餐廳類別資料，請稍後再試!' })
        console.error(error)
      }
    },

    async createCategory() {
      try {
        // check whether categoryName is empty
        const categoryName = this.newCategoryName.trim()
        if (categoryName === '') {
          Toast.fire({ icon: 'warning', titleText: '類別名稱不可為空!' })
          return this.newCategoryName = ''
        }

        const response = await adminApi.createCategory({ name: categoryName })
        if (response.data.status !== 'success') {
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }

        this.categories.push({ id: response.data.categoryId, name: categoryName, isEditing: false }) // 將新的類別添加到陣列中
        this.newCategoryName = '' // 清空原本欄位中的內容

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法取得餐廳類別資料，請稍後再試!' })
        console.error(error)
      }
    },

    async deleteCategory(categoryId) {
      try {
        const response = await adminApi.deleteCategory(categoryId)
        if (response.data.status !== 'success') {
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }
        this.categories = this.categories.filter(category => category.id !== categoryId)

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法刪除餐廳類別資料，請稍後再試!' })
        console.error(error)
      }
    },

    startEdit(category) {
      this.editCategory = { ...category }
    },

    async updateCategory(editCategory) {
      try {
        // if name is empty cancel edit
        const name = editCategory.name.trim()
        if (name === '') return this.handleCancel()

        const response = await adminApi.editCategory(editCategory.id, { name })
        if (response.data.status !== 'success') {
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }

        const category = this.categories.find(category => category.id === response.data.categoryId)
        category.name = name
        this.handleCancel()

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法更新餐廳類別資料，請稍後再試!' })
        console.error(error)
      }
    },

    handleCancel() {
      this.editCategory = {}
    }
  },

  directives: {
    'edit-focus': function (el, binding) {
      if (binding.value) el.focus()
    }
  },

  created() {
    this.fetchCategories()
  },
}
</script>

<template>
  <div class="container py-5">
    <AdminNavComponent />

    <form class="my-4 row g-3">
      <div class="col-auto">
        <input v-model="newCategoryName" type="text" class="form-control" placeholder="新增餐廳類別...">
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-primary" @click.stop.prevent="createCategory">新增</button>
      </div>
    </form>

    <table class="table">
      <thead class="table-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">{{ category.id }}</th>
          <td class="position-relative">
            <div class="category-name" v-show="category.id !== editCategory.id">{{ category.name }}</div>

            <input v-show="category.id === editCategory.id" v-model="editCategory.name"
              v-edit-focus="category.id === editCategory.id" type="text" class="form-control">
            <span v-show="category.id === editCategory.id" @click.stop.prevent="handleCancel" class="cancel btn">✕</span>
          </td>
          <td class="d-flex justify-content-between">
            <button v-show="category.id !== editCategory.id" @click.stop.prevent="startEdit(category)" type="button"
              class="btn btn-link mr-2">Edit</button>
            <button v-show="category.id === editCategory.id" @click.stop.prevent="updateCategory(editCategory)"
              type="button" class="btn btn-link mr-2">Save</button>

            <button type="button" class="btn btn-link me-2"
              @click.stop.prevent="deleteCategory(category.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>
