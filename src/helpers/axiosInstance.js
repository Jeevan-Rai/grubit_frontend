import axios from 'axios'
import authConfig from 'src/configs/auth'
// Create an Axios instance with global configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4001' // Backend URL or API base URL // Enable this if you're working with cookies or sessions
})

// Request interceptor (optional) - Useful for adding authentication tokens, etc.
axiosInstance.interceptors.request.use(
  config => {
    // Example: Attach token to headers
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName) // Get the token from localStorage
    if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}` // Set authorization header
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor (optional) - Handle global response errors
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // Handle error based on status code
      if (error.response.status === 401) {
        // Unauthorized error - Maybe redirect to login
        console.log('Unauthorized, redirecting to login...')
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
