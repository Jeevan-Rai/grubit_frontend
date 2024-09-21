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
import OrderList from 'src/views/pages/admin/orders/OrderList'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Customers = () => {
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

      <Grid item xs={12}>
        <Card>
          <OrderTableHeader title='Search Filter' />
          <OrderList />
        </Card>
      </Grid>
    </Grid>
  )
}

Customers.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default Customers
