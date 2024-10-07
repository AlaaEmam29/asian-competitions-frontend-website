import axios from 'axios'
import { BASE_URL ,API_TOKEN } from '@/utils/constants'

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'ar',
},


})
 export const URL = (endpoint:string , more?:string) => more ? `${endpoint}?api_token=${API_TOKEN}&${more}` : `${endpoint}?api_token=${API_TOKEN}`
 API.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError = {
      status: error.response?.status,
      message:
        Object.keys(error.response?.data || {}).length > 0
          ? Object.keys(error.response?.data)
              .map((key) => error.response?.data[key])
              .join(' ')
          : error.response?.data?.message || error.message,
    }
    return Promise.reject(formattedError)
  },
)

export default API
