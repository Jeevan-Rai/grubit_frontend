// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import ReactDatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Grid, MenuItem } from '@mui/material'
import Link from 'next/link'

import { forwardRef } from 'react'

const CustomInput = forwardRef((props, ref, label) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label={props.label} autoComplete='off' />
})

const CouponTableHeader = props => {
  // ** Props
  const { setStart, setEnd, setSearch, start, end } = props

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
            fullWidth
            sx={{ mr: 4 }}
            placeholder='Search coupon'
            onChange={e => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <>
            <DatePickerWrapper>
              <ReactDatePicker
                selected={start != null ? new Date(start) : false}
                id='basic-input'
                onChange={date => setStart(date)}
                placeholderText='Filter by order date'
                customInput={<CustomInput label='' />}
              />
            </DatePickerWrapper>
          </> */}
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <>
            <DatePickerWrapper>
              <ReactDatePicker
                selected={end != null ? new Date(end) : false}
                id='basic-input'
                onChange={date => setEnd(date)}
                placeholderText='Filter by order date'
                customInput={<CustomInput label='' />}
              />
            </DatePickerWrapper>
          </> */}
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            variant='contained'
            component={Link}
            href={'/admin/coupons/create'}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            Add Coupon
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CouponTableHeader
