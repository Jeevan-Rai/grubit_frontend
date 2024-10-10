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

// ** Demo Components Imports
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import CustomerList from 'src/views/pages/admin/customers/CustomerList'
import CustomerTableHeader from 'src/views/pages/admin/customers/CustomerTableHeader'
import { useEffect, useState } from 'react'
import { getCustomers } from 'src/helpers/authHelpers'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Customers = () => {
  const [open, setOpen] = useState(false)
  const [itemId, setItemId] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)
  const [customers, setCustomers] = useState([])

  const handleChange = (event, value) => {
    setPage(value)
  }

  let fetchCustomers = async () => {
    try {
      let response = await getCustomers({ page, search, limit })
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

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filter' />
          <CustomerTableHeader setSearch={setSearch} />
          <CustomerList customers={customers} handleChange={handleChange} />
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
