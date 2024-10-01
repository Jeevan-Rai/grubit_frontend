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
import { useEffect, useState } from 'react'
import { getOrderItems } from 'src/helpers/orderHelper'
import OrderItemList from 'src/views/pages/admin/orders/OrderItemList'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

function categorizeByOrderID(orders) {
  const categorizedOrders = {}

  orders?.forEach(order => {
    // Extract the date from the createdAt property
    const orderId = order.orderId

    // Initialize the date entry if it doesn't exist
    if (!categorizedOrders[orderId]) {
      categorizedOrders[orderId] = []
    }

    categorizedOrders[orderId] = [...categorizedOrders[orderId], order]
  })

  // Convert the object into an array of objects
  return Object.keys(categorizedOrders).map(element => categorizedOrders[element])
}

const Orders = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [date, setDate] = useState(new Date())

  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(10)
  const [orders, setOrders] = useState([])

  const handleChange = (event, value) => {
    setPage(value)
  }

  let fetchOrders = async () => {
    try {
      let response = await getOrderItems({ page, search, limit, date })
      response.data.orderswithPagination = categorizeByOrderID(response.data.orderswithPagination)
      response.data.orders = categorizeByOrderID(response.data.orders)
      setOrders(response.data)
      console.log(response.data.orderswithPagination)
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
              Orders
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <OrderTableHeader title='Search Filter' setSearch={setSearch} date={date} setDate={setDate} />
          <OrderItemList
            orders={orders}
            handleChange={handleChange}
            fetchOrders={fetchOrders}
            setPage={setPage}
            page={page}
            date={date}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

Orders.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default Orders
