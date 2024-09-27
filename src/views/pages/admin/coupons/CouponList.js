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
import { deleteCoupon, getCouponItems } from 'src/helpers/couponHelper'

const createData = (name, calories, fat, carbs, protein, toDate) => {
  return { name, calories, fat, carbs, protein, toDate }
}

const rows = [createData('FLASH25', 'FLASH25OFF', 'General', 24, '07/08/2024', '07/09/2024')]

const CouponList = ({coupons , setOpen, open , fetchCoupons , setPage}) => {
  

  const [itemId, setItemId] = useState('')

  const handleChange = (event, value) => {
    setPage(value)
  }

  

  const onDelete = async () => {
    try {
      let response = await deleteCoupon(itemId)
      fetchCoupons()
      setOpen(false)
    } catch (error) {}
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Coupon Name</TableCell>
            <TableCell align='left'>Code </TableCell>
            <TableCell align='left'>Category</TableCell>
            <TableCell align='left'>Type</TableCell>
            {/* <TableCell align='left'>Redeemers</TableCell> */}
            <TableCell align='left'>From Date</TableCell>
            <TableCell align='left'>To Date</TableCell>
            <TableCell align='left'>Status</TableCell>
            <TableCell align='center'>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons?.coupons?.map(row => (
            <TableRow
              key={row.couponName}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.couponName}
              </TableCell>
              <TableCell component='th' scope='row'>
                {row.code}
              </TableCell>
              <TableCell align='left'>{row.itemType}</TableCell>
              <TableCell align='left'>{row.discountType}</TableCell>
              <TableCell align='left'>{new Date(row.validFrom).toLocaleDateString()}</TableCell>
              <TableCell align='left'>{new Date(row.validTill).toLocaleDateString()}</TableCell>
              {/* <TableCell align='left'>{row.toDate}</TableCell> */}
              <TableCell align='left'>
                <Chip
                  rounded
                  size='small'
                  skin='light'
                  color={row.couponStatus ? 'primary' : 'error'}
                  label={row.couponStatus ? 'Active' : 'Inactive'}
                  sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
              </TableCell>
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <Tooltip title='Edit'>
                    <IconButton size='small' component={Link} href={`/admin/coupons/${row.id}/edit`}>
                      <Icon icon='tabler:edit' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete Coupon'>
                    <IconButton
                      size='small'
                      onClick={() => {
                        setOpen(true), setItemId(row.id)
                      }}
                    >
                      <Icon icon='tabler:trash' />
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
          count={coupons?.totalPages}
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
        successCallback={onDelete}
      />
    </TableContainer>
  )
}

export default CouponList
