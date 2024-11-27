import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import Link from 'next/link'
export default function UserFooterLight() {
  return (
    <>
      <Box sx={{ width: { xs: '90%', md: '82%' }, margin: '0px auto' }}>
        <Grid container sx={{ marginTop: '40px' }}>
          <Grid xs={12} md={3}>
            <Typography>
            <Box component={'img'} src='/images/logo.png' sx={{ width: '100px' }} />

            </Typography>
            <Typography sx={{ fontSize: '20px', color: '#0A5247', fontFamily: 'DM Sans', marginTop: '10px' }}>
            Grab Grub Go
            </Typography>
            <Box sx={{ display: 'flex', gap: '1em', marginTop: '10px' }}>
              <svg width={46} height={46} viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect x='0.5' y='0.5' width={45} height={45} rx='22.5' stroke='#0A5247' />
                <g clipPath='url(#clip0_100_8084)'>
                  <path
                    d='M28.6008 16.6008H30.2008M18.2008 11.8008H27.8008C29.4982 11.8008 31.126 12.4751 32.3263 13.6753C33.5265 14.8755 34.2008 16.5034 34.2008 18.2008V27.8008C34.2008 29.4982 33.5265 31.126 32.3263 32.3263C31.126 33.5265 29.4982 34.2008 27.8008 34.2008H18.2008C16.5034 34.2008 14.8755 33.5265 13.6753 32.3263C12.4751 31.126 11.8008 29.4982 11.8008 27.8008V18.2008C11.8008 16.5034 12.4751 14.8755 13.6753 13.6753C14.8755 12.4751 16.5034 11.8008 18.2008 11.8008ZM23.0008 27.8008C21.7277 27.8008 20.5068 27.2951 19.6067 26.3949C18.7065 25.4947 18.2008 24.2738 18.2008 23.0008C18.2008 21.7277 18.7065 20.5068 19.6067 19.6067C20.5068 18.7065 21.7277 18.2008 23.0008 18.2008C24.2738 18.2008 25.4947 18.7065 26.3949 19.6067C27.2951 20.5068 27.8008 21.7277 27.8008 23.0008C27.8008 24.2738 27.2951 25.4947 26.3949 26.3949C25.4947 27.2951 24.2738 27.8008 23.0008 27.8008Z'
                    stroke='#0A5247'
                    strokeWidth={2}
                  />
                </g>
                <defs>
                  <clipPath id='clip0_100_8084'>
                    <rect width={24} height={24} fill='white' transform='translate(11 11)' />
                  </clipPath>
                </defs>
              </svg>

              <svg width={46} height={46} viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect x='0.5' y='0.5' width={45} height={45} rx='22.5' stroke='#0A5247' />
                <path
                  d='M28 13H25C23.6739 13 22.4021 13.5268 21.4645 14.4645C20.5268 15.4021 20 16.6739 20 18V21H17V25H20V33H24V25H27L28 21H24V18C24 17.7348 24.1054 17.4804 24.2929 17.2929C24.4804 17.1054 24.7348 17 25 17H28V13Z'
                  stroke='#0A5247'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <svg width={46} height={46} viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect x='0.5' y='0.5' width={45} height={45} rx='22.5' stroke='#0A5247' />
                <path
                  d='M14 32L21.548 24.452M21.548 24.452L14 14H19L24.452 21.548M21.548 24.452L27 32H32L24.452 21.548M32 14L24.452 21.548'
                  stroke='#0A5247'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Box>
          </Grid>
          <Grid xs={12} md={3}>
              <Typography
                sx={{
                  color: '#0A5247',
                  fontWeight: '700',
                  marginTop: { xs: '1em', md: '0px' },
                  fontFamily: 'DM Sans',
                  fontSize: '20px'
                }}
              >
                Office Hours
              </Typography>

              <Box sx={{ marginTop: '0.5em' }}>
                <Typography
                  sx={{
                    color: '#0A5247',
                    padding: '0.25em',
                    fontWeight: '400',
                    fontFamily: 'DM Sans',
                    fontSize: '18px'
                  }}
                >
                  Monday to Friday   <br/>
                  09:00 – 17:00 
                </Typography>
               
              </Box>
                 
            </Grid>
            <Grid xs={12} md={3}>
             
              <Typography
                sx={{
                  color: '#0A5247',
                  fontWeight: '700',
                  marginTop: { xs: '1em', md: '0px' },
                  fontFamily: 'DM Sans',
                  fontSize: '20px'
                }}
              >
               Customer Service
              </Typography>
              <Box sx={{ marginTop: '0.5em' }}>
                <Typography
                  sx={{
                    color: '#0A5247',
                    padding: '0.25em',
                    fontWeight: '400',
                    fontFamily: 'DM Sans',
                    fontSize: '18px'
                  }}
                >
                  Monday to Friday   <br/>
                  09:00 – 17:00 
                </Typography>
                <Typography
                sx={{
                  color: '#0A5247',
                  padding: '0.25em',
                  fontWeight: '400',
                  fontFamily: 'DM Sans',
                  fontSize: '18px'
                }}
              >
                Call us: 0208 000 0000  


              </Typography>
           
              <Typography
                sx={{
                  color: '#0A5247',
                  padding: '0.25em',
                  fontWeight: '400',
                  fontFamily: 'DM Sans',
                  fontSize: '18px'
                }}
              >
              Email: hello@grubit.uk 
              </Typography>
               
              </Box>
            </Grid>
            <Grid xs={12} md={3}>
            <Typography
                sx={{
                  color: '#0A5247',
                  fontWeight: '700',
                  marginTop: { xs: '1em', md: '0px' },
                  fontFamily: 'DM Sans',
                  fontSize: '20px'
                }}
              >
               Registered office
              </Typography> 
              <Typography
                sx={{
                  color: '#0A5247',
                  padding: '0.25em',
                  fontWeight: '400',
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  marginTop: { xs: '1em', md: '0px' }
                }}
              >
                7 Bell Yard 


              </Typography>
              <Typography
                sx={{
                  color: '#0A5247',
                  padding: '0.25em',
                  fontWeight: '400',
                  fontFamily: 'DM Sans',
                  fontSize: '18px'
                }}
              >
               London WC2A 2JR 
              </Typography>
              <br/>
              <Typography
                sx={{
                  color: '#0A5247',
                  fontWeight: '700',
                  marginTop: { xs: '1em', md: '0px' },
                  fontFamily: 'DM Sans',
                  fontSize: '20px'
                }}
              >
                Quick Links
              </Typography>

              <Box sx={{ marginTop: '0.5em' }}>
               
                <Typography
                  component={Link}
                  href={'/#testimonials'}
                  sx={{
                    display: 'block',
                    color: '#0A5247',
                    padding: '0.25em',
                    fontWeight: '400',
                    fontFamily: 'DM Sans',
                    fontSize: '18px',
                    textDecoration: 'none'
                  }}
                >
                  Testimonials
                </Typography>

                <Typography
                  component={Link}
                  href={'#'}
                  sx={{
                    display: 'block',
                    color: '#0A5247',
                    padding: '0.25em',
                    fontWeight: '400',
                    fontFamily: 'DM Sans',
                    fontSize: '18px',
                    textDecoration: 'none'
                  }}
                >
Terms & Privacy 
                </Typography>
              </Box>
              
              
            </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: '30px' }} />
    </>
  )
}
