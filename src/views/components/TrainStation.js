import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

export default function TrainStation() {
  return (
    <>
      <Box
        sx={{
          width: { xs: '90%', md: '75%' },
          margin: '0px auto',
          background: 'url("/images/Grubit at train station background.png")',
          backgroundSize: 'cover',
          padding: { xs: '2em', md: '5em 2em' },
          borderRadius: '46px'
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: { xs: '22px', md: '40px' }, fontFamily: 'Anton', color: '#78B34E', textAlign: 'right' }}
          >
            GRUBIT <span style={{ color: '#F56700' }}>@</span> <br />
            YOUR PREFERRED TRAIN STATION
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '15px', md: '20px' },
              fontFamily: 'DM Sans',
              color: '#FFFFFF',
              textAlign: 'right',
              lineHEight: '35px',
              paddingLeft: { xs: '0px', md: '50%' },
              marginTop: '30px'
            }}
          >
            Enjoy the best meals on the go! Grub It services are available at nearly every Tube station in London,
            offering you convenient access to delicious, quality food while you commute. Satisfy your cravings with ease
            and make your journey tastier than ever!
          </Typography>
        </Box>
      </Box>
    </>
  )
}
