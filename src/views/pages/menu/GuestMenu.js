import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@mui/material'
import { useKeenSlider } from 'keen-slider/react'
import Icon from 'src/@core/components/icon'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from 'react'
import FoodItemCard from 'src/views/components/FoodItemCard'
import UserFooterLight from 'src/views/components/UserFooterLight'
import Usernavbar from 'src/views/components/UserNavbar'
import {
  fetchFoodItems,
  formatDate,
  formatDateToLocalDatString,
  generateWeeksForMonth,
  getCurrentWeekNumber
} from 'src/helpers/menuHelper'
import Link from 'next/link'
import { useOrder } from 'src/context/OrderContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getWeekOfMonth, isLastDayOfMonth } from 'date-fns'
import axiosInstance from 'src/helpers/axiosInstance'
import FallbackSpinner from 'src/@core/components/spinner'
import FloatingCartButton from 'src/views/components/FloatingCartButton'

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

export default function GuestMenu() {
  const year = new Date().getFullYear() // Use current year
  let month = new Date().getMonth() + 1 // Use current month

  let lastDayOfCurrentMonth = isLastDayOfMonth(new Date())
  if (lastDayOfCurrentMonth) month = month + 1

  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [weeks, setWeeks] = useState([])
  const [currentWeekNumber, setCurrentWeekNumber] = useState([])
  const [orderCategory, setOrderCategory] = useState('weekly')
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [dateIndex, setDateIndex] = useState(0)
  const { orders } = useOrder()
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const [selectedDay, setSelectedDay] = useState(null)
  const [menuItems, setMenuItems] = useState([])

  const handleTabChange = (event, newValue) => {
    console.log(newValue)
    setDateIndex(0)
    setSelectedWeek(newValue)
    setSelectedDate(weeks[newValue - 1]?.dates[0]?.date)
    setSelectedDay(weeks[newValue - 1]?.dates[0]?.dayName)
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
  }, [selectedDay, orderCategory, selectedDate])

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update()
      instanceRef.current.moveToIdx(0)
    }
  }, [selectedWeek])

  useEffect(() => {
    axiosInstance
      .get('/api/v1/weeks')
      .then(result => {
        console.log(result.data)

        setWeeks(result.data.weeks)
        setSelectedDate(result.data.weeks[result.data.currentWeekNumber - 1]?.dates[0]?.date)
        setSelectedDay(result.data.weeks[result.data.currentWeekNumber - 1]?.dates[0]?.dayName)
        setCurrentWeekNumber(result.data.currentWeekNumber)
        setSelectedWeek(result.data.currentWeekNumber)
      })
      .catch(error => {
        console.log(error)

        toast.error('SOmething went wrong while fetching weeks')
      })
  }, [])

  console.log(selectedDate)
  return weeks.length == 0 ? (
    <>
      <FallbackSpinner />
    </>
  ) : (
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
                    id='weekly-btn-one'
                    Icon={''}
                    active={orderCategory === 'weekly'}
                    onClick={() => setOrderCategory('weekly')}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <ItemTypeButton
                    type={'Create Your Own'}
                    id='mky-btn-one'
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
                    onClick={e => {
                      e.stopPropagation() || instanceRef.current?.prev()
                      if (dateIndex > 0) {
                        setSelectedDate(weeks[selectedWeek - 1]?.dates[dateIndex - 1]?.date)
                        setSelectedDay(weeks[selectedWeek - 1]?.dates[dateIndex - 1]?.dayName)
                        setDateIndex(dateIndex - 1)
                      }
                    }}
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
                        day={formatDate(formatDateToLocalDatString(new Date(day.date)))}
                        active={selectedDate == day.date}
                        key={index}
                        onClick={() => {
                          setSelectedDate(day.date), setSelectedDay(day.dayName)
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
                    onClick={e => {
                      e.stopPropagation() || instanceRef.current?.next()
                      if (dateIndex < weeks[selectedWeek - 1]?.dates.length - 1) {
                        setSelectedDate(weeks[selectedWeek - 1]?.dates[dateIndex + 1]?.date)
                        setSelectedDay(weeks[selectedWeek - 1]?.dates[dateIndex + 1]?.dayName)
                        setDateIndex(dateIndex + 1)
                        console.log(dateIndex + 1)
                      }
                    }}
                    disabled={currentSlide === instanceRef.current?.track?.details?.slides?.length - 1}
                  >
                    <Icon icon='tabler:chevron-right' />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Grid item xs={6} md={3}>
                  <ItemTypeButton
                    type={'Weekly Items'}
                    id='weekly-btn-three'
                    Icon={''}
                    active={orderCategory === 'weekly'}
                    onClick={() => setOrderCategory('weekly')}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <ItemTypeButton
                    type={'Create Your Own'}
                    id='mky-btn-three'
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

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
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
                orders.totalPrice > 0 ? router.replace('/user/cart') : toast.error('Please add aleast one item to cart')
              }}
            >
              ORDER NOW
            </Button>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#FFFFFF',
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
              CART
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: { xs: '10px', md: '30px' } }} />
      <UserFooterLight />
      <FloatingCartButton />
    </>
  )
}
