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

import AnalyticsChart from '../../../views/pages/charts/AnalyticsChart'

import { useState, useEffect } from 'react'

import 'chart.js/auto'
import axiosInstance from 'src/helpers/axiosInstance'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Analytics = () => {
  const [data, setData] = useState(null)
  const [start, setStart] = useState({})
  const [end, setEnd] = useState({})

  const fetchData = async () => {
    let response = await axiosInstance.post('/analytics', { start, end })
    setData(response.data)
  }
  useEffect(() => {
    fetchData()
  }, [start, end])

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
              stats={data?.revenue?.sum.toFixed(2)}
              title={'Total Revenue'}
              avatarColor={'info'}
            />
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <CardStatsHorizontal
              icon={'tabler:shopping-cart'}
              stats={data?.orders?.length}
              title={'Total Orders'}
              avatarColor={'primary'}
            />
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <CardStatsHorizontal
              stats={data?.users?.length}
              title={'Total Users'}
              icon={'tabler:users'}
              avatarColor={'warning'}
            />
          </CardContent>
        </Grid>

        <Grid item md={12}>
          <AnalyticsChart chartData={data} yellow={'#FFA266'} labelColor={'#4B465C'} borderColor={'#DBDADE'} />
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
