// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import CustomTextField from 'src/@core/components/mui/text-field'
// ** Custom Component Import
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Third Party Imports
import format from 'date-fns/format'
import { Bar } from 'react-chartjs-2'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { MenuItem } from '@mui/material'

function categorizeByDate(orders) {
  const categorizedOrders = {}

  orders.forEach(order => {
    // Extract the date from the createdAt property
    const date = new Date(order.createdAt).toISOString().split('T')[0] // Format: YYYY-MM-DD

    // Initialize the date entry if it doesn't exist
    if (!categorizedOrders[date]) {
      categorizedOrders[date] = 0
    }

    // Increment the count for this date
    categorizedOrders[date]++
  })

  // Convert the object into an array of objects
  return Object.keys(categorizedOrders).map(date => ({
    date,
    count: categorizedOrders[date]
  }))
}

function categorizeRevenueByDate(orders) {
  const categorizedOrders = {}

  orders.forEach(order => {
    // Extract the date from the createdAt property
    const date = new Date(order.createdAt).toISOString().split('T')[0] // Format: YYYY-MM-DD

    // Initialize the date entry if it doesn't exist
    if (!categorizedOrders[date]) {
      categorizedOrders[date] = 0
    }

    // Increment the count for this date
    categorizedOrders[date] += order.amountTotal
  })

  // Convert the object into an array of objects
  return Object.keys(categorizedOrders).map(date => ({
    date,
    count: categorizedOrders[date]
  }))
}

const AnalyticsChart = props => {
  // ** Props
  const { yellow, labelColor, borderColor, chartData } = props

  // ** States
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [category, setCategory] = useState('revenue')
  const [labels, setLabels] = useState([])
  const [dataSet, setDataSet] = useState([])

  useEffect(() => {
    if (chartData) {
      if (category == 'revenue') {
        let categorized = categorizeRevenueByDate(chartData?.revenue?.revenues)
        let Labels = categorized?.map(element => new Date(element?.date).toLocaleDateString())
        setLabels(Labels)
        let amount = categorized?.map(element => element?.count)
        setDataSet(amount)
      }

      if (category == 'order') {
        let categorized = categorizeByDate(chartData?.orders)
        console.log(categorized)

        let Labels = categorized?.map(element => new Date(element?.date).toLocaleDateString())
        setLabels(Labels)
        let amount = categorized?.map(element => element?.count)
        setDataSet(amount)
      }

      if (category == 'user') {
        let categorized = categorizeByDate(chartData?.users)
        console.log(categorized)

        let Labels = categorized?.map(element => new Date(element?.date).toLocaleDateString())
        setLabels(Labels)
        let amount = categorized?.map(element => element?.count)
        setDataSet(amount)
      }
    }
  }, [chartData, category])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        min: 0,
        grid: {
          color: borderColor
        },
        ticks: {
          stepSize: category == 'revenue' ? 100 : 1,
          color: labelColor
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        maxBarThickness: 15,
        backgroundColor: category === 'revenue' ? '#FFA266' : category == 'order' ? '#64D7C8' : '#EA5455',
        borderColor: 'transparent',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: dataSet
      }
    ]
  }

  const CustomInput = forwardRef(({ ...props }, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <CustomTextField
        {...props}
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon fontSize='1.25rem' icon='tabler:calendar-event' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon fontSize='1.25rem' icon='tabler:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = value => {
    setCategory(value)
  }

  return (
    <Card>
      <CardHeader
        title={category === 'revenue' ? 'Total Revenue ' : category == 'order' ? 'Total Orders ' : 'Total Customers '}
        subheader={
          category === 'revenue'
            ? 'Total Revenue trend over time'
            : category == 'order'
            ? 'Total Orders trend over time'
            : 'Total Customers trend over time'
        }
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <CustomTextField
            select
            placeholder={'Select a category'}
            value={category}
            onChange={e => handleOnChange(e.target.value)}
          >
            <MenuItem value='revenue'>Revenue</MenuItem>
            <MenuItem value='order'>Order</MenuItem>
            <MenuItem value='user'>User</MenuItem>
          </CustomTextField>
        }
      ></CardHeader>
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsChart
