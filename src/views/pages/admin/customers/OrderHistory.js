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

const OrderHistory = ({ userDetails, page, setPage }) => {
  const [open, setOpen] = useState(false)

  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <TableContainer component={Paper}>
      <CardHeader title='Order History' />
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Order id</TableCell>
            <TableCell align='left'>Pick up location</TableCell>
            <TableCell align='left'>Order Date</TableCell>
            <TableCell align='left'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetails?.user?.orders?.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                # {row.id}
              </TableCell>
              <TableCell align='left'>{row?.station.name}</TableCell>
              <TableCell align='left'>{new Date(row.createdAt).toLocaleString()}</TableCell>
              <TableCell align='left'>
                <Chip
                  rounded
                  size='small'
                  skin='light'
                  color={
                    row.deliveryStatus === 'Processing'
                      ? 'warning'
                      : row.deliveryStatus === 'Successful'
                      ? 'primary'
                      : 'error'
                  }
                  label={
                    row.deliveryStatus === 'Processing' || row.deliveryStatus === 'Successful'
                      ? row.deliveryStatus
                      : 'Payment Pending'
                  }
                  sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack spacing={2} sx={{ padding: '2em' }}>
        <Pagination
          count={userDetails?.totalPages}
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

export default OrderHistory
