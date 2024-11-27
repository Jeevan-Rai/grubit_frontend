import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

export default function HomeBanner() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: { xs: '50vh', md: '70vh' },
          backgroundImage: 'url("/images/videos/5866259-sd_960_540_25fps.mp4")',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position:"relative"
        }}
      >
        <Box
        component="video"
        
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          filter: "blur(4px)",
        }}
        autoPlay
        loop
        muted
        >
  <source src="/images/videos/1408847_Weekly Meal Planning_Meal Prep_1920x1080 (1).mp4" type="video/mp4" />
        </Box>
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
            Healthy Fresh and Affordable 3 Course Lunch…Everyday! 
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
           Innovative way to order and conveniently collect your lunch from a variety of cuisines. No more supermarket cold meal or costly London market food. 
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
