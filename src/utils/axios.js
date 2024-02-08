import axios from 'axios'
import { crypto } from './crypto'

const baseURL = 'http://localhost:3000/api'

export const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(function (config) {
  const token = crypto.decrypted()
  if (token !== null && token !== '') config.headers.set('Authorization', `Bearer ${token}`)
  return config
}, function (error) {
  return Promise.reject(error)
})