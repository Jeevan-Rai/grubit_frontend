import { TabContext, TabPanel } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTabList from '@mui/lab/TabList'
import { Box, Grid, Tab } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { color } from '@mui/system'

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: '#FF856B',
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root a': {
    color: `${theme.palette.secondary.dark} !important`
  },
  '& .Mui-selected a': {
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: '#FF856B'
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))
export default function CouponEditTab() {
  let router = useRouter()
  const activeTab = router.pathname.includes('edit') ? 'details' : 'redeemers'

  return (
    <>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabList variant='scrollable' scrollButtons='auto' aria-label='customized tabs example'>
                <Tab
                  component={Link}
                  href={'/admin/coupons/6/edit'}
                  value='details'
                  label={<Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>Details</Box>}
                />{' '}
                <Tab
                  component={Link}
                  href={'/admin/coupons/9/redeemers'}
                  value='redeemers'
                  label={<Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>Redeemers</Box>}
                />
              </TabList>
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </>
  )
}
