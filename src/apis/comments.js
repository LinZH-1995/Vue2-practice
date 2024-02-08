import { axiosInstance } from '../utils/axios'
import { crypto } from '../utils/crypto'

const getToken = () => crypto.decrypted() // get token from localStorage and decrypt

export const commentsApi = {
  createComment (restaurantId, text) {
    return axiosInstance.post('/comments', { restaurantId, text }, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  }
}