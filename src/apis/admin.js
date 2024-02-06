import { axiosInstance } from '../utils/axios'
import { crypto } from '../utils/crypto'

const getToken = () => crypto.decrypted() // get token from localStorage and decrypt
const headers = { 'Authorization': `Bearer ${getToken()}` }

export const adminApi = {
  getAdminCategories() {
    return axiosInstance.get('/admin/categories', { headers })
  },

  createRestaurant(formData) {
    return axiosInstance.post('/admin/restaurants', formData, { headers })
  },

  getRestaurants() {
    return axiosInstance.get('/admin/restaurants', { headers })
  },

  deleteRestaurant(restaurantId) {
    return axiosInstance.delete(`/admin/restaurants/${restaurantId}`, { headers })
  },

  getRestaurant(restaurantId) {
    return axiosInstance.get(`/admin/restaurants/${restaurantId}`, { headers })
  },

  editRestaurant(restaurantId, formData) {
    return axiosInstance.put(`/admin/restaurants/${restaurantId}`, formData, { headers })
  }
}
