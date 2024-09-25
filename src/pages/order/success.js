// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Usernavbar from 'src/views/components/UserNavbar'
import UserFooterLight from 'src/views/components/UserFooterLight'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getOrderPaymentDetails } from 'src/helpers/orderHelper'
import toast from 'react-hot-toast'
import { useOrder } from 'src/context/OrderContext'

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        color: theme.palette.text.secondary
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const HorizontalList = styled(List)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  borderRadius: 6,
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiListItem-root': {
    padding: theme.spacing(6),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
    '& .MuiListItem-root': {
      '&:not(:last-of-type)': {
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  }
}))

const OrderSuccess = () => {
  const router = useRouter()
  let { session_id } = router.query
  const [order, setOrder] = useState(null)
  const { clearCart } = useOrder()

  const fetchPaymentDetails = async () => {
    try {
      let response = await getOrderPaymentDetails(session_id)
      setOrder(response?.data?.order)
      if (response.data.message === 'Paymet details are already saved') {
        toast.success('Order places successfully')
      }
      clearCart()
    } catch (error) {
      if (error.response.data.error === 'Paymet details are already saved') {
        toast.success('Order places successfully')
      }
    }
  }

  useEffect(() => {
    if (session_id != undefined) fetchPaymentDetails()
  }, [router])

  return (
    <>
      <Usernavbar />
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />

      <Grid container width={'80%'} margin={'0px auto'} spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant='h4' sx={{ mb: 4 }}>
              Thank You! 😇
            </Typography>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Your order{' '}
              <Box
                href='/'
                component={Link}
                onClick={e => e.preventDefault()}
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                #{order?.id}
              </Box>{' '}
              has been placed!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We sent an email to{' '}
              <Box
                href='/'
                component={Link}
                onClick={e => e.preventDefault()}
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                {order?.user?.email}
              </Box>{' '}
              with your order confirmation and receipt.
            </Typography>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              If the email hasn't arrived within two minutes, please check your spam folder to see if the email was
              routed there.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'text.secondary' } }}>
              <Icon icon='tabler:clock' fontSize={20} />
              <Typography sx={{ ml: 1.5, color: 'text.secondary' }}>
                <Typography component='span' sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Time placed:
                </Typography>{' '}
                {new Date(order?.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <HorizontalList>
            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 1.5, display: 'flex' }}>
                  <Icon icon='tabler:map-pin' fontSize={20} />
                </Box>
                <Typography variant='h6'>Pickup Location</Typography>
              </Box>
              <Typography>{order?.station?.name}</Typography>
              <Typography>{order?.station?.details}</Typography>
              {/* <Typography>Los Angeles, CA 90017,</Typography>
              <Typography sx={{ mb: 4 }}>USA</Typography>
              <Typography>+123456789</Typography> */}
            </ListItem>
            {/* <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 1.5, display: 'flex' }}>
                  <Icon icon='tabler:credit-card' fontSize={20} />
                </Box>
                <Typography variant='h6'>Order Details</Typography>
              </Box>
              <Typography>{}</Typography>
              <Typography>4135 Parkway Street,</Typography>
              <Typography>Los Angeles, CA 90017,</Typography>
              <Typography sx={{ mb: 4 }}>USA</Typography>
              <Typography>+123456789</Typography>
            </ListItem> */}
            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 1.5, display: 'flex' }}>
                  <Icon icon='tabler:ship' fontSize={20} />
                </Box>
                <Typography variant='h6'>Payment Details</Typography>
              </Box>
              <Typography sx={{ mb: 4, fontWeight: 500 }}>Total Price: {order?.totalPrice}</Typography>
              <Typography sx={{ mb: 4, fontWeight: 500 }}>Paid Amount: {order?.discountAmount}</Typography>
              <Typography sx={{ mb: 4, fontWeight: 500 }}>Paid Amount: {order?.payment?.amountTotal}</Typography>
              {/* <Typography>Standard Delivery</Typography>
              <Typography>(Normally 3-4 business days)</Typography> */}
            </ListItem>
          </HorizontalList>
        </Grid>
      </Grid>
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />

      <UserFooterLight />
    </>
  )
}

export default OrderSuccess
