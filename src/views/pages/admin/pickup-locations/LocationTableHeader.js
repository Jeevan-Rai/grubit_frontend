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
import Link from 'next/link'

const CustomInput = forwardRef((props, ref, label) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label={props.label} autoComplete='off' />
})

const LocationTableHeader = ({ setSearch, setDate, date, setStatus }) => {
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
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            fullWidth
            sx={{ mr: 4 }}
            placeholder='Search pickup location'
            onChange={e => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <>
            <DatePickerWrapper>
              <ReactDatePicker
                selected={date != null ? new Date(date) : false}
                id='basic-input'
                dateFormat='dd/MM/yyyy'
                onChange={date => setDate(date)}
                placeholderText='Filter by order date'
                customInput={<CustomInput label='' />}
              />
            </DatePickerWrapper>
          </>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            label=''
            onChange={e => setStatus(e.target.value)}
            placeholder='Leonard'
            aria-describedby='validation-basic-first-name'
            id='form-layouts-separator-select'
            defaultValue=''
          >
            <MenuItem value={''}>Select Status</MenuItem>
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Link href={'/admin/pickup-locations/create'}>
            <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:plus' />
              Add Location
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LocationTableHeader
