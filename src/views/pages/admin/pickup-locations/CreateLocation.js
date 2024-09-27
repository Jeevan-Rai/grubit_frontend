// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import ImageUpload from 'src/views/components/uploads/ImageUpload'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Box } from '@mui/system'
import Icon from 'src/@core/components/icon'
import { createStation } from 'src/helpers/stationHelper'
import { useRouter } from 'next/router'
const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const CreateLocation = () => {
  let router = useRouter()
  // ** States
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    watch
  } = useForm({
    defaultValues: {
      primary: [{ value: '' }],
      topping: [{ value: '' }]
    }
  })
  const {
    fields: primaryOptions,
    append: appendPrimaryField,
    remove: removePrimaryField
  } = useFieldArray({
    control,
    name: 'primary'
  })

  const {
    fields: toppingsOptions,
    append: appendToppingsField,
    remove: removeToppingsField
  } = useFieldArray({
    control,
    name: 'topping'
  })

  let categoryType = watch('category')

  // Handle Password
  const onSubmit = async data => {
    // Example: send the formData to an API (adjust the URL and headers as needed)
    try {
      // Create a FormData object to send files
      const formData = new FormData()
      // data.file is an array, so take the first item
      formData.append('name', data.name)
      formData.append('details', data.details)
      formData.append('status', data.status)
      let response = await createStation({ name: data.name, details: data.details, status: data.status })
      toast.success('Submitted Successfully')
      router.push('/admin/pickup-locations')
      reset()
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error(error.message)
    }
    // toast.success('Form Submitted')

    // Optionally reset the form
  }
  return (
    <Card>
      <CardHeader title='Location Details' />
      <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Train Station Name'
                    onChange={onChange}
                    placeholder='Enter station  name'
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.name && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='details'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    multiline
                    rows={8}
                    fullWidth
                    value={value}
                    label='Additional Info'
                    onChange={onChange}
                    placeholder='Enter Additional Info'
                    error={Boolean(errors.details)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.details && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{}}>
              <Controller
                name='status'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Box>
                    Is the Location Available?
                    <Switch
                      {...field}
                      aria-describedby='validation-basic-first-name'
                      sx={errors.status ? { color: 'error.main' } : null}
                      checked={field?.value}
                    />{' '}
                    <br />
                  </Box>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button type='reset' onClick={() => reset()} color='secondary' variant='tonal'>
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default CreateLocation
