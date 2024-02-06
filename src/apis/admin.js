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
  }
}
