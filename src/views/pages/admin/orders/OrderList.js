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
import { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Iconify from '@iconify/iconify'
import MessageDialog from 'src/views/components/dialogs/MessageDialog'

const createData = (name, calories, fat, carbs, protein, status) => {
  return { name, calories, fat, carbs, protein, status }
}

const rows = [
  createData('#5089', 'Jamal Kerrod ', 'Waterloo', '07/08/2024', 'Chicken Tikka', 'Processsing'),
  createData('#5089', 'Jamal Kerrod ', 'Waterloo', '07/08/2024', 'Chicken Tikka', 'Processsing')
]

const OrderList = () => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

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

  const handleChange = (event, value) => {
    console.log(event, value)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>Customer</TableCell>
            <TableCell align='right'>Pickup Location</TableCell>
            <TableCell align='right'>Pickup Date</TableCell>
            <TableCell align='right'>Meal Ordered</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='center'>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
              <TableCell align='right'>
                <Chip
                  rounded
                  size='small'
                  skin='light'
                  color={'primary'}
                  label={'Available'}
                  sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
              </TableCell>
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <Tooltip title='Print'>
                    <IconButton size='small' onClick={() => handlePrint()}>
                      <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M15.5833 15.5833H17.4167C18.4292 15.5833 19.25 14.7625 19.25 13.75V10.0833C19.25 9.07081 18.4292 8.25 17.4167 8.25H4.58333C3.57081 8.25 2.75 9.07081 2.75 10.0833V13.75C2.75 14.7625 3.57081 15.5833 4.58333 15.5833H6.41667'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M15.5833 15.5833H17.4167C18.4292 15.5833 19.25 14.7625 19.25 13.75V10.0833C19.25 9.07081 18.4292 8.25 17.4167 8.25H4.58333C3.57081 8.25 2.75 9.07081 2.75 10.0833V13.75C2.75 14.7625 3.57081 15.5833 4.58333 15.5833H6.41667'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M15.5837 8.25V4.58333C15.5837 3.57081 14.7628 2.75 13.7503 2.75H8.25033C7.2378 2.75 6.41699 3.57081 6.41699 4.58333V8.25'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M15.5837 8.25V4.58333C15.5837 3.57081 14.7628 2.75 13.7503 2.75H8.25033C7.2378 2.75 6.41699 3.57081 6.41699 4.58333V8.25'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <rect
                          x='6.41699'
                          y='11.9165'
                          width='9.16667'
                          height='7.33333'
                          rx='2'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <rect
                          x='6.41699'
                          y='11.9165'
                          width='9.16667'
                          height='7.33333'
                          rx='2'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Mark Completed'>
                    <IconButton size='small' onClick={() => handleStatus()}>
                      <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M4.58301 10.9998L9.16634 15.5832L18.333 6.4165'
                          stroke='#6F6B7D'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='View'>
                    <IconButton size='small' component={Link} href={'/admin/orders/view'}>
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

                  <Tooltip title='Delete'>
                    <IconButton size='small' onClick={() => handleDelete()}>
                      <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M3.66699 6.41683H18.3337'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M3.66699 6.41683H18.3337'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M9.16634 10.0835V15.5835'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M9.16634 10.0835V15.5835'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M12.8333 10.0835V15.5835'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M12.8333 10.0835V15.5835'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M4.58301 6.4165L5.49967 17.4165C5.49967 18.429 6.32049 19.2498 7.33301 19.2498H14.6663C15.6789 19.2498 16.4997 18.429 16.4997 17.4165L17.4163 6.4165'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M4.58301 6.4165L5.49967 17.4165C5.49967 18.429 6.32049 19.2498 7.33301 19.2498H14.6663C15.6789 19.2498 16.4997 18.429 16.4997 17.4165L17.4163 6.4165'
                          stroke='white'
                          stroke-opacity='0.2'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M8.25 6.41667V3.66667C8.25 3.16041 8.66041 2.75 9.16667 2.75H12.8333C13.3396 2.75 13.75 3.16041 13.75 3.66667V6.41667'
                          stroke='#4B465C'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M8.25 6.41667V3.66667C8.25 3.16041 8.66041 2.75 9.16667 2.75H12.8333C13.3396 2.75 13.75 3.16041 13.75 3.66667V6.41667'
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
          count={10}
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
      <MessageDialog type={type} open={open} title={title} message={message} setOpen={setOpen} />
    </TableContainer>
  )
}

export default OrderList
