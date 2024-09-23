import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

export default function HomeBanner() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: { xs: '50vh', md: '100vh' },
          backgroundImage: 'url("images/banner.png")',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: '85%'
          }}
        >
          <Typography
            variant='h1'
            sx={{
              width: { xs: '100%', md: '70%' },
              fontSize: { xs: '30px', md: '64px' },
              color: 'white',
              marginBottom: '2rem',
              fontFamily: 'Anton'
            }}
          >
            Elevate Your Lifestyle with Healthy, Convenient Dining.
          </Typography>
          <Typography
            sx={{
              width: { xs: '100%', md: '70%' },
              fontSize: { xs: '15px', md: '24px' },
              color: 'white',
              marginBottom: '2rem',
              fontFamily: 'DM Sans'
            }}
          >
            Say goodbye to compromise and hello to fresh, wholesome, and delicious meals that cater to your busy life.
          </Typography>
          <Button
            variant='contained'
            component={Link}
            href='/menu'
            sx={{
              backgroundColor: '#F56700',
              color: '#000000',
              borderRadius: '80px',
              p: { xs: '10px 15px', md: '15px 50px' },
              border: '1px solid #000000',
              fontWeight: 'bold',
              fontFamily: 'DM Sans'
            }}
          >
            GET STARTED
          </Button>
        </Box>
      </Box>
    </>
  )
}
