// ** MUI Imports
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import PageHeader from 'src/@core/components/page-header'
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
// ** Demo Components Imports
import CustomerDetails from 'src/views/pages/admin/customers/CustomerDetails'
import OrderHistory from 'src/views/pages/admin/customers/OrderHistory'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getOrderDetailsByUser } from 'src/helpers/orderHelper'
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
const CustomerView = ({ tab, invoiceData }) => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const { id } = router.query
  const [userDetails, setUserDetails] = useState()

  const fetchUser = async () => {
    try {
      let response = await getOrderDetailsByUser(id, page, limit)
      setUserDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (id) fetchUser()
  }, [router, page])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Customers Profile
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />
      <Grid item xs={12} md={5} lg={4}>
        <CustomerDetails userDetails={userDetails} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <OrderHistory userDetails={userDetails} page={page} setPage={setPage} />
      </Grid>
    </Grid>
  )
}
CustomerView.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default CustomerView
