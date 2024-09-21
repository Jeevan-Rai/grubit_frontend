// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Grid, MenuItem } from '@mui/material'
import Link from 'next/link'

const LocationTableHeader = props => {
  // ** Props
  const { handleFilter, toggle, value } = props

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
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            value={value}
            fullWidth
            sx={{ mr: 4 }}
            placeholder='Search product'
            onChange={e => handleFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            value=''
            fullWidth
            sx={{ mr: 4 }}
            placeholder='Search product'
            onChange={e => handleFilter(e.target.value)}
          >
            {' '}
            <MenuItem value='Weekly'>Weekly</MenuItem>
            <MenuItem value='Make Your Own'>Make Your Own</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            value=''
            fullWidth
            sx={{ mr: 4 }}
            placeholder='Search product'
            onChange={e => handleFilter(e.target.value)}
          >
            {' '}
            <MenuItem value='Weekly'>Weekly</MenuItem>
            <MenuItem value='Make Your Own'>Make Your Own</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            onClick={toggle}
            fullWidth
            variant='contained'
            component={Link}
            href={'/admin/pickup-locations/create'}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            Add Pickup Location
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LocationTableHeader
