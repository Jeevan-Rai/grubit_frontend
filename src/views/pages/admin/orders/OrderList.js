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
import Iconify from '@iconify/iconify'
import MessageDialog from 'src/views/components/dialogs/MessageDialog'
import { changeOrder, getOrders } from 'src/helpers/orderHelper'

const createData = (name, calories, fat, carbs, protein, status) => {
  return { name, calories, fat, carbs, protein, status }
}

const rows = [
  createData('#5089', 'Jamal Kerrod ', 'Waterloo', '07/08/2024', 'Chicken Tikka', 'Processsing'),
  createData('#5089', 'Jamal Kerrod ', 'Waterloo', '07/08/2024', 'Chicken Tikka', 'Processsing')
]

const OrderList = ({ orders, handleChange }) => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [itemId, setItemId] = useState('')
  const handlePrint = () => {
    setOpen(true)
    setType('success')
    setTitle('Print Order')
    setMessage('Printed Successfully')
  }

  const handleStatus = () => {
    setOpen(true)
    setType('warning')
    setTitle('Change Status ')
    setMessage('Are you sure you want to change status from ‘Completed’ back to ‘’Processing’ for this order?')
  }

  const handleDelete = () => {
    setOpen(true)
    setType('warning')
    setTitle('Delete Order')
    setMessage('Are you sure you want to delete ?')
  }

  const changeOrderStatus = () => {
    changeOrder({ id: itemId })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='left'>Pickup Location</TableCell>
            <TableCell align='left'>Booking Date</TableCell>
            <TableCell align='left'>Total</TableCell>
            <TableCell align='left'>Status</TableCell>
            <TableCell align='center'>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.orders?.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                #{row.id}
              </TableCell>
              <TableCell align='left'>{row?.station?.name}</TableCell>
              <TableCell align='left'>{row.createdAt}</TableCell>
              <TableCell align='left'>{row.totalPrice}</TableCell>

              <TableCell align='left'>
                <Chip
                  rounded
                  size='small'
                  skin='light'
                  color={row?.deliveryStatus == 'Processing' ? 'warning' : 'primary'}
                  label={row?.deliveryStatus}
                  sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
              </TableCell>
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <Tooltip title='Print'>
                    <IconButton size='small' component={Link} href={`/admin/orders/${row.id}/print`}>
                      <svg width={22} height={22} viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M15.5833 15.5833H17.4167C18.4292 15.5833 19.25 14.7625 19.25 13.75V10.0833C19.25 9.07081 18.4292 8.25 17.4167 8.25H4.58333C3.57081 8.25 2.75 9.07081 2.75 10.0833V13.75C2.75 14.7625 3.57081 15.5833 4.58333 15.5833H6.41667'
                          stroke='#4B465C'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M15.5833 15.5833H17.4167C18.4292 15.5833 19.25 14.7625 19.25 13.75V10.0833C19.25 9.07081 18.4292 8.25 17.4167 8.25H4.58333C3.57081 8.25 2.75 9.07081 2.75 10.0833V13.75C2.75 14.7625 3.57081 15.5833 4.58333 15.5833H6.41667'
                          stroke='white'
                          strokeOpacity='0.2'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M15.5837 8.25V4.58333C15.5837 3.57081 14.7628 2.75 13.7503 2.75H8.25033C7.2378 2.75 6.41699 3.57081 6.41699 4.58333V8.25'
                          stroke='#4B465C'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M15.5837 8.25V4.58333C15.5837 3.57081 14.7628 2.75 13.7503 2.75H8.25033C7.2378 2.75 6.41699 3.57081 6.41699 4.58333V8.25'
                          stroke='white'
                          strokeOpacity='0.2'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <rect
                          x='6.41699'
                          y='11.9165'
                          width='9.16667'
                          height='7.33333'
                          rx={2}
                          stroke='#4B465C'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <rect
                          x='6.41699'
                          y='11.9165'
                          width='9.16667'
                          height='7.33333'
                          rx={2}
                          stroke='white'
                          strokeOpacity='0.2'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>

                  {row?.deliveryStatus == 'Processing' && (
                    <Tooltip title='Mark Successful'>
                      <IconButton size='small' onClick={() => handleStatus()}>
                        <svg width={17} height={12} viewBox='0 0 17 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M1.58301 5.99984L6.16634 10.5832L15.333 1.4165'
                            stroke='#6F6B7D'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  )}

                  {row?.deliveryStatus == 'Successful' && (
                    <Tooltip title='Mark Processing'>
                      <IconButton size='small' component={Link} href={`/admin/orders/${row.id}/print`}>
                        <Icon icon={'tabler:close'} />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title='View'>
                    <IconButton size='small' component={Link} href={`/admin/orders/${row.id}/view`}>
                      <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <circle
                          cx='11.0003'
                          cy='11.0013'
                          r='1.83333'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <circle
                          cx='11.0003'
                          cy='11.0013'
                          r='1.83333'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M20.1663 10.9987C17.7216 15.2768 14.6663 17.4154 10.9997 17.4154C7.33301 17.4154 4.27776 15.2768 1.83301 10.9987C4.27776 6.72061 7.33301 4.58203 10.9997 4.58203C14.6663 4.58203 17.7216 6.72061 20.1663 10.9987'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M20.1663 10.9987C17.7216 15.2768 14.6663 17.4154 10.9997 17.4154C7.33301 17.4154 4.27776 15.2768 1.83301 10.9987C4.27776 6.72061 7.33301 4.58203 10.9997 4.58203C14.6663 4.58203 17.7216 6.72061 20.1663 10.9987'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack spacing={2} sx={{ padding: '2em' }}>
        <Pagination
          count={orders?.totalPages}
          shape='rounded'
          onChange={handleChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#4B465C', // Default text color
              '&.Mui-selected': {
                backgroundColor: '#F56700', // Background color of selected page
                color: '#fff', // Selected page text color
                fontWeight: 'bold' // Selected page font weight
              },
              '&:hover': {
                backgroundColor: '#F56700',
                color: '#fff' // Selected page text color
                // Hover color
              }
            },
            '& .MuiPaginationItem-ellipsis': {
              color: '#555' // Color for ellipsis
            },
            '& .MuiPaginationItem-icon': {
              color: '#4B465C' // Color for arrow icons
            },

            '& .MuiPagination-ul': {
              justifyContent: 'end'
            }
          }}
        />
      </Stack>
      {/* <MessageDialog type={type} open={open} title={title} message={message} setOpen={setOpen}  /> */}
      <WarningDialog
        open={open}
        title={title}
        message={message}
        setOpen={setOpen}
        successCallback={() => changeOrderStatus()}
      />
    </TableContainer>
  )
}

export default OrderList
