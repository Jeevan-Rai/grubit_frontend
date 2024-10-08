// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Chip from 'src/@core/components/mui/chip'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import OptionsMenu from 'src/@core/components/option-menu'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import WarningDialog from 'src/views/components/dialogs/WarningDialog'
import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { CardHeader, Typography } from '@mui/material'
import { useOrder } from 'src/context/OrderContext'
import { combineWeeklyAndMakeYourOwn, formatToUKDate } from 'src/helpers/menuHelper'

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const CartOrderDetails = () => {
  const [open, setOpen] = useState(false)
  const { orders, removeItemFromOrder } = useOrder()
  const [cartItems, setCartItems] = useState([])
  const [itemToDelete, setItemToDelete] = useState({})

  useEffect(() => {
    let combined = combineWeeklyAndMakeYourOwn(orders?.weekly, orders['make-your-own'], removeItemFromOrder)
    setCartItems(combined)
    console.log(combined)
  }, [orders])

  const handleChange = (event, value) => {
    console.log(event, value)
  }

  let handleDelete = () => {
    console.log()
    const { category, week, date, itemId } = itemToDelete
    removeItemFromOrder(category, week, date, itemId)
    setOpen(false)
  }
  return orders?.totalPrice <= 0 ? (
    <>
      <Typography sx={{ textAlign: 'center', fontWeight: 'BOLD' }}>No Items Added to Cart</Typography>
    </>
  ) : (
    <TableContainer component={Paper}>
      <CardHeader
        title='Before you proceed for payment'
        subheader='Please check the following details of your meal plan below'
      />

      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            <TableCell align='left'>Date</TableCell>
            <TableCell align='left'>Item</TableCell>
            <TableCell align='left'>Category</TableCell>
            <TableCell align='left'>Quantity</TableCell>
            <TableCell align='left'>Price</TableCell>
            <TableCell align='left'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems[1]?.map((day, dayIndex) => {
            return day.items.map((item, itemIndex) => (
              <TableRow
                key={item.id || itemIndex}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>Week 1</TableCell>}
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>{formatToUKDate(day.date)}</TableCell>}
                <TableCell>{item.name || item.dish?.name}</TableCell>
                <TableCell>{item.category === 'weekly' ? 'Weekly' : 'Make Your Own'}</TableCell>
                <TableCell>{item.quantity || '-'}</TableCell>
                <TableCell>{'£' + Number(item.price).toFixed(2) || '-'}</TableCell>
                <TableCell
                  align='left'
                  onClick={() => {
                    setOpen(true),
                      setItemToDelete({ category: item.category, week: 1, date: day.date, itemId: item.id })
                  }}
                  sx={{ color: 'red !important' }}
                >
                  <Icon icon={'tabler:trash'} />
                </TableCell>
              </TableRow>
            ))
          })}
          {cartItems[2]?.map((day, dayIndex) => {
            return day.items.map((item, itemIndex) => (
              <TableRow
                key={item.id || itemIndex}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>Week 2</TableCell>}
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>{formatToUKDate(day.date)}</TableCell>}
                <TableCell>{item.name || item.dish?.name}</TableCell>
                <TableCell>{item.category === 'weekly' ? 'Weekly' : 'Make Your Own'}</TableCell>
                <TableCell>{item.quantity || '-'}</TableCell>
                <TableCell>{'£' + Number(item.price).toFixed(2) || '-'}</TableCell>
                <TableCell
                  align='left'
                  onClick={() => {
                    setOpen(true),
                      setItemToDelete({ category: item.category, week: 2, date: day.date, itemId: item.id })
                  }}
                  sx={{ color: 'red !important' }}
                >
                  <Icon icon={'tabler:trash'} />
                </TableCell>
              </TableRow>
            ))
          })}
          {cartItems[3]?.map((day, dayIndex) => {
            return day.items.map((item, itemIndex) => (
              <TableRow
                key={item.id || itemIndex}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>Week 3</TableCell>}
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>{formatToUKDate(day.date)}</TableCell>}
                <TableCell>{item.name || item.dish?.name}</TableCell>
                <TableCell>{item.category === 'weekly' ? 'Weekly' : 'Make Your Own'}</TableCell>
                <TableCell>{item.quantity || '-'}</TableCell>
                <TableCell>{'£' + Number(item.price).toFixed(2) || '-'}</TableCell>
                <TableCell
                  align='left'
                  onClick={() => {
                    setOpen(true),
                      setItemToDelete({ category: item.category, week: 3, date: day.date, itemId: item.id })
                  }}
                  sx={{ color: 'red !important' }}
                >
                  <Icon icon={'tabler:trash'} />
                </TableCell>
              </TableRow>
            ))
          })}
          {cartItems[4]?.map((day, dayIndex) => {
            return day.items.map((item, itemIndex) => (
              <TableRow
                key={item.id || itemIndex}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>Week 4</TableCell>}
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>{formatToUKDate(day.date)}</TableCell>}
                <TableCell>{item.name || item.dish?.name}</TableCell>
                <TableCell>{item.category === 'weekly' ? 'Weekly' : 'Make Your Own'}</TableCell>
                <TableCell>{item.quantity || '-'}</TableCell>
                <TableCell>{'£' + Number(item.price).toFixed(2) || '-'}</TableCell>
                <TableCell
                  align='left'
                  onClick={() => {
                    setOpen(true),
                      setItemToDelete({ category: item.category, week: 4, date: day.date, itemId: item.id })
                  }}
                  sx={{ color: 'red !important' }}
                >
                  <Icon icon={'tabler:trash'} />
                </TableCell>
              </TableRow>
            ))
          })}
          {cartItems[5]?.map((day, dayIndex) => {
            return day.items.map((item, itemIndex) => (
              <TableRow
                key={item.id || itemIndex}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>Week 5</TableCell>}
                {itemIndex === 0 && <TableCell rowSpan={day.items.length}>{formatToUKDate(day.date)}</TableCell>}
                <TableCell>{item.name || item.dish?.name}</TableCell>
                <TableCell>{item.category === 'weekly' ? 'Weekly' : 'Make Your Own'}</TableCell>
                <TableCell>{item.quantity || '-'}</TableCell>
                <TableCell>{'£' + Number(item.price).toFixed(2) || '-'}</TableCell>
                <TableCell
                  align='left'
                  onClick={() => {
                    setOpen(true),
                      setItemToDelete({ category: item.category, week: 5, date: day.date, itemId: item.id })
                  }}
                  sx={{ color: 'red !important' }}
                >
                  <Icon icon={'tabler:trash'} />
                </TableCell>
              </TableRow>
            ))
          })}
        </TableBody>
      </Table>

      <WarningDialog
        open={open}
        page={1}
        title={'Are you sure'}
        message={'This will delete everything'}
        setOpen={setOpen}
        successCallback={handleDelete}
      />
    </TableContainer>
  )
}

export default CartOrderDetails
