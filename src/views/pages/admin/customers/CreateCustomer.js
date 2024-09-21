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
const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const CreateCustomer = () => {
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
    // Create a FormData object to send files
    const formData = new FormData()
    console.log(data)

    // Append all form data including file
    // formData.append('name', data.name)
    formData.append('file', data.file[0]) // data.file is an array, so take the first item

    // Example: send the formData to an API (adjust the URL and headers as needed)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      console.log('Upload successful:', result)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
    // toast.success('Form Submitted')
    toast.error('Something Went wrong while submitting the form')
    // Optionally reset the form
    reset()
  }
  return (
    <Card>
      <CardHeader title='Item Details' />
      <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
        <ImageUpload register={register} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='itemName'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Item Name'
                    onChange={onChange}
                    placeholder='Enter name'
                    error={Boolean(errors.itemName)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.itemName && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='category'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    value={value}
                    label='Category'
                    onChange={onChange}
                    placeholder='Leonard'
                    error={Boolean(errors.category)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.category && { helperText: 'This field is required' })}
                    id='form-layouts-separator-select'
                    defaultValue=''
                  >
                    <MenuItem value='Weekly'>Weekly</MenuItem>
                    <MenuItem value='Make Your Own'>Make Your Own</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='price'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Price (in GBP)'
                    onChange={onChange}
                    placeholder='Enter Price in GBP'
                    error={Boolean(errors.price)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.price && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='calories'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Calories'
                    onChange={onChange}
                    placeholder='Enter number of calories'
                    error={Boolean(errors.calories)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.calories && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='protien'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Protiens(g)'
                    onChange={onChange}
                    placeholder='Enter amount of proteins'
                    error={Boolean(errors.protien)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.protien && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='carb'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Carbs(g)'
                    onChange={onChange}
                    placeholder='Enter amount of carbs'
                    error={Boolean(errors.carb)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.carb && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='fat'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Fat(g)'
                    onChange={onChange}
                    placeholder='Enter amount of fat'
                    error={Boolean(errors.fat)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.fat && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='details'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    multiline
                    rows={8}
                    fullWidth
                    value={value}
                    label='Details'
                    onChange={onChange}
                    placeholder='Enter Details'
                    error={Boolean(errors.fat)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.fat && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '18px' }}>
                {categoryType === 'Weekly' ? 'Will this item be available on: ' : 'Primary Options'}
              </Typography>
            </Grid>

            {categoryType === 'Weekly' && (
              <>
                <Grid item xs={12}>
                  <Controller
                    name='monday'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Box>
                        Monday
                        <Switch
                          {...field}
                          aria-describedby='validation-basic-first-name'
                          sx={errors.monday ? { color: 'error.main' } : null}
                        />
                      </Box>
                    )}
                  />
                  {errors.monday && <span>This field is required</span>}
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='tuesday'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Box>
                        Tuesday
                        <Switch
                          {...field}
                          aria-describedby='validation-basic-first-name'
                          sx={errors.tuesday ? { color: 'error.main' } : null}
                        />
                      </Box>
                    )}
                  />
                  {errors.monday && <span>This field is required</span>}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='wednesday'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Box>
                        Wednesday
                        <Switch
                          {...field}
                          aria-describedby='validation-basic-first-name'
                          sx={errors.wednesday ? { color: 'error.main' } : null}
                        />
                      </Box>
                    )}
                  />
                  {errors.monday && <span>This field is required</span>}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='thursday'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Box>
                        Thursday
                        <Switch
                          {...field}
                          aria-describedby='validation-basic-first-name'
                          sx={errors.thursday ? { color: 'error.main' } : null}
                        />
                      </Box>
                    )}
                  />
                  {errors.monday && <span>This field is required</span>}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='friday'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Box>
                        Friday
                        <Switch
                          {...field}
                          aria-describedby='validation-basic-first-name'
                          sx={errors.friday ? { color: 'error.main' } : null}
                        />
                      </Box>
                    )}
                  />
                  {errors.monday && <span>This field is required</span>}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='saturday'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Box>
                        Saturday
                        <Switch
                          {...field}
                          aria-describedby='validation-basic-first-name'
                          sx={errors.saturday ? { color: 'error.main' } : null}
                        />
                      </Box>
                    )}
                  />
                  {errors.monday && <span>This field is required</span>}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='sunday'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Box>
                        Sunday
                        <Switch
                          {...field}
                          aria-describedby='validation-basic-first-name'
                          sx={errors.sunday ? { color: 'error.main' } : null}
                        />
                      </Box>
                    )}
                  />
                  {errors.monday && <span>This field is required</span>}
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: '800', fontSize: '18px' }}>
                  <Controller
                    name='status'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Box>
                        Is the Item Available Now?
                        <Switch
                          {...field}
                          aria-describedby='validation-basic-first-name'
                          sx={errors.status ? { color: 'error.main' } : null}
                          defaultChecked
                        />{' '}
                        <br />
                        <small style={{ fontWeight: '400' }}>
                          (Turning this off will automatically turn off the item respectively for all days)
                        </small>
                      </Box>
                    )}
                  />
                </Grid>
              </>
            )}

            {categoryType === 'Make Your Own' && (
              <>
                {primaryOptions.map((field, index) => {
                  return (
                    <>
                      <Grid item xs={12} sm={6} key={field.id}>
                        <Controller
                          name={`primary.${index}.value`}
                          control={control}
                          rules={{ required: false }}
                          render={({ field: { value, onChange } }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                              <CustomTextField
                                fullWidth
                                value={value}
                                label={`Option ${index + 1}`}
                                onChange={onChange}
                                placeholder='Enter option name'
                                error={Boolean(errors.primary)}
                                aria-describedby='validation-basic-first-name'
                                {...(errors.primary && { helperText: 'This field is required' })}
                              />
                              <Box sx={{ marginTop: '1.5em' }} onClick={() => removePrimaryField(index)}>
                                <Icon
                                  fontSize='1.125rem'
                                  icon='tabler:trash'
                                  color='text.primary'
                                  sx={{ color: 'text.primary' }}
                                />
                              </Box>
                            </Box>
                          )}
                        />
                      </Grid>
                    </>
                  )
                })}

                <Grid item xs={12}>
                  <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button
                      onClick={() => appendPrimaryField({ value: '' })}
                      variant='text'
                      sx={{ '& svg': { mr: 2 } }}
                    >
                      Add option
                      <Icon
                        fontSize='1.125rem'
                        icon='tabler:plus'
                        color='text.primary'
                        sx={{ color: 'text.primary' }}
                      />
                    </Button>
                  </Box>
                </Grid>
              </>
            )}

            {categoryType === 'Make Your Own' && (
              <>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '18px' }}>
                    Toppings
                  </Typography>
                </Grid>
                {toppingsOptions.map((field, index) => {
                  return (
                    <>
                      <Grid item xs={12} sm={6} key={field.id}>
                        <Controller
                          name={`topping.${index}.value`}
                          control={control}
                          rules={{ required: false }}
                          render={({ field: { value, onChange } }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                              <CustomTextField
                                fullWidth
                                value={value}
                                label={`Toping ${index + 1}`}
                                onChange={onChange}
                                placeholder='Enter toping name'
                                error={Boolean(errors.topping)}
                                aria-describedby='validation-basic-first-name'
                                {...(errors.topping && { helperText: 'This field is required' })}
                              />
                              <Box
                                color={'red'}
                                sx={{ marginTop: '1.5em', color: 'text.primary' }}
                                onClick={() => removeToppingsField(index)}
                              >
                                <Icon
                                  fontSize='1.125rem'
                                  icon='tabler:trash'
                                  color='text.primary'
                                  sx={{ color: 'text.primary' }}
                                />
                              </Box>
                            </Box>
                          )}
                        />
                      </Grid>
                    </>
                  )
                })}

                <Grid item xs={12}>
                  <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button
                      onClick={() => appendToppingsField({ value: '' })}
                      variant='text'
                      sx={{ '& svg': { mr: 2 } }}
                    >
                      Add Toppings
                      <Icon
                        fontSize='1.125rem'
                        icon='tabler:plus'
                        color='text.primary'
                        sx={{ color: 'text.primary' }}
                      />
                    </Button>
                  </Box>
                </Grid>
              </>
            )}
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

export default CreateCustomer
