import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

export default function TrainStation() {
  return (
    <>
      <Box
        sx={{
          width: { xs: '90%', md: '75%' },
          margin: '0px auto',
          background: 'url("/images/2148771049 (1) (1) 1.png")',
          backgroundSize: 'cover',
          backgroundPosition:"center",
          backgroundRepeat: 'no-repeat',
          padding: { xs: '2em', md: '5em 2em' },
    
          borderRadius: '46px'
          
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: { xs: '22px', md: '40px' }, fontFamily: 'Anton', color: '#78B34E', textAlign: 'right' }}
          >
            Grab Grubit  <span style={{ color: '#F56700' }}>@</span> <br />
            Your Preferred Train Station
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '15px', md: '18px' },
              fontFamily: 'DM Sans',
              color: '#FFFFFF',
              textAlign: 'right',
              lineHEight: '35px',
              paddingLeft: { xs: '0px', md: '50%' },
              marginTop: '30px'
            }}
          >
            Grab Grubit and Go at your preferred Train Station, when you arrive in the morning on your way to work from a convenient location.  

            <br/>

No need to stand in queue during lunch time, looking around what to have for lunch and settling for either low quality or costly tasteless food. 
          </Typography>
        </Box>
      </Box>
    </>
  )
}
