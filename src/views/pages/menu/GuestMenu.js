import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@mui/material'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from 'react'
import FoodItemCard from 'src/views/components/FoodItemCard'
import UserFooterLight from 'src/views/components/UserFooterLight'
import Usernavbar from 'src/views/components/UserNavbar'
import { fetchFoodItems, formatDate, generateWeeksForMonth, getCurrentWeekNumber } from 'src/helpers/menuHelper'
import Link from 'next/link'
import { useOrder } from 'src/context/OrderContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getWeekOfMonth } from 'date-fns'

const WeekButton = ({ week, active = false, onClick, currentWeekNumber }) => {
  return (
    <>
      {' '}
      <Button
        sx={{
          fontSize: { xs: '12px', md: '16px' },
          border: 'none',
          color: active ? '#FFFFFF' : '#FF833D',
          backgroundColor: active ? '#FF833D' : '',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#FF833D',
            border: 'none'
          }
        }}
        onClick={onClick}
        disabled={currentWeekNumber > week}
      >
        Week {week}
      </Button>
    </>
  )
}

const DayButton = ({ day, active = false, onClick }) => {
  return (
    <>
      {' '}
      <Button
        sx={{
          fontFamily: 'DM Sans',
          fontWeight: '500',
          color: '#5D586C',
          fontSize: { xs: '15px', md: '18px' },
          border: '1px solid #FD5B2980',
          borderRadius: '10px 20px 20px 10px',
          color: active ? '#FFFFFF' : '#FD5B29',
          background: active ? '#FD5B29' : '',
          margin: '0.25em',
          width: '90%',
          padding: '0.5em',
          textAlign: 'center',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#FD5B29'
          }
        }}
        className='keen-slider__slide'
        onClick={onClick}
      >
        {day}
      </Button>
    </>
  )
}

const ItemTypeButton = ({ type, active = false, Icon, onClick }) => {
  return (
    <>
      {' '}
      <Button
        sx={{
          fontFamily: 'DM Sans',
          fontWeight: '500',
          color: '#5D586C',
          fontSize: { xs: '15px', md: '18px' },
          border: '1px solid #096A5F80',
          color: active ? '#FFFFFF' : '#096A5F',
          background: active ? '#096A5F' : '',
          margin: '1em 0px',
          width: '90%',
          justifyContent: 'start',
          gap: { xs: '5px', md: '0.5em' },

          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#096A5F'
          }
        }}
        onClick={onClick}
      >
        {type === 'Weekly Items' && (
          <svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
          >
            <mask
              id='mask0_86_9493'
              style={{ maskType: 'alpha' }}
              maskUnits='userSpaceOnUse'
              x={0}
              y={0}
              width={24}
              height={24}
            >
              <rect width={24} height={24} fill='url(#pattern0_86_9493)' />
            </mask>
            <g mask='url(#mask0_86_9493)'>
              <rect width={24} height={24} fill='#FFC643' />
            </g>
            <defs>
              <pattern id='pattern0_86_9493' patternContentUnits='objectBoundingBox' width={1} height={1}>
                <use xlinkHref='#image0_86_9493' transform='scale(0.00195312)' />
              </pattern>
              <image
                id='image0_86_9493'
                width={512}
                height={512}
                xlinkHref='data:image/png;base64,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BikAANAgBQAAGqQAAECDFAAAaJACAAANUgAAoEEKAAA0SAEAgAYpAADQIAUAABqkAABAgxQAAGiQAgAADVIAAKBBCgAANEgBAIAGKQAA0CAFAAAapAAAQIMUAABokAIAAA1SAACgQQoAADRIAQCABikAANAgBQAAGqQAAECDFAAAaJACAAANUgAAoEEKAAA0SAEAgAYpAADQIAUAABqkAABAgxQAAGiQAgAADVIAAKBBCgAANEgBAIAGKQAA0CAFAAAapAAAQIMUAABokAIAAA1SAACgQQoAADRIAQCABikAANAgBQAAGqQAAECDFAAAaJACAAANUgAAoEEKAAA0SAEAgAYpAADQIAUAABqkAABAgxQAAGiQAgAADVIAAKBBCgAANEgBAIAGKQAA0CAFAAAapAAAQIMUAABokAIAAA1SAACgQQoAADRIAQCABikAANAgBQAAGqQAAECDFAAAaJACAAANUgAAoEEKAAA0SAEAgAYpAADQIAUAABqkAABAgxQAAGiQAgAADVIAAKBBCgAANEgBAIAGKQAA0CAFAAAapAAAQIMUAABokAIAAA1SAACgQQoAADRIAQCABikAANAgBQAAGqQAAECDFAAAaJACAAANUgAAoEEKAAA0SAEAgAYpAADQIAUAABqkAABAgxQAAGiQAgAADVIAAKBBCgAANEgBAIAGKQAA0CAFAAAapAAAQIMUAABokAIAAA1SAACgQQoAADRIAQCABikAANAgBQAAGqQAAECDFAAAaJACAAANUgAAoEEKAAA0SAEAgAYpAADQIAUAABqkAABAgxQAAGiQAgAADVIAAKBBCgAANEgBAIAGKQAA0CAFAAAapAAAQIMUAABokAIAAA1SAACgQQoAADRIAQCABikAANAgBQAAGqQAAECDFAAAaJACAAANUgAAoEEKAAA0SAEAgAYpAADQIAUAABqkAABAgxQAAGiQAgAADVIAAKBBCgAANEgBAIAGKQAA0CAFAAAapAAAQIMUAABokAIAAA1SAACgQQoAADRIAQCABikAANAgBQAAGqQAAECDFAB2VAdYAuaIMbE/rs0czUEB4ObqAEvgxuoAsBvH7Npuqg6wDBQAHChrUwAYE/vj2szRHBQAHCizfSfJrdUhYDdK+9p8rs1BAeBr1QFG7vrqALDC15LsrA4xcj7X5qAAcE11gJG7ujoArHBzkuuqQ4yc43YOCgAOlNnMD2Nkv5zN/MxBAeDvqwOMnPlhjD5XHWDkFIA5KAD8ddwzO8vfVAeAVXy8OsCIfTMKwFwUAL6R5DPVIUbqxiSfrA4Bq/hQdYAR+3D8UTMXBYAkuaI6wEh9JN1tgDA2X4m/cvfkw9UBloUCQJL8WXWAkXp/dQCYwXF7TzvjuIV12SvdbUU7je+O7UmO3MykQs8ekfrjZGzjrzY1o42xAkCS3JnkD6tDjMz7kny9OgTM8Mkkf1cdYmTeWh1gmSgA3OXN1QFG5i3VAWAO9tO73ZbkndUhYFm9P/VLeGMY16Y7LQJjd0iSG1J/zIxh/Pom5xKa9pjUH8RjGC/c7ETCgF6Z+mOmemxPcvwm5xGad2XqD+bK8cUke292EmFAR6V7Q2D1sVM5fmfTswjkEenufa8+oKvGMzY/hTC4l6X+2Kka305y7OanEEiSN6b+oK4YH1jE5EGBfZJ8NvXHUMW4dAHzB+xyWJKvpv7AHnLcluTURUweFDk/3SNwq4+lIcdVSbYtYvKAu12U7vkA1Qf4UOPfLmbaoNR/S/2xNNS4NclDFzNtwEq/mvqDfIjxrkVNGBTbO90bPquPqSHGTy5ozoBVbEvyl6k/0Psc16S7lxqm4oR0b/msPrb6HB6ABAM4JN15tuoDvo/xtTjvzzQ9MtO9NfCKJPsubqqAWY5Nd3989YG/yPHtJA9f4BzB2DwpyR2pP9YWOa5KcugiJwlY22lJ/jH1HwCLGP+S5PGLnR4YpWcnuT31x9wixqeS3Hux0wPM65gs/+mAryR52KInBkbsvCTfSv2xt5nxkbhWB8odnuW9MPCz6S6QgtacleS61B+DGxlvj3P+MBrbklyW5XpOwFuTHNjDXMCyOCrL9cbP7UlemmRLH5MBbM5FSf459R8Us8aNSX6irwmAJbM1ySvSfblWH5uzxjVJzuxpDoAFOTTJ6zLOFwi9J8lx/W06LK1T0737ovoYXTluT/JfkuzX36YDi3ZmxvMq4auS/GC/mwtLb0uS5yb5QuqP2R1J3p3kpF63GOjV96f7y7vipST/J93rfJ0zhPltTXfcVLxN8M50nxeeyQETckaSV6f/K49vSPKbSR47zGbBZG1N8sQkb0tyS/o9bv9fkl+Ku3Jg0vZKcmGS16Z7kMciVgauTvIbSZ4a5wqhDwenOz3w5iT/lM0fs3eke0nRK5OcHat0o+CXwNCOTPLodE8WPDXJ/dM93evAJPdKd1HhjemeY35TkuvTXRF8Tbov/r9N8uXBU0PbTkm3TH//dMfuCeluKzxw1zgg3RM27zp2v5LueL06yeeSfHzXv2NE/j9tDzJJi88fTwAAAABJRU5ErkJggg=='
              />
            </defs>
          </svg>
        )}

        {type === 'Create Your Own' && (
          <svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
          >
            <mask
              id='mask0_86_9498'
              style={{ maskType: 'alpha' }}
              maskUnits='userSpaceOnUse'
              x={0}
              y={0}
              width={24}
              height={24}
            >
              <rect width={24} height={24} fill='url(#pattern0_86_9498)' />
            </mask>
            <g mask='url(#mask0_86_9498)'>
              <rect width={24} height={24} fill='#096A5F' />
            </g>
            <defs>
              <pattern id='pattern0_86_9498' patternContentUnits='objectBoundingBox' width={1} height={1}>
                <use xlinkHref='#image0_86_9498' transform='scale(0.00195312)' />
              </pattern>
              <image
                id='image0_86_9498'
                width={512}
                height={512}
                xlinkHref='data:image/png;base64,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'
              />
            </defs>
          </svg>
        )}
        {type}
      </Button>
    </>
  )
}

export default function GuestMenu() {
  const year = new Date().getFullYear() // Use current year
  const month = new Date().getMonth() + 1 // Use current month

  const weeks = generateWeeksForMonth(month, year)
  const currentWeekNumber = getWeekOfMonth(new Date())
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [orderCategory, setOrderCategory] = useState('weekly')
  const [selectedWeek, setSelectedWeek] = useState(currentWeekNumber)
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }))
  const { orders } = useOrder()
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const [selectedDay, setSelectedDay] = useState(tomorrow.toLocaleString('en-US', { weekday: 'long' }))
  const [menuItems, setMenuItems] = useState([])

  const handleTabChange = (event, newValue) => {
    console.log(newValue)

    setSelectedWeek(newValue)
    const date1 = new Date(selectedDate)
    const date2 = new Date(weeks[newValue - 1]?.dates[0]?.date.toLocaleDateString())
    setSelectedDate(new Date().toLocaleDateString())
    if (date2.getTime() > date1.getTime()) {
      setSelectedDate(weeks[newValue - 1]?.dates[0]?.date.toLocaleDateString())
    }
  }

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 400px)': {
        slides: { perView: 2, spacing: 5 }
      },
      '(min-width: 1000px)': {
        slides: { perView: 7, spacing: 5 },
        vertical: 'true',
        loop: false,
        disabled: true
      }
    },
    slides: { perView: 1 }
  })

  let fetchMenuItems = async (day, category) => {
    try {
      const response = await fetchFoodItems(day, category)
      setMenuItems(response.data)
      console.log(response)
    } catch (error) {}
  }

  useEffect(() => {
    fetchMenuItems(selectedDay, orderCategory)
  }, [selectedDay, orderCategory])

  console.log(selectedDate)
  return (
    <>
      <Usernavbar />
      <Box sx={{ padding: '45px' }} />
      <Box sx={{ minHeight: '100vh', background: '#77B24D', padding: { xs: '40px 0px', md: '45px 0px' } }}>
        <Box sx={{ width: { xs: '90%', md: '85%' }, margin: '0px auto' }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '30px', md: '50px' },
              fontFamily: 'Anton',
              color: '#FFFFFF',
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Nutrition Catered to Your Needs
          </Typography>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: '500',
                  color: '#FFFFFF',
                  textAlign: { xs: 'center', md: 'left' },
                  padding: { xs: '1em 0px', md: '0px' }
                }}
              >
                Explore among our wide range of healthy choices
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'end' }}>
              <ButtonGroup sx={{ background: '#FFFFFF', border: 'none', color: '#FF833D' }}>
                {weeks.map((week, index) => (
                  <WeekButton
                    key={index}
                    week={week.weekNumber}
                    active={selectedWeek === week.weekNumber}
                    onClick={e => handleTabChange(e, week.weekNumber)}
                    currentWeekNumber={currentWeekNumber}
                  ></WeekButton>
                ))}

                {/* <WeekButton week={'Week 2'}></WeekButton>
                <WeekButton week={'Week 3'} active={true}></WeekButton>
                <WeekButton week={'Week 4'}></WeekButton>
                <WeekButton week={'Week 5'}></WeekButton> */}
              </ButtonGroup>
            </Grid>
          </Grid>
          <Box sx={{ padding: { xs: '10px', md: '30px' } }} />

          <Grid
            container
            sx={{
              background: '#FFF8DE',
              borderRadius: '20px',
              padding: '1em',
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <Grid xs={12} md={12} sx={{ display: { md: 'none' } }}>
              <Grid container>
                <Grid item xs={6} md={3}>
                  <ItemTypeButton
                    type={'Weekly Items'}
                    Icon={''}
                    active={orderCategory === 'weekly'}
                    onClick={() => setOrderCategory('weekly')}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <ItemTypeButton
                    type={'Create Your Own'}
                    Icon={''}
                    active={orderCategory === 'make-your-own'}
                    onClick={() => setOrderCategory('make-your-own')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} minHeight={'20rem'}>
              <Typography sx={{ fontFamily: 'DM Sans', fontWeight: '700', color: '#5D586C', fontSize: '18px' }}>
                Days of the Week
              </Typography>
              <Box sx={{ padding: '10px' }} />
              <div ref={sliderRef} className='keen-slider'>
                {selectedWeek !== null &&
                  weeks[selectedWeek - 1]?.dates.map((day, index) => (
                    // <Typography key={index}>
                    //   {day.dayName}: {day.date.toLocaleDateString()}
                    // </Typography>
                    <DayButton
                      day={formatDate(day.date.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}))}
                      active={selectedDate === day.date.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})}
                      key={index}
                      onClick={() => {
                        setSelectedDate(day.date.toLocaleDateString()), setSelectedDay(day.dayName)
                      }}
                    />
                  ))}

                {/* <DayButton day={'Tuesday (9th Aug)'} active={true} />
                <DayButton day={'Monday (8th Aug)'} />
                <DayButton day={'Monday (8th Aug)'} />
                <DayButton day={'Monday (8th Aug)'} />
                <DayButton day={'Monday (8th Aug)'} />
                <DayButton day={'Monday (8th Aug)'} /> */}
              </div>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Grid item xs={6} md={3}>
                  <ItemTypeButton
                    type={'Weekly Items'}
                    Icon={''}
                    active={orderCategory === 'weekly'}
                    onClick={() => setOrderCategory('weekly')}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <ItemTypeButton
                    type={'Create Your Own'}
                    Icon={''}
                    active={orderCategory === 'make-your-own'}
                    onClick={() => setOrderCategory('make-your-own')}
                  />
                </Grid>
              </Grid>

              {/* =============== Cards ========== */}
              <Grid
                container
                sx={{
                  height: { xs: '90vh', md: 'initial' },
                  overflowY: { xs: 'scroll', md: 'none' },
                  '&::-webkit-scrollbar': {
                    display: 'none' // Chrome, Safari, and Opera
                  }
                }}
              >
                {menuItems?.map((item, index) => {
                  return (
                    <Grid item xs={12} md={3} key={index}>
                      <FoodItemCard week={selectedWeek} date={selectedDate} item={item} type={orderCategory} />
                    </Grid>
                  )
                })}

                {menuItems.length == 0 && <> No Items available for selected date</>}
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ padding: { xs: '10px', md: '30px' } }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#F56700',
                color: '#000000',
                borderRadius: '80px',
                p: { xs: '10px 15px', md: '15px 50px' },
                fontWeight: 'bold',
                fontFamily: 'DM Sans'
              }}
              onClick={() => {
                orders.totalPrice > 0 ? router.replace('/cart') : toast.error('Please add aleast one item to cart')
              }}
            >
              ORDER NOW
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />
      <UserFooterLight />
    </>
  )
}
