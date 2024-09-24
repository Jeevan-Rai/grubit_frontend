// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import CreateCoupon from 'src/views/pages/admin/coupons/CreateCoupon'
import CouponEditTab from 'src/views/pages/admin/coupons/CouponEditTab'
import EditCoupon from 'src/views/pages/admin/coupons/EditCoupon'
import { useEffect, useState } from 'react'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const CreateMenuItems = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Add New Coupon
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />
      <CouponEditTab />
      <Grid item xs={12}>
        <Card>
          <EditCoupon />
        </Card>
      </Grid>
    </Grid>
  )
}

CreateMenuItems.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default CreateMenuItems
