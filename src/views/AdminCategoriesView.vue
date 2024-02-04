<script>
import AdminNavComponent from '../components/AdminNavComponent.vue'
import { v4 as uuidv4 } from 'uuid'

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
    fetchCategories() {
      this.categories = dummyData.categories.map(category => Object.assign(category, { isEditing: false }))
    },
    createCategory(name) {
      console.log('name', name)

      const categoryName = this.newCategoryName.trim()
      if (categoryName === '') return this.newCategoryName = ''
      // 將新的類別添加到陣列中
      this.categories.push({ id: uuidv4(), name: categoryName, isEditing: false })
      this.newCategoryName = '' // 清空原本欄位中的內容
    },
    deleteCategory(categoryId) {
      this.categories = this.categories.filter(category => category.id !== categoryId)
    },
    startEdit(category) {
      this.editCategory = { ...category }
    },
    updateCategory(editCategory) {
      const name = editCategory.name.trim()
      if (name === '') return this.handleCancel()

      const category = this.categories.find(category => category.id === editCategory.id)
      category.name = name
      this.editCategory = {}
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
      <thead class="thead-dark">
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
            <span v-show="category.id === editCategory.id" @click="handleCancel" class="cancel btn">✕</span>
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
