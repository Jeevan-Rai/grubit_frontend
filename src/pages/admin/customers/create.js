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
import TableBasic from 'src/views/table/mui/TableBasic'
import TableDense from 'src/views/table/mui/TableDense'
import TableSpanning from 'src/views/table/mui/TableSpanning'
import TableCustomized from 'src/views/table/mui/TableCustomized'
import TableSortSelect from 'src/views/table/mui/TableSortSelect'
import TableCollapsible from 'src/views/table/mui/TableCollapsible'
import TableStickyHeader from 'src/views/table/mui/TableStickyHeader'
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import MenuItemsList from 'src/views/pages/admin/menu-items/MenuItemsList'
import MenuTableHeader from 'src/views/pages/admin/menu-items/MenuTableHeader'
import CreateMenu from 'src/views/pages/admin/menu-items/CreateMenu'

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
              Add Menu Items
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <CreateMenu />
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
