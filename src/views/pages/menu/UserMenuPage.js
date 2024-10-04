import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@mui/material'
import { useKeenSlider } from 'keen-slider/react'
import Icon from 'src/@core/components/icon'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from 'react'
import FoodItemCard from 'src/views/components/FoodItemCard'
import {
  fetchFoodItems,
  formatDate,
  formatDateToLocalDatString,
  generateWeeksForMonth,
  getCurrentWeekNumber
} from 'src/helpers/menuHelper'

import { styled } from '@mui/material/styles'
import UserFooterLight from 'src/views/components/UserFooterLight'
import Usernavbar from 'src/views/components/UserNavbar'
import MainUserLayout from 'src/layouts/MainUserLayout'
import PageHeader from 'src/@core/components/page-header'
import Link from 'next/link'
import { set } from 'nprogress'
import { useRouter } from 'next/router'
import { useOrder } from 'src/context/OrderContext'
import { getWeekOfMonth, isLastDayOfMonth } from 'date-fns'
import toast from 'react-hot-toast'
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

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

const ItemTypeButton = ({ type, active = false, Icon, onClick, id = 'weekly-btn-2' }) => {
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
        {type === 'Weekly Items' && active ? (
          <img src='/images/icon/Mask group (2).png' />
        ) : (
          type === 'Weekly Items' && <img src='/images/icon/Mask group (1).png' />
        )}

        {type === 'Create Your Own' && active ? (
          <img src='/images/icon/Mask group (4).png' />
        ) : (
          type === 'Create Your Own' && <img src='/images/icon/Mask group (3).png' />
        )}

        {type}
      </Button>
    </>
  )
}

export default function UserMenuPage() {
  const year = new Date().getFullYear() // Use current year
  let month = new Date().getMonth() + 1 // Use current month

  let lastDayOfCurrentMonth = isLastDayOfMonth(new Date())
  if (lastDayOfCurrentMonth) month = month + 1

  const weeks = generateWeeksForMonth(month, year)
  let currentWeekNumber = getWeekOfMonth(new Date())
  if (lastDayOfCurrentMonth) currentWeekNumber = 1
  console.log(weeks)

  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [orderCategory, setOrderCategory] = useState('weekly')
  const [selectedWeek, setSelectedWeek] = useState(currentWeekNumber)
  const [selectedDate, setSelectedDate] = useState(
    formatDateToLocalDatString(weeks[currentWeekNumber - 1]?.dates[0]?.date)
  )
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
    const date2 = new Date(formatDateToLocalDatString(weeks[newValue - 1]?.dates[0]?.date))
    setSelectedDate(formatDateToLocalDatString(weeks[newValue - 1]?.dates[0]?.date))
    setSelectedDay(weeks[newValue - 1]?.dates[0]?.dayName)
    if (date2.getTime() > date1.getTime()) {
      setSelectedDate(formatDateToLocalDatString(weeks[newValue - 1]?.dates[0]?.date))
      console.log(formatDateToLocalDatString(weeks[newValue - 1]?.dates[0]?.date))
    }
  }

  const [sliderRef, instanceRef] = useKeenSlider({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      '(min-width: 300px)': {
        slides: { perView: 1, spacing: 5 }
      },
      '(min-width: 500px)': {
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

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update()
    }
  }, [selectedWeek])

  return (
    <>
      <Box sx={{ padding: { xs: '20px 0px', md: '20px 0px' } }}>
        <Box sx={{ margin: '0px auto' }}>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <PageHeader
                title={
                  <Typography variant='h4'>
                    <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
                      Order New
                    </LinkStyled>
                  </Typography>
                }
                subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'end' }}>
              <ButtonGroup sx={{ background: '#FFFFFF', border: 'none', color: '#FF833D' }}>
                {weeks.map((week, index) => {
                  {
                    return (
                      <WeekButton
                        key={index}
                        week={week.weekNumber}
                        active={selectedWeek === week.weekNumber}
                        onClick={e => handleTabChange(e, week.weekNumber)}
                        currentWeekNumber={currentWeekNumber}
                      ></WeekButton>
                    )
                  }
                })}
              </ButtonGroup>
            </Grid>
          </Grid>
          <Box sx={{ padding: { xs: '10px', md: '10px' } }} />

          <Grid
            container
            sx={{
              borderRadius: '20px',
              padding: '1em',
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <Grid xs={12} md={12} sx={{ display: { md: 'none' } }}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <ItemTypeButton
                    type={'Weekly Items'}
                    Icon={''}
                    active={orderCategory === 'weekly'}
                    onClick={() => setOrderCategory('weekly')}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <ItemTypeButton
                    type={'Create Your Own'}
                    Icon={''}
                    active={orderCategory === 'make-your-own'}
                    onClick={() => setOrderCategory('make-your-own')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography sx={{ fontFamily: 'DM Sans', fontWeight: '700', color: '#5D586C', fontSize: '18px' }}>
                Days of the Week
              </Typography>
              <Box sx={{ padding: '10px' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                {loaded && instanceRef.current && (
                  <Box
                    sx={{ display: { md: 'none' } }}
                    onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
                    disabled={currentSlide === 0}
                  >
                    <Icon icon='tabler:chevron-left' />
                  </Box>
                )}
                <div ref={sliderRef} className='keen-slider'>
                  {selectedWeek !== null &&
                    weeks[selectedWeek - 1]?.dates.map((day, index) => (
                      // <Typography key={index}>
                      //   {day.dayName}: {day.date.toLocaleDateString()}
                      // </Typography>
                      <DayButton
                        day={formatDate(formatDateToLocalDatString(day.date))}
                        active={selectedDate === formatDateToLocalDatString(day.date)}
                        key={index}
                        onClick={() => {
                          setSelectedDate(formatDateToLocalDatString(day.date)), setSelectedDay(day.dayName)
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
                {loaded && instanceRef.current && (
                  <Box
                    sx={{ display: { md: 'none' } }}
                    onClick={e => e.stopPropagation() || instanceRef.current?.next()}
                    disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                  >
                    <Icon icon='tabler:chevron-right' />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Grid item xs={6} md={4}>
                  <ItemTypeButton
                    type={'Weekly Items'}
                    Icon={''}
                    active={orderCategory === 'weekly'}
                    onClick={() => setOrderCategory('weekly')}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
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
                  height: { xs: 'initial', md: 'initial' },
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

            <Grid item xs={12} md={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5em' }}>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: '#096A5F',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    p: { xs: '8px 15px', md: '8px 50px' },
                    fontWeight: 'bold',
                    fontFamily: 'DM Sans'
                  }}
                  onClick={() => {
                    orders.totalPrice > 0 ? router.replace('/cart') : toast.error('Please add aleast one item to cart')
                  }}
                >
                  Continue <Icon icon='tabler:chevron-right' />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
