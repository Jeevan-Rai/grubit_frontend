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
import MainUserLayout from 'src/layouts/MainUserLayout'
import OrderHistoryList from 'src/views/pages/admin/orders/OrderHistoryList'
import { getOrderHistory } from 'src/helpers/orderHelper'
import { useEffect, useState } from 'react'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Customers = () => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [itemId, setItemId] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [date, setDate] = useState(null)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(10)
  const [orders, setOrders] = useState([])

  const handleChange = (event, value) => {
    setPage(value)
  }

  let fetchOrders = async () => {
    try {
      let response = await getOrderHistory({ page, search, limit, date })
      setOrders(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [page, search, date])
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

      <Grid item xs={12}>
        <Card>
          <OrderTableHeader title='Search Filter' setSearch={setSearch} date={date} setDate={setDate} />

          <OrderHistoryList
            orders={orders}
            handleChange={handleChange}
            fetchOrders={fetchOrders}
            setPage={setPage}
            page={page}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

Customers.getLayout = page => (
  <Guard allowedRoles={['user']}>
    <MainUserLayout>{page}</MainUserLayout>
  </Guard>
)
export default Customers
