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

export default function OrderCustomerDetails() {
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
  return (
    <>
      <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
        <CardContent>
          <Typography sx={{ mb: 4 }} variant='h6'>
            Customer Details
          </Typography>
          <Box
            sx={{
              display: 'flex',
              borderRadius: 1,
              flexDirection: 'column'
            }}
          >
            {/* <Typography sx={{ mb: 2 }} variant='h6'>
              Suchitra Khanna 6th Avenue, London, E1 6AN United Kingdom
            </Typography> */}
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>Suchitra Khanna 6th Avenue,</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>London, E1 6AN</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>United Kingdom</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>+44 796422789</Typography>
          </Box>
        </CardContent>
        <Divider sx={{ my: '0 !important' }} />
        <CardContent>
          <Typography sx={{ mb: 4 }} variant='h6'>
            Pickup Location
          </Typography>
          <CustomTextField
            fullWidth
            label={'Train Station'}
            disabled
            value={'45 Roker Terrace, Latheronwheel, KW5 8NW, London UK'}
          />
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
              <Typography sx={{ color: 'text.secondary' }}>$1198.00</Typography>
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
              <Typography>Order Total</Typography>
              <Typography sx={{ color: 'text.secondary' }}>$1198.00</Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider sx={{ my: '0 !important' }} />
        <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
          <Box
            sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography sx={{ fontWeight: 500 }}>Total</Typography>
            <Typography sx={{ fontWeight: 500 }}>$1198.00</Typography>
          </Box>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
        <Button fullWidth={!breakpointMD} variant='contained' disabled>
          Payment Complete
        </Button>
      </Box>
    </>
  )
}
