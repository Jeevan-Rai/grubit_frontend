// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import { useOrder } from 'src/context/OrderContext'
import { createOrder } from 'src/helpers/orderHelper'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import WarningDialog from './dialogs/WarningDialog'

export default function CartPricingDetailsCard() {
  let router = useRouter()
  const { orders, removeItemFromOrder, applyCoupon, removeCoupon } = useOrder()
  const [couponCode, setCouponCode] = useState('')
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
  const [open, setOpen] = useState()

  const proceedToPayment = async () => {
    if (!orders.pickupLocation) {
      toast.error('Please select a pickup location')
      return
    }

    if (orders.totalPrice <= 0) {
      toast.error('Cart is epty, please add some item to proceed')
      return
    }

    setOpen(true)
  }

  let successCallback = async () => {
    try {
      let orderResponse = await createOrder(orders)
      router.replace(orderResponse.data.url)
    } catch (error) {
      toast.error(error.response.data.error || 'Something went wrong while creating the Order')
    }
  }

  const handleApplyCoupon = () => {
    applyCoupon(couponCode)
  }

  useEffect(() => {}, [orders])

  return (
    <>
      <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Typography sx={{ mb: 4 }} variant='h6'>
              Apply Coupon
            </Typography>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <CustomTextField
                fullWidth
                sx={{ mr: 4 }}
                onChange={e => setCouponCode(e.target.value)}
                placeholder='Enter Promo Code'
                value={couponCode}
              />
              {!orders.couponCode && (
                <Button variant='tonal' onClick={handleApplyCoupon}>
                  Apply
                </Button>
              )}

              {orders.couponCode && (
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => {
                    removeCoupon()
                    setCouponCode('')
                  }}
                >
                  Remove
                </Button>
              )}
            </Box>
          </CardContent>
          <Divider sx={{ my: '0 !important' }} />
          <CardContent>
            <Typography sx={{ mb: 4 }} variant='h6'>
              Price Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Bag Total</Typography>
                <Typography sx={{ color: 'text.secondary' }}>£{orders.totalPrice}</Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Coupon Discount</Typography>
                <Typography
                  variant='h6'
                  onClick={e => e.preventDefault()}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  £{orders?.couponDiscount}
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Order Total</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  £{orders?.discountedPrice || orders.totalPrice}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ my: '0 !important' }} />
          <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Total</Typography>
              <Typography sx={{ fontWeight: 500 }}>£{orders?.discountedPrice > 0 ? orders?.discountedPrice : orders.totalPrice}</Typography>
            </Box>
          </CardContent>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
        <Button
          fullWidth={!breakpointMD}
          onClick={proceedToPayment}
          variant='contained'
          disabled={orders.totalPrice <= 0}
        >
          Proceed to payment
        </Button>
      </Box>
      <WarningDialog
        title={'Confirm Train Station'}
        message={`Are you sure you want to proceed with ${orders?.pickupLocation?.name} as your confirmed train station for meal pickups?`}
        open={open}
        setOpen={setOpen}
        successCallback={successCallback}
      />
    </>
  )
}
