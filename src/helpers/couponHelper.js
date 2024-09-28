import axiosInstance from './axiosInstance'

export const createCoupon = async data => {
  return await axiosInstance.post('/coupons', data)
}

export const getCouponItems = async ({ page, search, start , end, limit }) => {
  return await axiosInstance.get(`/coupons?page=${page}&search=${search}&limit=${limit}&start=${start}&end=${end}`)
}

export const getRedeemers = async ({ page, search, limit, id }) => {
  return await axiosInstance.get(`/coupons/redeemers/${id}?page=${page}&search=${search}&limit=${limit}`)
}

export const getCouponItem = async ({ id }) => {
  return await axiosInstance.get(`/coupons/${id}`)
}

export const updateCoupon = async (data, id) => {
  return await axiosInstance.put(`/coupons/${id}`, data)
}

export const deleteCoupon = async id => {
  return await axiosInstance.delete(`/coupons/${id}`)
}
