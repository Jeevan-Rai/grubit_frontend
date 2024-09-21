// ** MUI Imports
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import PageHeader from 'src/@core/components/page-header'
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
// ** Demo Components Imports
import OrderCustomerDetails from 'src/views/pages/admin/orders/OrderCustomerDetails'
import OrderDetails from 'src/views/pages/admin/orders/OrderDetails'
import MainUserLayout from 'src/layouts/MainUserLayout'
import OrderHistoryCustomerDetails from 'src/views/pages/admin/orders/OrderHistoryCustomerDetails'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getOrderDetails } from 'src/helpers/orderHelper'
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
const CustomerView = ({ tab, invoiceData }) => {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState({})
  const fetchOrder = async () => {
    let response = await getOrderDetails(id)
    setOrder(response.data)
  }
  useEffect(() => {
    fetchOrder()
  }, [id])
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Order History
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />
      <Grid item xs={12} md={7} lg={8}>
        <OrderDetails order={order} />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <OrderHistoryCustomerDetails order={order} />
      </Grid>
    </Grid>
  )
}
CustomerView.getLayout = page => (
  <Guard allowedRoles={['user']}>
    <MainUserLayout>{page}</MainUserLayout>
  </Guard>
)
export default CustomerView
