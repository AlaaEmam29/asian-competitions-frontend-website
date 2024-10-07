import axios from 'axios'

const API = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
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
