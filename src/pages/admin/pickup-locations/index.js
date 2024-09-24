// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import PageHeader from 'src/@core/components/page-header'
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import LocationTableHeader from 'src/views/pages/admin/pickup-locations/LocationTableHeader'
import LocationList from 'src/views/pages/admin/pickup-locations/LocationList'
import { useEffect, useState } from 'react'
import { getStations } from 'src/helpers/stationHelper'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const PickupLocation = () => {
  const [open, setOpen] = useState(false)
  const [itemId, setItemId] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState(null)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(10)
  const [stations, setStations] = useState([])

  const handleChange = (event, value) => {
    setPage(value)
  }

  const onDelete = async () => {
    try {
      let response = await deleteStation(itemId)
      fetchMenuItems()
      setOpen(false)
    } catch (error) {}
  }

  let fetchStations = async () => {
    try {
      let response = await getStations({ page, search, limit, date, status })
      setStations(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStations()
  }, [page, search, date, status])
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Location List
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filter' />
          <LocationTableHeader setSearch={setSearch} date={date} setDate={setDate} setStatus={setStatus} />
          <LocationList
            stations={stations}
            onDelete={onDelete}
            handleChange={handleChange}
            setItemId={setItemId}
            setOpen={setOpen}
            open={open}
          />
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
