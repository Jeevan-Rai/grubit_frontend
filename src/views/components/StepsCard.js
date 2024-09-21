import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
export default function StepCard({ step, title, description, Icon }) {
  return (
    <>
      <Grid item xs={6} sm={6} md={3}>
        <CardContent sx={{ padding: { xs: '0.5em' } }}>
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '2em',
              minHeight: '20rem',
              border: '1px solid #78B34E',
              borderTop: '2px solid #78B34E',
              borderRadius: '35px',
              alignItems: 'center',
              padding: '1em'
            }}
          >
            <Icon />
            <Box>
              <Typography sx={{ fontFamily: 'DM sans', fontSize: '15px', fontWeight: '700', textAlign: 'center' }}>
                STEP 1
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM sans',
                  fontSize: '20px',
                  fontWeight: '700',
                  textAlign: 'center',
                  color: '#000000',
                  margin: '0.5em 0px'
                }}
              >
                Select
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM sans',
                  fontSize: '13px',
                  textAlign: 'center',
                  color: '#000000',
                  fontWeight: '500'
                }}
              >
                Choose your meal from our carefully crafted menu
              </Typography>
            </Box>
          </Card>
        </CardContent>
      </Grid>
    </>
  )
}
