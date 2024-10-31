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

export default function OrderHistoryCustomerDetails({ order }) {
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
  return (
    <>
      <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
        <CardContent>
          <Typography sx={{ mb: 4 }} variant='h6'>
            Pickup Location
          </Typography>
          <CustomTextField fullWidth label={'Pickup Point'} disabled value={order?.station?.details} />
          <Divider sx={{ my: '2em !important' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ mb: 4 }} variant='h6'>
              Price Details
            </Typography>
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
              <Typography>Cart Total</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{order?.totalPrice}</Typography>
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
            ></Box>
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
              <Typography>Discount Price</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{order?.discountAmount}</Typography>
            </Box>
            {/* <Box
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
              <Typography sx={{ color: 'text.secondary' }}>{order?.totalPrice}</Typography>
            </Box> */}
          </Box>
        </CardContent>
        <Divider sx={{ my: '0 !important' }} />
        <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
          <Box
            sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography sx={{ fontWeight: 500 }}>Total</Typography>
            <Typography sx={{ fontWeight: 500 }}>{order?.payment?.amountTotal}</Typography>
            {/* <Typography sx={{ fontWeight: 500 }}>{order?.totalPrice - order?.discountAmount}</Typography> */}

          </Box>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
        <Button fullWidth={!breakpointMD} variant='contained' disabled>
          Payment {order?.payment?.status}
        </Button>
      </Box>
    </>
  )
}
