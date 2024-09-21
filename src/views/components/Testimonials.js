import { Box, Typography } from '@mui/material'
import TestimonialCard from './TestimonialCard'

export default function Testimonials() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          minHeight: '85vh',
          background: 'url("images/Rectangle 4.svg")',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ height: '80%', width: { xs: '90%', md: '85%' }, padding: { xs: '5rem 0px', md: '0' } }}>
          <Typography
            variant='h1'
            sx={{ fontSize: '50px', fontFamily: 'Anton', color: '#FFFFFF', textAlign: 'left', marginTop: '2em ' }}
          >
            What our <br></br> customers say?
          </Typography>

          <TestimonialCard />
        </Box>
      </Box>
    </>
  )
}
