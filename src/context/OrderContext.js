import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getCouponDiscountByCart } from 'src/helpers/orderHelper'

// Create Order Context
const OrderContext = createContext()

// LocalStorage key for persisting the order
const ORDER_STORAGE_KEY = 'orderData'

// Provider Component
export const OrderProvider = ({ children }) => {
  const defaultState = {
    weekly: {},
    'make-your-own': {},
    pickupLocation: '',
    totalPrice: 0,
    couponDiscount: 0
  }
  const [orders, setOrders] = useState(defaultState)

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
          updatedItems.push({ ...item, quantity: 1 }) // Add new item
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
            Items: [{ ...item, quantity: 1 }]
          }
        ]
      }

      const updatedOrders = {
        ...prevOrders,
        [category]: {
          ...categoryOrders,
          [week]: updatedWeekOrders
        }
      }

      const newTotal = calculateTotal(updatedOrders)
      console.log(newTotal)

      return { ...updatedOrders, totalPrice: newTotal }
    })
  }

  // Function to calculate total price
  const calculateTotal = currentOrders => {
    let total = 0
    Object.keys(currentOrders).forEach(category => {
      if (
        category === 'pickupLocation' ||
        category === 'totalPrice' ||
        category === 'couponDiscount' ||
        category === 'couponCode' ||
        category === 'discountedPrice'
      )
        return
      const weeks = currentOrders[category]
      Object.keys(weeks).forEach(week => {
        weeks[week].forEach(order => {
          order.Items.forEach(item => {
            console.log(item.price)

            total += item.price * (item.quantity || 1)
          })
        })
      })
    })
    return total.toFixed(2)
  }

  // Function to apply coupon discount
  const applyCoupon = async couponCode => {
    try {
      let response = await getCouponDiscountByCart({ ...orders, code: couponCode })
      if (response?.data?.discountAmount) {
        console.log('inside')

        setOrders(prevOrders => {
          console.log(prevOrders.totalPrice)

          return {
            ...prevOrders,
            couponCode: couponCode,
            couponDiscount: response?.data?.discountAmount.toFixed(2),
            totalPrice: prevOrders.totalPrice,
            discountedPrice: (prevOrders.totalPrice - response?.data?.discountAmount).toFixed(2)
          }
          // return { ...prevOrders, couponDiscount: discount, totalPrice: prevOrders.totalPrice - discount }
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }

    // setOrders(prevOrders => {
    //   return { ...prevOrders, couponCode: couponCode, totalPrice: prevOrders.totalPrice - couponCode }
    //   // return { ...prevOrders, couponDiscount: discount, totalPrice: prevOrders.totalPrice - discount }
    // })
  }

  const removeCoupon = async () => {
    try {
      setOrders(prevOrders => {
        return {
          ...prevOrders,
          couponCode: '',
          couponDiscount: 0,
          totalPrice: prevOrders.totalPrice,
          discountedPrice: prevOrders.totalPrice
        }
        // return { ...prevOrders, couponDiscount: discount, totalPrice: prevOrders.totalPrice - discount }
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }

    // setOrders(prevOrders => {
    //   return { ...prevOrders, couponCode: couponCode, totalPrice: prevOrders.totalPrice - couponCode }
    //   // return { ...prevOrders, couponDiscount: discount, totalPrice: prevOrders.totalPrice - discount }
    // })
  }

  // Function to increase/decrease quantity
  const updateItemQuantity = (category, week, date, itemId, newQuantity) => {
    setOrders(prevOrders => {
      const categoryOrders = prevOrders[category]
      const weekOrders = categoryOrders[week]

      const updatedWeekOrders = weekOrders.map(order => {
        if (order.date === date) {
          if (newQuantity > 0) {
            const updatedItems = order.Items.map(item =>
              item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
            console.log(updatedItems)

            return { ...order, Items: updatedItems }
          }

          const updatedItems = order.Items.filter(item => item.id != itemId)
          console.log(updatedItems)
          return { ...order, Items: updatedItems }
        }
        return order
      })

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

  const findItemQuantity = (category, week, date, itemId) => {
    if (orders[category] && orders[category][week]) {
      const weekData = orders[category][week]
      for (const entry of weekData) {
        if (entry.date === date) {
          for (const item of entry.Items) {
            if (item.id === itemId) {
              return item.quantity || 0
            }
          }
        }
      }
    }
    return null
  }

  const removeItemFromOrder = async (category, week, date, itemId) => {
    setOrders(prevOrders => {
      const categoryOrders = prevOrders[category]
      const weekOrders = categoryOrders[week] || []

      const updatedWeekOrders = weekOrders
        .map(order => {
          if (order.date === date) {
            const updatedItems = order.Items.filter(item => item.id !== itemId)
            console.log(updatedItems)

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
    removeCoupon()
  }

  const setPickupLocation = location => {
    setOrders(prevOrders => {
      return { ...prevOrders, pickupLocation: location }
    })
  }

  const clearCart = () => {
    setOrders(defaultState)
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addItemToOrder,
        updateItemQuantity,
        findItemQuantity,
        removeItemFromOrder,
        setPickupLocation,
        applyCoupon,
        removeCoupon,
        clearCart
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

// Custom Hook to Use Order Context
export const useOrder = () => {
  return useContext(OrderContext)
}
