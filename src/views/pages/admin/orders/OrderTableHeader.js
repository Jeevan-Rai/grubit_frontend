// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Grid } from '@mui/material'

const OrderTableHeader = props => {
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
      <Grid item xs={12} sm={6}>
        <CustomTextField
          value={value}
          fullWidth
          sx={{ mr: 4 }}
          placeholder='Search product'
          onChange={e => handleFilter(e.target.value)}
        />
      </Grid>
    </Box>
  )
}

export default OrderTableHeader
