import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
export default function StepCard({ step, title, description, Icon }) {
  return (
    <>
      <Grid item xs={6} sm={6} md={3}>
        <CardContent sx={{ padding: { xs: '0.5em', display: 'flex', alignItems: 'center' } }}>
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: '2em',
              minHeight: '15rem',
              border: '1px solid #78B34E',
              borderTop: '2px solid #78B34E',
              borderRadius: '35px',
              alignItems: 'center',
              padding: '3em 1em',
              width: '100%'
            }}
          >
            {/* <Icon /> */}
            <Box>
              {/* <Typography sx={{ fontFamily: 'DM sans', fontSize: '15px', fontWeight: '700', textAlign: 'center' }}>
                {step}
              </Typography> */}
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
                {title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM sans',
                  fontSize: '18px',
                  textAlign: 'center',
                  color: '#000000',
                  fontWeight: '500',
                  width:{md:"90%"},
                  margin:"0px auto"
                }}
              >
                {description}
              </Typography>
            </Box>
          </Card>
        </CardContent>
      </Grid>
    </>
  )
}
