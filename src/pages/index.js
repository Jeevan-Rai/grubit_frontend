import { Box } from '@mui/material'
import AboutUs from 'src/views/components/AboutUs'
import HomeBanner from 'src/views/components/HomeBanner'
import HowItWorks from 'src/views/components/HowItWorks'
import TrainStation from 'src/views/components/TrainStation'
import OurMenu from 'src/views/components/OurMenu'
import OurPhilosophy from 'src/views/components/OurPhilosophy'
import Testimonials from 'src/views/components/Testimonials'
import Usernavbar from 'src/views/components/UserNavbar'
import WhyChooseUs from 'src/views/components/WhyChooseUs'
import ContactUs from 'src/views/components/ContactUs'
import UserFooter from 'src/views/components/UserFooter'

const Home = () => {
  return (
    <>
      <Usernavbar />
      <Box sx={{ padding: '40px' }} />
      <HomeBanner />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} />
      <OurMenu />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} />
      <HowItWorks />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} />
      <Testimonials />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} id='about' />
      <AboutUs />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} />
      <WhyChooseUs />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} />
      <OurPhilosophy />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} />
      <TrainStation />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} id='contact' />
      <ContactUs />
      <Box sx={{ padding: { xs: '20px', md: '30px' } }} />
      <UserFooter />
    </>
  )
}

export default Home

Home.getLayout = function getLayout(page) {
  return <>{page}</>
}
