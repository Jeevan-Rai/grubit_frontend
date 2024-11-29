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

const OrderCancelPage = () => {
  const router = useRouter()
  let { session_id } = router.query
  const [order, setOrder] = useState(null)
  const { clearCart } = useOrder()

  const fetchPaymentDetails = async () => {
    try {
      let response = await getOrderPaymentDetails(session_id)
      setOrder(response?.data?.order)

        toast.error('Order failed!')
      
      // clearCart()
    } catch (error) {
 
        toast.error('Order failed!')
      
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
            <Typography variant='h4' sx={{ mb: 4 , color:"red"}}>
              Failed! 😇
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
              has been failed !
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
     
      </Grid>
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />

      <UserFooterLight />
    </>
  )
}

export default OrderCancelPage
