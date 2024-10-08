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
import { getCustomers } from 'src/helpers/authHelpers'
import { formatToUKDate } from 'src/helpers/menuHelper'

const createData = (name, calories, fat, carbs, protein, status) => {
  return { name, calories, fat, carbs, protein, status }
}

const rows = [
  createData('Jamal Kerrod', 'Marge.Jacobson@gmail.com', '+44 7412 345678', '07/03/2024', '09/08/2024', 'Active'),
  createData('Jamal Kerrod', 'Marge.Jacobson@gmail.com', '+44 7412 345678', '07/03/2024', '09/08/2024', 'InActive'),
  createData('Jamal Kerrod', 'Marge.Jacobson@gmail.com', '+44 7412 345678', '07/03/2024', '09/08/2024', 'Active'),
  createData('Jamal Kerrod', 'Marge.Jacobson@gmail.com', '+44 7412 345678', '07/03/2024', '09/08/2024', 'InActive'),
  createData('Jamal Kerrod', 'Marge.Jacobson@gmail.com', '+44 7412 345678', '07/03/2024', '09/08/2024', 'Active'),
  createData('Jamal Kerrod', 'Marge.Jacobson@gmail.com', '+44 7412 345678', '07/03/2024', '09/08/2024', 'InActive')
]

const CustomerList = ({ customers, handleChange, setOpen }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align='left'>Email</TableCell>
            <TableCell align='left'>Phone</TableCell>
            <TableCell align='left'>Acc Created On</TableCell>
            <TableCell align='left'>Last Order On</TableCell>
            <TableCell align='left'>Status</TableCell>
            <TableCell align='center'>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.users?.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell align='left'>{row.email}</TableCell>
              <TableCell align='left'>{row.phoneNumber}</TableCell>
              <TableCell align='left'>{formatToUKDate(row.createdAt)}</TableCell>
              <TableCell align='left'>{formatToUKDate(row.createdAt)}</TableCell>
              <TableCell align='left'>
                <Chip
                  rounded
                  size='small'
                  skin='light'
                  color={row.verificationStatus ? 'primary' : 'error'}
                  label={row.verificationStatus ? 'Verified' : 'Unverified'}
                  sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
              </TableCell>
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  {/* <Tooltip title='Delete Invoice'>
                    <IconButton size='small' onClick={() => setOpen(true)}>
                      <Icon icon='tabler:trash' />
                    </IconButton>
                  </Tooltip> */}
                  <Tooltip title='View'>
                    <IconButton size='small' component={Link} href={`/admin/customers/${row.id}`}>
                      <Icon icon='tabler:eye' />
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
          count={customers?.totalPages}
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
      {/* <WarningDialog
        open={open}
        page={1}
        title={'Are you sure'}
        message={'This will delete everything'}
        setOpen={setOpen}
      /> */}
    </TableContainer>
  )
}

export default CustomerList
