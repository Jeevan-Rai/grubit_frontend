// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Grid } from '@mui/material'

const CustomerTableHeader = props => {
  // ** Props
  const { setSearch } = props

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
      <Grid item xs={12} sm={6}>
        <CustomTextField fullWidth sx={{ mr: 4 }} placeholder='Search user' onChange={e => setSearch(e.target.value)} />
      </Grid>
    </Box>
  )
}

export default CustomerTableHeader
