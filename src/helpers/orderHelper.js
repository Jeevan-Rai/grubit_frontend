import axiosInstance from './axiosInstance'

export const createOrder = async orderData => {
  return await axiosInstance.post('/order/create-order', orderData)
}

export const getOrderHistory = async ({ page, search, limit }) => {
  return await axiosInstance.get(`/order/history?page=${page}&search=${search}&limit=${limit}`)
}

export const getOrderDetails = async id => {
  return await axiosInstance.get(`/order/${id}`)
}

export const getCouponDiscountByCart = async cart => {
  return await axiosInstance.post(`/coupons/apply`, cart)
}

export const getOrderPaymentDetails = async sessionId => {
  return await axiosInstance.get(`/order/details/${sessionId}`)
}

export const getOrderDetailsByUser = async (id, page, limit) => {
  return await axiosInstance.get(`/order/user/${id}?page=${page}&limit=${limit}`)
}
