import MenuCard from './MenuCard'
import SectionHeader from './SectionHeader'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchMenuItems } from 'src/helpers/menuHelper'

const colors = {
  monday: {
    bg: '#FF9C70',
    color: '#FF9C70'
  },
  tuesday: {
    bg: '#FEAD71',
    color: '#FF9C70'
  },
  wednesday: {
    bg: '#78BFBE',
    color: '#FF9C70'
  },
  thursday: {
    bg: '#93E855',
    color: '#FF9C70'
  },
  friday: {
    bg: '#A0C982',
    color: '#FF9C70'
  }
}
export default function OurMenu() {
  const [menu, setMenu] = useState({})
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 300px)': {
        slides: { perView: 2, spacing: 5 }
      },
      '(min-width: 1000px)': {
        slides: { perView: 5, spacing: 10 }
      }
    },
    slides: { perView: 1 }
  })

  useEffect(() => {
    fetchMenuItems().then(response => {
      setMenu(response.data)
    })
  }, [])
  return (
    <>
      <Box
        component={'div'}
        sx={{
          width: '85%',
          margin: '0px auto'
        }}
      >
        <SectionHeader title='Our Menu' />
        <Box sx={{ padding: '20px' }} />
        <div ref={sliderRef} className='keen-slider'>
          {Object.keys(menu).map(day => {
            return <MenuCard key={day} day={day.toUpperCase()} options={[...menu[day]]} color={colors[day]} />
          })}

          {/* <MenuCard
            day={'TUESDAY'}
            options={[
              'Pesto Chicken Tenders',
              'Puddings',
              'Pesto Chicken Tenders',
              'Puddings',
              'Pesto Chicken Tenders',
              'Puddings'
            ]}
            color={'#FEAD71'}
          />
          <MenuCard
            day={'WEDNESDAY'}
            options={[
              'Pesto Chicken Tenders',
              'Puddings',
              'Pesto Chicken Tenders',
              'Puddings',
              'Pesto Chicken Tenders',
              'Puddings'
            ]}
            color={'#78BFBE'}
          />
          <MenuCard
            day={'THURSDAY'}
            options={[
              'Pesto Chicken Tenders',
              'Puddings',
              'Pesto Chicken Tenders',
              'Puddings',
              'Pesto Chicken Tenders',
              'Puddings'
            ]}
            color={'#93E855'}
          />
          <MenuCard
            day={'FRIDAY'}
            options={[
              'Pesto Chicken Tenders',
              'Puddings',
              'Pesto Chicken Tenders',
              'Puddings',
              'Pesto Chicken Tenders',
              'Puddings'
            ]}
            color={'#A0C982'}
          /> */}
        </div>
        <Box sx={{ padding: '20px' }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            component={Link}
            href='/menu'
            sx={{
              backgroundColor: '#F56700',
              color: '#000000',
              borderRadius: '80px',
              p: { xs: '10px 15px', md: '15px 50px' },
              fontWeight: 'bold',
              fontFamily: 'DM Sans'
            }}
          >
            ORDER NOW
          </Button>
        </Box>
        <Box sx={{ padding: '20px' }} />
      </Box>
    </>
  )
}
