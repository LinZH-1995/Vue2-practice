import { axiosInstance } from '../utils/axios'

export const adminApi = {
  getAdminCategories() {
    return axiosInstance.get('/admin/categories')
  },

  createCategory(categoryName) {
    return axiosInstance.post('/admin/categories', categoryName)
  },

  editCategory(categoryId, categoryName) {
    return axiosInstance.put(`/admin/categories/${categoryId}`, categoryName)
  },

  deleteCategory(categoryId) {
    return axiosInstance.delete(`/admin/categories/${categoryId}`)
  },

  createRestaurant(formData) {
    return axiosInstance.post('/admin/restaurants', formData)
  },

  getRestaurants() {
    return axiosInstance.get('/admin/restaurants')
  },

  deleteRestaurant(restaurantId) {
    return axiosInstance.delete(`/admin/restaurants/${restaurantId}`)
  },

  getRestaurant(restaurantId) {
    return axiosInstance.get(`/admin/restaurants/${restaurantId}`)
  },

  editRestaurant(restaurantId, formData) {
    return axiosInstance.put(`/admin/restaurants/${restaurantId}`, formData)
  },

  getUsers() {
    return axiosInstance.get('/admin/users')
  },

  toggleUserRole(userId, isAdmin) {
    return axiosInstance.put(`/admin/users/${userId}`, { isAdmin })
  }
}
