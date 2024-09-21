import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import SectionHeader from './SectionHeader'

export default function AboutUs() {
  return (
    <>
      <Grid container sx={{ width: { xs: '90%', md: '75%' }, margin: '0px auto' }}>
        <Grid item xs={12} sm={6} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            component={'img'}
            src={'/images/Rectangle 7.png'}
            sx={{
              width: '80%',
              marginTop: '5rem'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={7} sx={{}}>
          <SectionHeader title='About Us' align='left' />
          <Typography
            sx={{
              color: '#0A5247',
              fontSize: '24px',
              lineHeight: '40px',
              fontFamily: 'DM Sans',
              textAlign: 'justify'
            }}
          >
            Welcome to GrubIt – your go-to destination for fresh, wholesome, and organic food platters conveniently
            delivered to your nearest tube station. We understand the hustle of daily life, and that's why we've
            designed a service that ensures you start your day with a nutritious and delicious lunch. At GrubIt, we've
            simplified the process for you. Simply pre-order your lunch with us, and we'll make sure it's waiting for
            you at the tube station that suits your commute best. Our mission is to provide you with a healthier,
            tastier, and more fulfilling alternative than what's currently available in the market. Make the choice to
            be healthy without spending a fortune. GrubIt is here to redefine your lunchtime experience – delivering
            goodness, taste, and value right to your daily commute. Join us on a journey towards a healthier and happier
            you!
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
