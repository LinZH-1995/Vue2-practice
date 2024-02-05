import { axiosInstance } from '../utils/axios'

export const usersApi = {
  signIn ({ email, password }) {
    return axiosInstance.post('/signin', {
      email,
      password
    })
  }
}