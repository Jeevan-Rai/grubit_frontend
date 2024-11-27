import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import SectionHeader from './SectionHeader'

export default function AboutUs() {
  return (
    <>
      <Grid container sx={{ width: { xs: '90%', md: '75%' }, margin: '0px auto' }} id='about'>
        <Grid item xs={12} sm={6} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            component={'img'}
            src={'/images/About us img 1.jpg'}
            sx={{
              width: '80%',
              height:"90%",
              marginTop: '5rem',
              borderRadius:"15px"
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={7} sx={{}}>
          <SectionHeader title='About us' align='left' />
          <Typography
            sx={{
              color: '#0A5247',
              fontSize: { xs: '16px', md: '24px' },
              lineHeight: '40px',
              fontFamily: 'DM Sans',
              textAlign: 'justify'
            }}
          >
            Welcome to Grubit 

            <br/>

Grubit was started with only one mission – to provide you with healthy, quality and affordable packed lunch. 

<br/>

We found Grubit to solve the challenge of you not having time to prepare home cooked packed lunches along with cooking dinner after a tiring and exhaustive day of work.  

And when you do, it will either be some kind of sandwich put together in a hurry or cold Pasta.  

 
<br/>
We know that you would like to avoid supermarket or market bought lunch if you could, as we founders did when working across Central London. And that is the sole reason we founded GRUBIT as a disruptive idea.  

<br/>

Your meal as packed lunch ready for you to be collected at your preferred station on you way to work, cooked only once you ordered as you would do at your home……Healthy, 3 course as standard and at affordable cost. 
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
