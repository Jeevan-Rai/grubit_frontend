import { useOrder } from 'src/context/OrderContext'
import axiosInstance from './axiosInstance'
import {
  getDate,
  getDay,
  startOfMonth,
  addDays,
  differenceInCalendarWeeks,
  format,
  endOfMonth,
  getWeeksInMonth,
  eachDayOfInterval,
  getMonth,
  getWeek,
  isAfter,
  isToday,
  getHours,
  isSameDay,
  isLastDayOfMonth,
  isBefore,
  parse
} from 'date-fns'




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

export const fetchMenuItems = async () => {
  return await axiosInstance.post(`/menu/getAllMenuItemsByDay`)
}

function getWeekOfMonth(date) {
  const firstDayOfMonth = startOfMonth(date)
  return differenceInCalendarWeeks(date, firstDayOfMonth) + 1
}

// Function to get the dates of a specific week in a month
const getDatesOfWeekInMonth = (weekNumber, month, year) => {
  const firstDayOfMonth = startOfMonth(new Date(year, month - 1))
  const lastDayOfMonth = endOfMonth(firstDayOfMonth)
  const startDate = addDays(firstDayOfMonth, (weekNumber - 1) * 7 - firstDayOfMonth.getDay())
  const todaysDate = new Date()

  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))
    .filter(date => {
      if (isSameDay(date, todaysDate)) {
        // Only include today's date if it's before 4 PM
        return getHours(new Date()) < 16
      }

      
      
      // Include future dates only
      return isAfter(date, todaysDate) && isBefore(date, lastDayOfMonth) && date.getDay() != 0;
    })
    .map(date => ({
      date,
      dayName: date.toLocaleString('en-US', { weekday: 'long' })
    }))

  return weekDates
}

// Function to generate weeks for a month while only including today's and future dates
export const generateWeeksForMonth = (month, year) => {
  const firstDayOfMonth = startOfMonth(new Date(year, month - 1))
  const totalWeeks = getWeeksInMonth(firstDayOfMonth)

  return Array.from({ length: totalWeeks }, (_, weekNum) => ({
    weekNumber: weekNum + 1,
    dates: getDatesOfWeekInMonth(weekNum + 1, month, year)
  })) // Filter out weeks with no valid dates
}

export const getCurrentWeekNumber = (month, year) => {
  const today = new Date()
  return getWeek(today)
}

export const formatDate = dateString => {
  // let date = parse(dateString, 'dd/MM/yyyy', new Date())
  let date = parse(dateString, 'dd/MM/yyyy', new Date())
  const dayName = format(date, 'EEEE')
  const dayOfMonth = format(date, 'do')
  const monthName = format(date, 'MMM')

  return `${dayName} (${dayOfMonth} ${monthName})`
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

export const combineWeeklyAndMakeYourOwn = (weekly, makeYourOwn ,removeItemFromOrder = null ) => {
  const result = {}

  // Helper function to merge items by week and date
  const mergeItems = (source, category) => {
    for (const week in source) {
      if (!result[week]) result[week] = []
      source[week].forEach(entry => {
        const todaysDate = new Date();
       let date =  parse(entry.date, 'dd/MM/yyyy', new Date())
       console.log(entry);
       
       if (isSameDay(date, todaysDate)) {
        // Only include today's date if it's before 4 PM
       if(getHours(new Date()) > 16){
        

        entry.Items.map(item=>{
          removeItemFromOrder(category,week,entry.date,item.id);
        })
        
       }
      }

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



export const formatDateToLocalDatString = (date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}