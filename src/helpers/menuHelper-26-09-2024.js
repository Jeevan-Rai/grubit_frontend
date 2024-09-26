import axiosInstance from './axiosInstance'

export const createMenu = async data => {
  return await axiosInstance.post('/menu', data)
}

export const getMenuItems = async ({ page, search, limit }) => {
  return await axiosInstance.get(`/menu?page=${page}&search=${search}&limit=${limit}`)
}

export const getMenuItem = async ({ id }) => {
  return await axiosInstance.get(`/menu/${id}`)
}

export const updateMenu = async (data, id) => {
  return await axiosInstance.put(`/menu/${id}`, data)
}

export const deleteMenu = async id => {
  return await axiosInstance.delete(`/menu/${id}`)
}

export const fetchFoodItems = async (day, category) => {
  return await axiosInstance.post(`/menu/getByDay`, { day, category })
}

function getWeekOfMonth(date) {
  const adjustedDate = date.getDate() + date.getDay()

  const prefixes = ['0', '1', '2', '3', '4', '5']
  return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1
}

// Function to get the dates of a specific week in a month
function getDatesOfWeekInMonth(weekNumber, month, year) {
  const firstDayOfMonth = new Date(year, month - 1, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const todaysDate = new Date()
  console.log(weekNumber)

  // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  const firstDayWeekday = firstDayOfMonth.getDay()

  // Initialize an array to store the dates of the week
  const weekDates = []

  // Calculate the start date for the given week
  let startDate
  if (weekNumber === 1) {
    // For the first week, the start date is the first day of the month
    startDate = firstDayOfMonth
  } else {
    // For subsequent weeks, calculate the start date based on the first week's end
    const daysFromFirstDay = 7 * (weekNumber - 1) - firstDayWeekday
    startDate = new Date(year, month - 1, 1 + daysFromFirstDay)
  }

  // Loop through the 7 days of the week and push them into the array
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)

    // Check if the current date is within the given month
    if (currentDate.getMonth() === month - 1 && todaysDate.getTime() < currentDate.getTime()) {
      weekDates.push({
        date: currentDate,
        dayName: currentDate.toLocaleString('en-US', { weekday: 'long' })
      })
    }
  }

  return weekDates
}

// Function to generate weeks for a month
export const generateWeeksForMonth = (month, year) => {
  const firstDayOfMonth = new Date(year, month - 1, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const weeks = []
  let weekNum = getWeekOfMonth(firstDayOfMonth)
  console.log(firstDayOfMonth, weekNum, month, year)

  while (weekNum < getWeekOfMonth(lastDayOfMonth)) {
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
  const dayName = date.toLocaleString('en-US', { weekday: 'long' })

  // Get the day of the month with ordinal (e.g., 9th, 1st)
  const dayOfMonth = date.getDate()
  const ordinal = n => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  // Get the month name (e.g., Aug)
  const monthName = date.toLocaleString('en-US', { month: 'short' })

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
