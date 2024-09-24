// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import OrderTableHeader from 'src/views/pages/admin/orders/OrderTableHeader'
import CouponRedeemers from 'src/views/pages/admin/coupons/CouponRedeemers'
import RedeemerTableHeader from 'src/views/pages/admin/coupons/RedeemerTableHeader'
import CouponEditTab from 'src/views/pages/admin/coupons/CouponEditTab'
import { useEffect, useState } from 'react'
import { getRedeemers } from 'src/helpers/couponHelper'
import { useRouter } from 'next/router'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const CouponRedeemersPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [open, setOpen] = useState(false)
  const [itemId, setItemId] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)
  const [customers, setCustomers] = useState([])

  const handleChange = (event, value) => {
    console.log(event, value)
  }

  let fetchCustomers = async () => {
    try {
      let response = await getRedeemers({ page, search, limit, id })
      setCustomers(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [page, search])
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Customers List
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />
      <CouponEditTab />
      <Grid item xs={12}>
        <Card>
          <RedeemerTableHeader title='Search Filter' setSearch={setSearch} />
          <CouponRedeemers customers={customers} setPage={setPage} />
        </Card>
      </Grid>
    </Grid>
  )
}

CouponRedeemersPage.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default CouponRedeemersPage
