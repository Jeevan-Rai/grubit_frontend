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
import CartStationCard from 'src/views/components/CartStationCard'
import CartPricingDetailsCard from 'src/views/components/CartPricingDetailsCard'
import CartOrderDetails from 'src/views/pages/admin/cart/CartOrderDetails'
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
const CustomerView = ({ tab, invoiceData }) => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Cart
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />
      <Grid item xs={12} md={12} lg={12}>
        <CartOrderDetails />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CartStationCard />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CartPricingDetailsCard />
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
