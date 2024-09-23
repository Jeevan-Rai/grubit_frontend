// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import throttle from 'lodash/throttle'
import { useCallback } from 'react'
const MenuTableHeader = props => {
  // ** Props
  const { handleFilter, toggle, value, search, setSearch } = props

  const throttledSearch = useCallback(
    throttle(query => {
      setSearch(query)
    }, 1000),
    []
  )
  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CustomTextField
        value={value}
        sx={{ mr: 4 }}
        placeholder='Search product'
        onChange={e => throttledSearch(e.target.value)}
      />
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href={'/admin/menu-items/create'}>
          <Button variant='contained' sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            Add Item
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default MenuTableHeader
