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
import CreateLocation from 'src/views/pages/admin/pickup-locations/CreateLocation'
import EditLocation from 'src/views/pages/admin/pickup-locations/EditLocation'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const PickuLocationEditPage = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Add New Pickup Location
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <EditLocation />
        </Card>
      </Grid>
    </Grid>
  )
}

PickuLocationEditPage.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default PickuLocationEditPage
