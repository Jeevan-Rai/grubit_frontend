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
import CreateMenu from 'src/views/pages/admin/menu-items/CreateMenu'
import EditMenu from 'src/views/pages/admin/menu-items/EditMenu'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const CreatePickupLocation = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Update Menu Items
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <EditMenu />
        </Card>
      </Grid>
    </Grid>
  )
}

CreatePickupLocation.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default CreatePickupLocation
