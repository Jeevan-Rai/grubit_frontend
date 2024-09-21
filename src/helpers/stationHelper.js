import axiosInstance from './axiosInstance'

export const createStation = async data => {
  return await axiosInstance.post('/station', data)
}

export const getStations = async ({ page, search, limit }) => {
  return await axiosInstance.get(`/station?page=${page}&search=${search}&limit=${limit}`)
}

export const getStationsList = async () => {
  return await axiosInstance.get(`/station/list`)
}

export const getStation = async ({ id }) => {
  return await axiosInstance.get(`/station/${id}`)
}

export const updateStation = async (data, id) => {
  return await axiosInstance.put(`/station/${id}`, data)
}

export const deleteStation = async id => {
  return await axiosInstance.delete(`/station/${id}`)
}

export const fetchFoodItems = async (day, category) => {
  return await axiosInstance.post(`/station/getByDay`, { day, category })
}

function getWeekOfMonth(date) {
  const adjustedDate = date.getDate() + date.getDay()

  const prefixes = ['0', '1', '2', '3', '4', '5']
  return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1
}

// Function to get the dates of a specific week in a month
function getDatesOfWeekInMonth(weekNum, month, year) {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  // const firstDayOfMonth = new Date(year, month, 1).getDay() // Day of the week for the 1st of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  // const daysInMonth = new Date(year, month + 1, 0).getDate()

  const dates = []

  let currentDay = new Date(firstDayOfMonth)
  while (currentDay <= lastDayOfMonth) {
    if (getWeekOfMonth(currentDay) === weekNum) {
      dates.push({
        date: new Date(currentDay),
        dayName: currentDay.toLocaleString('en-US', { weekday: 'long' })
      })
    }
    currentDay.setDate(currentDay.getDate() + 1)
  }

  return dates
}

// Function to generate weeks for a month
export const generateWeeksForMonth = (month, year) => {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const weeks = []
  let weekNum = getWeekOfMonth(firstDayOfMonth)

  while (weekNum <= getWeekOfMonth(lastDayOfMonth)) {
    weeks.push({
      weekNumber: weekNum,
      dates: getDatesOfWeekInMonth(weekNum, month, year)
    })
    weekNum++
  }

  return weeks
}

export const getCurrentWeekNumber = (month, year) => {
  const today = new Date()
  return getWeekOfMonth(today)
}

export const formatDate = dateString => {
  // Convert the string to a Date object
  const date = new Date(dateString)

  // Get the day name (e.g., Tuesday)
  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)

  // Get the day of the month with ordinal (e.g., 9th, 1st)
  const dayOfMonth = date.getDate()
  const ordinal = n => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  // Get the month name (e.g., Aug)
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)

  // Combine into the desired format
  return `${dayName} (${ordinal(dayOfMonth)} ${monthName})`
}

// export const combineWeeklyAndMakeYourOwn = (weekly, makeYourOwn) => {
//   const combined = {}

//   // Combine weekly and make-your-own based on the week number
//   Object.keys(weekly).forEach(week => {
//     combined[week] = {
//       weekly: weekly[week],
//       'make-your-own': makeYourOwn[week] || []
//     }
//   })

//   // Add weeks that are only in make-your-own but not in weekly
//   Object.keys(makeYourOwn).forEach(week => {
//     if (!combined[week]) {
//       combined[week] = {
//         weekly: [],
//         'make-your-own': makeYourOwn[week]
//       }
//     }
//   })

//   return combined
// }

export const combineWeeklyAndMakeYourOwn = (weekly, makeYourOwn) => {
  const result = {}

  // Helper function to merge items by week and date
  const mergeItems = (source, category) => {
    for (const week in source) {
      if (!result[week]) result[week] = []
      source[week].forEach(entry => {
        const existingDateEntry = result[week].find(e => e.date === entry.date)
        const formattedItems = entry.Items.map(item => ({
          ...item,
          category: category
        }))

        if (existingDateEntry) {
          // Merge items for the same date
          existingDateEntry.items.push(...formattedItems)
        } else {
          // Add new date and items entry
          result[week].push({
            date: entry.date,
            items: formattedItems
          })
        }
      })
    }
  }

  // Merge both weekly and make-your-own categories
  mergeItems(weekly, 'weekly')
  mergeItems(makeYourOwn, 'make-your-own')

  return result
}
