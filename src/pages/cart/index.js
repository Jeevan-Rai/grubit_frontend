// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import PageHeader from 'src/@core/components/page-header'
import Guard from 'src/guards/Guard'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
// ** Demo Components Imports
import MainUserLayout from 'src/layouts/MainUserLayout'
import CartStationCard from 'src/views/components/CartStationCard'
import CartPricingDetailsCard from 'src/views/components/CartPricingDetailsCard'
import CartOrderDetails from 'src/views/pages/admin/cart/CartOrderDetails'
import UserFooterLight from 'src/views/components/UserFooterLight'
import Usernavbar from 'src/views/components/UserNavbar'
import SectionHeader from 'src/views/components/SectionHeader'
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
const CartView = ({ tab, invoiceData }) => {
  return (
    <>
      <Usernavbar />
      <Box sx={{ padding: '45px' }} />
      <SectionHeader title='Cart' />
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />

      <Grid container sx={{ width: { xs: '90%', md: '75%' }, margin: '0px auto' }}>
        <Grid container spacing={6}>
          {/* <PageHeader
            title={
              <Typography variant='h4'>
                <LinkStyled href='/user/cart'>Cart</LinkStyled>
              </Typography>
            }
            subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
          /> */}
          <Grid item xs={12} md={12} lg={12}>
            <CartOrderDetails />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ padding: '45px' }} />
            <Box sx={{ padding: '45px' }} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant='contained'
                component={Link}
                href='/user/cart'
                sx={{
                  backgroundColor: '#F56700',
                  color: '#000000',
                  borderRadius: '80px',
                  p: { xs: '10px 15px', md: '15px 50px' },
                  fontWeight: 'bold',
                  fontFamily: 'DM Sans'
                }}
              >
                PROCEED TO PAYMENT
              </Button>
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={6}>
            <CartStationCard />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <CartPricingDetailsCard />
          </Grid> */}
        </Grid>
      </Grid>

      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />
      <UserFooterLight />
    </>
  )
}
CartView.getLayout = function getLayout(page) {
  return <>{page}</>
}
export default CartView
