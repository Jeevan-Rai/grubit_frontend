import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import SectionHeader from './SectionHeader'
import StepCard from './StepsCard'

export default function HowItWorks() {
  const stepOneIcon = () => {
    return (
      <>
        <svg width='48' height='50' viewBox='0 0 48 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clip-path='url(#clip0_100_8149)'>
            <path
              d='M13.7422 6.33775H34.0296V1.95067C34.0296 0.839231 33.1698 0 32.1909 0C32.0003 0 31.8054 0.0317721 31.6112 0.0996045L13.7422 6.33775Z'
              fill='#489114'
            />
            <path
              d='M37.7101 9.26172H9.62669C8.60961 9.26172 7.78516 10.1344 7.78516 11.2109V37.07V48.0509C7.78516 49.1275 8.60961 50.0002 9.62669 50.0002H37.7101C38.7272 50.0002 39.5517 49.1275 39.5517 48.0509V11.2109C39.5517 10.1345 38.7271 9.26172 37.7101 9.26172ZM14.4607 26.8362H14.8608C15.4562 22.8015 18.4755 19.6057 22.2873 18.9755V18.243C22.2873 17.4356 22.9057 16.7811 23.6684 16.7811C24.4312 16.7811 25.0496 17.4356 25.0496 18.243V18.9755C28.8614 19.6057 31.8807 22.8015 32.476 26.8362H32.8761C33.6389 26.8362 34.2573 27.4907 34.2573 28.2981C34.2573 29.1054 33.6389 29.76 32.8761 29.76H14.4607C13.698 29.76 13.0796 29.1054 13.0796 28.2981C13.0796 27.4907 13.6979 26.8362 14.4607 26.8362ZM23.007 35.1714C23.007 35.9787 22.3886 36.6333 21.6259 36.6333H14.9963C14.2336 36.6333 13.6152 35.9787 13.6152 35.1714C13.6152 34.364 14.2336 33.7095 14.9963 33.7095H21.6259C22.3886 33.7095 23.007 34.364 23.007 35.1714ZM32.5308 42.4809H14.806C14.0433 42.4809 13.4249 41.8264 13.4249 41.019C13.4249 40.2116 14.0433 39.5571 14.806 39.5571H32.5308C33.2936 39.5571 33.912 40.2116 33.912 41.019C33.912 41.8264 33.2936 42.4809 32.5308 42.4809Z'
              fill='#489114'
            />
            <path
              d='M29.6641 26.8354C29.0355 23.9461 26.5857 21.7852 23.668 21.7852C20.7504 21.7852 18.3005 23.9462 17.6719 26.8354H29.6641Z'
              fill='#489114'
            />
          </g>
          <defs>
            <clipPath id='clip0_100_8149'>
              <rect width='47.2381' height='50' fill='white' transform='translate(0.0507812)' />
            </clipPath>
          </defs>
        </svg>
      </>
    )
  }
  return (
    <>
      <SectionHeader title={'How It Works'} />
      <Box sx={{ padding: '20px' }} />

      <Grid container item xs={12} sx={{ width: { xs: '90%', md: '85%' }, margin: '0px auto' }}>
        <StepCard step={'STEP 1'} title={'Select'} description={''} Icon={stepOneIcon} />
        <StepCard step={'STEP 1'} title={'Select'} description={''} Icon={stepOneIcon} />
        <StepCard step={'STEP 1'} title={'Select'} description={''} Icon={stepOneIcon} />
        <StepCard step={'STEP 1'} title={'Select'} description={''} Icon={stepOneIcon} />
      </Grid>
    </>
  )
}
