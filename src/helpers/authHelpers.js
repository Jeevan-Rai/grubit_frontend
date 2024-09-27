import axiosInstance from './axiosInstance'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const registerUser = async data => {
  return (data = axiosInstance.post(`/auth/register`, data))
}

export const forgotPassword = async data => {
  return (data = axiosInstance.post(`/auth/forgot-password`, data))
}

export const updateUser = async data => {
  return (data = axiosInstance.put(`/auth/update-profile`, data))
}

export const updatePassword = async data => {
  return (data = axiosInstance.put(`/auth/update-password`, data))
}

export const updateForgotPassword = async data => {
  return (data = axiosInstance.put(`/auth/forgot-password/update`, data))
}

export const getCustomers = async ({ page, search, limit }) => {
  return await axiosInstance.get(`/auth/customers?page=${page}&search=${search}&limit=${limit}`)
}
