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
import { deleteMenu, getMenuItems } from 'src/helpers/menuHelper'
import FallbackSpinner from 'src/@core/components/spinner'

const createData = (name, calories, fat, carbs, protein, status) => {
  return { name, calories, fat, carbs, protein, status }
}

const MenuItemsList = () => {
  const [open, setOpen] = useState(false)
  const [itemId, setItemId] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(10)
  const [menuItems, setMenuItems] = useState([])
  const handleChange = (event, value) => {
    setPage(value)
  }

  let fetchMenuItems = async () => {
    try {
      let response = await getMenuItems({ page, search, limit })
      setMenuItems(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMenuItems()
  }, [page, search])

  const onDelete = async () => {
    try {
      let response = await deleteMenu(itemId)
      fetchMenuItems()
      setOpen(false)
    } catch (error) {}
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Food Item</TableCell>
            <TableCell align='right'>Category</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Sales</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='center'>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menuItems?.menuItems?.map(row => (
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
              <TableCell align='right'>{row.categoryType}</TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.price}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
              <TableCell align='right'>
                <Chip
                  rounded
                  size='small'
                  skin='light'
                  color={row.status ? 'primary' : 'warning'}
                  label={row.status ? 'Active' : 'Inactive'}
                  sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
              </TableCell>
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <Tooltip title='Edit'>
                    <IconButton size='small' component={Link} href={`/admin/menu-items/${row.id}/edit`}>
                      <Icon icon='tabler:edit' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete'>
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
          count={menuItems?.totalPages}
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
        page={page}
        title={'Are you sure'}
        message={'This will delete everything'}
        setOpen={setOpen}
        successCallback={onDelete}
      />
    </TableContainer>
  )
}

export default MenuItemsList
