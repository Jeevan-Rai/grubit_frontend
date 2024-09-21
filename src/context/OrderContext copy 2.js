import { createContext, useContext, useEffect, useState } from 'react'

// Create Order Context
const OrderContext = createContext()

// LocalStorage key for persisting the order
const ORDER_STORAGE_KEY = 'orderData'

// Provider Component
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState({
    weekly: {},
    'make-your-own': {},
    pickupLocation: '',
    totalPrice: 0,
    couponDiscount: 0
  })

  // Load order from localStorage when the app loads
  useEffect(() => {
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY)
    if (savedOrder) {
      setOrders(JSON.parse(savedOrder))
    }
  }, [])

  // Save order to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(orders).length > 0) {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders))
    }
  }, [orders])

  // Function to add/update item in a specific week, date, and category
  const addItemToOrder = (category, week, date, item, quantity = 1) => {
    setOrders(prevOrders => {
      const categoryOrders = prevOrders[category] || {}
      const weekOrders = categoryOrders[week] || []
      console.log(item)

      // Find if the date already has some items
      const dateIndex = weekOrders.findIndex(order => order.date === date)

      let updatedWeekOrders
      if (dateIndex !== -1) {
        // Date exists, update items
        const updatedItems = [...weekOrders[dateIndex].Items]
        const itemIndex = updatedItems.findIndex(i => i.id === item.id)
        console.log(itemIndex)

        if (itemIndex !== -1) {
          updatedItems[itemIndex].quantity = quantity // Increment quantity

          console.log(updatedItems[itemIndex].quantity)
        } else {
          updatedItems.push(item) // Add new item
        }

        updatedWeekOrders = weekOrders.map((order, idx) =>
          idx === dateIndex ? { ...order, Items: updatedItems } : order
        )
      } else {
        // Date doesn't exist, add new date and item
        updatedWeekOrders = [
          ...weekOrders,
          {
            date: date,
            Items: [item]
          }
        ]
      }

      return {
        ...prevOrders,
        [category]: {
          ...categoryOrders,
          [week]: updatedWeekOrders
        }
      }
    })
  }

  // Function to increase/decrease quantity
  const updateItemQuantity = (category, week, date, itemId, newQuantity) => {
    setOrders(prevOrders => {
      const categoryOrders = prevOrders[category]
      const weekOrders = categoryOrders[week]

      const updatedWeekOrders = weekOrders.map(order => {
        if (order.date === date) {
          const updatedItems = order.Items.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
          return { ...order, Items: updatedItems }
        }
        return order
      })

      return {
        ...prevOrders,
        [category]: {
          ...categoryOrders,
          [week]: updatedWeekOrders
        }
      }
    })
  }

  const findItemQuantity = (category, week, date, itemId) => {
    if (orders[category] && orders[category][week]) {
      const weekData = orders[category][week]
      for (const entry of weekData) {
        if (entry.date === date) {
          for (const item of entry.Items) {
            if (item.id === itemId || (item.dish && item.dish.id === itemId)) {
              return item.quantity || 0
            }
          }
        }
      }
    }
    return null
  }

  const removeItemFromOrder = (category, week, date, itemId) => {
    setOrders(prevOrders => {
      const categoryOrders = prevOrders[category]
      const weekOrders = categoryOrders[week] || []

      const updatedWeekOrders = weekOrders
        .map(order => {
          if (order.date === date) {
            const updatedItems = order.Items.filter(item => item.id !== itemId)
            return { ...order, Items: updatedItems }
          }
          return order
        })
        .filter(order => order.Items.length > 0) // Remove empty dates

      const updatedOrders = {
        ...prevOrders,
        [category]: {
          ...categoryOrders,
          [week]: updatedWeekOrders
        }
      }

      const newTotal = calculateTotal(updatedOrders)
      return { ...updatedOrders, totalPrice: newTotal }
    })
  }

  const setPickupLocation = location => {
    setOrders(prevOrders => {
      return { ...prevOrders, pickupLocation: location }
    })
  }

  return (
    <OrderContext.Provider
      value={{ orders, addItemToOrder, updateItemQuantity, findItemQuantity, removeItemFromOrder, setPickupLocation }}
    >
      {children}
    </OrderContext.Provider>
  )
}

// Custom Hook to Use Order Context
export const useOrder = () => {
  return useContext(OrderContext)
}
