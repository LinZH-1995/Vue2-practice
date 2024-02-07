import { axiosInstance } from '../utils/axios'
import { crypto } from '../utils/crypto'

const getToken = () => crypto.decrypted() // get token from localStorage and decrypt

export const adminApi = {
  getAdminCategories() {
    return axiosInstance.get('/admin/categories', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  createCategory(categoryName) {
    return axiosInstance.post('/admin/categories', categoryName, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  editCategory(categoryId, categoryName) {
    return axiosInstance.put(`/admin/categories/${categoryId}`, categoryName, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  deleteCategory(categoryId) {
    return axiosInstance.delete(`/admin/categories/${categoryId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  createRestaurant(formData) {
    return axiosInstance.post('/admin/restaurants', formData, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  getRestaurants() {
    return axiosInstance.get('/admin/restaurants', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  deleteRestaurant(restaurantId) {
    return axiosInstance.delete(`/admin/restaurants/${restaurantId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  getRestaurant(restaurantId) {
    return axiosInstance.get(`/admin/restaurants/${restaurantId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  editRestaurant(restaurantId, formData) {
    return axiosInstance.put(`/admin/restaurants/${restaurantId}`, formData, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  }
}
