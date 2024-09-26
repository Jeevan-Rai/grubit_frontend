// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import CardStatsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import { CardContent } from '@mui/material'
import Analytics from "src/views/pages/charts/Analytics"
// import AnalyticsChart from '../../../views/pages/charts/Analytics'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Analytics = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Dashboard
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />

      <Grid container item xs={12}>
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <CardStatsHorizontal
              icon={'tabler:currency-euro'}
              stats={'25.8k'}
              title={'Total Revenue'}
              avatarColor={'info'}
            />
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <CardStatsHorizontal
              icon={'tabler:shopping-cart'}
              stats={'400k'}
              title={'Total Order'}
              avatarColor={'primary'}
            />
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <CardStatsHorizontal stats={'900'} title={'Total Users'} icon={'tabler:users'} avatarColor={'warning'} />
          </CardContent>
        </Grid>

        <Grid item md={12} >
          {/* <AnalyticsChart /> */}
        </Grid>
      </Grid>
    </Grid>
  )
}

Analytics.getLayout = page => (
  <Guard allowedRoles={['admin']}>
    <UserLayout>{page}</UserLayout>
  </Guard>
)
export default Analytics
