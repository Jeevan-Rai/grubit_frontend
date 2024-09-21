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
import { CardHeader } from '@mui/material'
import { useRouter } from 'next/router'
import { getOrderDetails } from 'src/helpers/orderHelper'

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein }
}

const groupByWeek = items => {
  const grouped = {}
  items?.forEach(item => {
    if (!grouped[item.week]) {
      grouped[item.week] = []
    }
    grouped[item.week].push(item)
  })
  return grouped
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

const OrderDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState({})
  const handleChange = (event, value) => {
    console.log(event, value)
  }

  const fetchOrder = async () => {
    let response = await getOrderDetails(id)
    setOrder(response.data)
  }
  useEffect(() => {
    fetchOrder()
  }, [id])
  let groupedItems = groupByWeek(order?.items)
  return (
    <TableContainer component={Paper}>
      <CardHeader title='Order History' />
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            <TableCell align='left'>Date</TableCell>
            <TableCell align='left'>Item</TableCell>
            <TableCell align='left'>Category</TableCell>
            <TableCell align='left'>Qty</TableCell>
            <TableCell align='left'>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object?.keys(groupedItems).map((week, index) => {
            const weekItems = groupedItems[week]
            return weekItems.map((item, idx) => (
              <TableRow key={item.id}>
                {/* Row span for the first item of each week */}
                {idx === 0 && <TableCell rowSpan={weekItems.length}>Week {week}</TableCell>}
                <TableCell align='left'>
                  {new Date(item.date).toLocaleDateString('en-GB', {
                    weekday: 'long' // "Wednesday"
                  })}
                  <br />
                  {new Date(item.date).toLocaleDateString('en-GB', {
                    // "Wednesday"
                    day: 'numeric', // "10"
                    month: 'short', // "May"
                    year: 'numeric' // "2024"
                  })}
                </TableCell>
                <TableCell align='left' sx={{ fontFamily: 'DM Sans', fontWeight: '600' }}>
                  {item.name}
                </TableCell>
                <TableCell align='left'>{item.type}</TableCell>
                <TableCell align='left'>{item.quantity}</TableCell>
                <TableCell align='left' sx={{ fontFamily: 'DM Sans', color: '#0A5247 !important', fontWeight: '900' }}>
                  £{item.price * item.quantity}
                </TableCell>
                <TableCell align='left'>
                  <Chip
                    rounded
                    size='small'
                    skin='light'
                    color={'primary'}
                    label={'Available'}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                  />
                </TableCell>
              </TableRow>
            ))
          })}
          {/* {order?.items?.map((row, index) => {
            return (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell component='th' scope='row'>
                  Week {row.week}
                </TableCell>

                <TableCell align='left'>{row.date}</TableCell>
                <TableCell align='left'>{row.name}</TableCell>
                <TableCell align='left'>{row.type}</TableCell>
                <TableCell align='left'>{row.quantity}</TableCell>
                <TableCell align='left' sx={{ fontFamily: 'DM Sans', color: '#0A5247 !important', fontWeight: '900' }}>
                  £{row.price * row.quantity}
                </TableCell>
                <TableCell align='left'>
                  <Chip
                    rounded
                    size='small'
                    skin='light'
                    color={'primary'}
                    label={'Available'}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                  />
                </TableCell>
              </TableRow>
            )
          })} */}
        </TableBody>
      </Table>

      <WarningDialog
        open={open}
        page={1}
        title={'Are you sure'}
        message={'This will delete everything'}
        setOpen={setOpen}
      />
    </TableContainer>
  )
}

export default OrderDetails
