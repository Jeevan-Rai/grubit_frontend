// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import CouponTableHeader from 'src/views/pages/admin/coupons/CouponTableHeader'
import CouponList from 'src/views/pages/admin/coupons/CouponList'
import { useEffect, useState } from 'react'
import { deleteCoupon, getCouponItems } from 'src/helpers/couponHelper'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const PickupLocation = () => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [limit, setLimit] = useState(10)
  const [coupons, setCoupons] = useState([])
  

  let fetchCoupons = async () => {
    try {
      let response = await getCouponItems({ page, search, start , end , limit })
      setCoupons(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCoupons()
  }, [page, search , start , end])
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Coupon List
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Discount Coupons' />
          <CouponTableHeader setSearch={setSearch} start={start} end={end} setStart={setStart} setEnd={setEnd}/>
          <CouponList coupons={coupons} open={open} setOpen={setOpen} page={page} fetchCoupons={fetchCoupons} setPage={setPage} />
        </Card>
      </Grid>
    </Grid>
  )
}

PickupLocation.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default PickupLocation
