// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Grid, MenuItem, Typography } from '@mui/material'
import ReactDatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { forwardRef } from 'react'

const CustomInput = forwardRef((props, ref, label) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label={props.label} autoComplete='off' />
})

const OrderTableHeader = ({ setSearch, setDate, date }) => {
  // ** Props

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
      <Typography>Search Filter</Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            fullWidth
            sx={{ mr: 4 }}
            placeholder=''
            onChange={e => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <>
            <DatePickerWrapper>
              <ReactDatePicker
                selected={date != null ? new Date(date) : false}
                id='basic-input'
                onChange={date => setDate(date)}
                placeholderText='Filter by order date'
                customInput={<CustomInput label='' />}
              />
            </DatePickerWrapper>
          </>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderTableHeader
