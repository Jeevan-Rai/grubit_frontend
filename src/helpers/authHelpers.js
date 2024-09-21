import axiosInstance from './axiosInstance'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const registerUser = async data => {
  return (data = axiosInstance.post(`${BASE_URL}/auth/register`, data))
}

export const getCustomers = async ({ page, search, limit }) => {
  return await axiosInstance.get(`/auth/customers?page=${page}&search=${search}&limit=${limit}`)
}
