import { createContext, useContext, useState, useEffect } from 'react'

// Create the OrderContext
const OrderContext = createContext()

// LocalStorage key for persisting the order
const ORDER_STORAGE_KEY = 'orderData'

// Provide the context to components
export const OrderProvider = ({ children }) => {
  // State for the order
  const [order, setOrder] = useState({})

  // Load order from localStorage when the app loads
  useEffect(() => {
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY)
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder))
    }
  }, [])

  // Save order to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(order).length > 0) {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order))
    }
  }, [order])

  // Add or update item based on week, date, and quantity
  const addItem = (week, date, item, quantity) => {
    setOrder(prevOrder => {
      const updatedOrder = { ...prevOrder }

      // Ensure the week exists in the order
      if (!updatedOrder[week]) {
        updatedOrder[week] = []
      }

      // Find if the date already exists in the week
      const dateIndex = updatedOrder[week].findIndex(entry => entry.date === date)

      if (dateIndex === -1) {
        // If the date doesn't exist, add a new entry for the date
        updatedOrder[week].push({
          date,
          Items: [{ ...item, quantity }]
        })
      } else {
        // If the date exists, check if the item already exists for that date
        const itemIndex = updatedOrder[week][dateIndex].Items.findIndex(i => i.id === item.id)

        if (itemIndex === -1) {
          // If the item doesn't exist, add it with the provided quantity
          updatedOrder[week][dateIndex].Items.push({ ...item, quantity })
        } else {
          // If the item exists, update its quantity
          const newQuantity = updatedOrder[week][dateIndex].Items[itemIndex].quantity + quantity

          // Ensure quantity doesn't fall below zero
          if (newQuantity > 0) {
            updatedOrder[week][dateIndex].Items[itemIndex].quantity = newQuantity
          } else {
            // Remove the item if quantity goes to zero or below
            updatedOrder[week][dateIndex].Items.splice(itemIndex, 1)
          }
        }

        // Clean up if there are no items for the date
        if (updatedOrder[week][dateIndex].Items.length === 0) {
          updatedOrder[week].splice(dateIndex, 1)
        }
      }

      // Clean up if there are no dates for the week
      if (updatedOrder[week].length === 0) {
        delete updatedOrder[week]
      }

      return updatedOrder
    })
  }

  // Clear the order (optional functionality)
  const clearOrder = () => {
    setOrder({})
    localStorage.removeItem(ORDER_STORAGE_KEY) // Clear from localStorage
  }

  return <OrderContext.Provider value={{ order, addItem, clearOrder }}>{children}</OrderContext.Provider>
}

// Custom hook to use OrderContext
export const useOrder = () => {
  return useContext(OrderContext)
}
