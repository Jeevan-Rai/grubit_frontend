// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

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
import { useRouter } from 'next/router'
import { getMenuItem, updateMenu } from 'src/helpers/menuHelper'
import ReactDatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const EditMenu = () => {
  // ** States

  let router = useRouter()
  const { id } = router.query
  const [menuItem, setMenuItem] = useState({})
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      itemName: menuItem?.name,
      file: menuItem?.image,
      category: menuItem?.categoryType,
      price: menuItem?.price,
      calories: menuItem?.calories,
      protien: menuItem?.proteins,
      carb: menuItem?.carbs,
      fat: menuItem?.fat,
      details: menuItem?.details,
      availableFrom: menuItem?.availableFrom ? new Date(menuItem?.availableFrom) : new Date(),
      availableTill: menuItem?.availableTill ? new Date(menuItem?.availableTill) : new Date(),
      monday: menuItem?.monday,
      tuesday: menuItem?.tuesday,
      wednesday: menuItem?.wednesday,
      thursday: menuItem?.thursday,
      friday: menuItem?.friday,
      saturday: menuItem?.saturday,
      sunday: menuItem?.sunday,
      status: menuItem?.status,
      primary: menuItem.options,
      topping: menuItem.toppings
    },
    values: {
      itemName: menuItem?.name,
      file: menuItem?.image,
      category: menuItem?.categoryType,
      price: menuItem?.price,
      calories: menuItem?.calories,
      protien: menuItem?.proteins,
      carb: menuItem?.carbs,
      fat: menuItem?.fat,
      details: menuItem?.details,
      availableFrom: menuItem?.availableFrom ? new Date(menuItem?.availableFrom) : new Date(),
      availableTill: menuItem?.availableTill ? new Date(menuItem?.availableTill) : new Date(),
      monday: menuItem?.monday,
      tuesday: menuItem?.tuesday,
      wednesday: menuItem?.wednesday,
      thursday: menuItem?.thursday,
      friday: menuItem?.friday,
      saturday: menuItem?.saturday,
      sunday: menuItem?.sunday,
      status: menuItem?.status,
      primary: menuItem.options,
      topping: menuItem.toppings
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
    try {
      const formData = new FormData()

      console.log(data)

      formData.append('itemName', data.itemName)
      formData.append('category', data.category)
      formData.append('price', data.price)
      formData.append('calories', data.calories)
      formData.append('protien', data.protien)
      formData.append('carb', data.carb)
      formData.append('fat', data.fat)
      formData.append('details', data.details)
      formData.append('availableFrom', data.availableFrom)
      formData.append('availableTill', data.availableTill)
      formData.append('monday', data.monday)
      formData.append('tuesday', data.tuesday)
      formData.append('wednesday', data.wednesday)
      formData.append('thursday', data.thursday)
      formData.append('friday', data.friday)
      formData.append('saturday', data.saturday)
      formData.append('sunday', data.sunday)
      formData.append('status', data.status)
      console.log(data)
      if (data.primary) {
        data.primary.forEach((item, index) => {
          if (item.id != undefined) formData.append(`primary[${index}][id]`, item.id)
          formData.append(`primary[${index}][value]`, item.value)
          formData.append(`primary[${index}][type]`, item.type)
        })
      }
      if (data.topping) {
        data.topping.forEach((item, index) => {
          if (item.id != undefined) formData.append(`topping[${index}][id]`, item.id)
          formData.append(`topping[${index}][value]`, item.value)
          formData.append(`topping[${index}][type]`, item.type)
        })
      }
      console.log(data.file && data.file.length > 0)
      console.log(data.file.length)

      if (data.file && data.file.length > 0) {
        console.log('inside file')

        formData.append('file', data.file[0])
      }
      let response = await updateMenu(formData, id)
      toast.success('Item updated successfully')
      router.replace('/admin/menu-items')
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error(error.message)
    }
  }

  const fetchMenuItem = async () => {
    const response = await getMenuItem({ id })
    setMenuItem(response.data)
    setValue('category', response.data.categoryType)
    setValue('availableFrom', new Date(response.data.availableFrom))
    setValue('availableTill', new Date(response.data.availableTill))
  }

  useEffect(() => {
    if (id) fetchMenuItem()
  }, [id])

  // Pre-fill the form with existing values
  useEffect(() => {
    setValue('detail', menuItem.details)
    let OptionValue = menuItem?.options?.map(element => {
      return { value: element.name }
    })
    let ToppingValue = menuItem?.toppings?.map(element => {
      return { value: element.name }
    })
    console.log(menuItem?.options)

    console.log(OptionValue)

    setValue('category', menuItem?.categoryType)
    setValue('primary', OptionValue)
    setValue('topping', ToppingValue)
    setValue('file', menuItem?.image)
  }, [menuItem, setValue])

  console.log(errors)
  let availableFrom = watch('availableFrom')
  let image = watch('file')
  return (
    <Card>
      <CardHeader title='Item Details' />
      <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
        <ImageUpload register={register} image={process.env.NEXT_PUBLIC_BACKEND_URL + '/uploads/' + image} />
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
                    select={value != null && value != undefined}
                    fullWidth
                    value={value}
                    label='Category'
                    onChange={onChange}
                    placeholder='Leonard'
                    error={Boolean(errors.category)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.category && { helperText: 'This field is required' })}
                    id='form-layouts-separator-select'
                  >
                    <MenuItem value='weekly'>Weekly</MenuItem>
                    <MenuItem value='make-your-own'>Make Your Own</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='availableFrom'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <DatePickerWrapper>
                      <ReactDatePicker
                        selected={value}
                        id='basic-input'
                        dateFormat='dd/MM/yyyy'
                        placeholderText='Click to select a date'
                        defaultValue={value}
                        onChange={onChange}
                        minDate={new Date(availableFrom)}
                        customInput={
                          <CustomInput
                            label='Valid From'
                            {...(errors.availableFrom && { helperText: 'This field is required' })}
                          />
                        }
                      />
                    </DatePickerWrapper>
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='availableTill'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <DatePickerWrapper>
                      <ReactDatePicker
                        selected={value}
                        id='basic-input'
                        dateFormat='dd/MM/yyyy'
                        placeholderText='Click to select a date'
                        value={value}
                        minDate={new Date(availableFrom)}
                        onChange={onChange}
                        customInput={
                          <CustomInput
                            label='Valid Till'
                            {...(errors.availableTill && { helperText: 'This field is required' })}
                          />
                        }
                      />
                    </DatePickerWrapper>
                  </>
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
                {categoryType === 'weekly' ? 'Will this item be available on: ' : 'Primary Options'}
              </Typography>
            </Grid>

            {categoryType === 'weekly' && (
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
                          checked={field?.value}
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
                          checked={field?.value}
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
                          checked={field?.value}
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
                          checked={field?.value}
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
                          checked={field?.value}
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
                          checked={field?.value}
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
                          checked={field?.value}
                        />
                      </Box>
                    )}
                  />
                  {errors.monday && <span>This field is required</span>}
                </Grid>
              </>
            )}

            {categoryType === 'make-your-own' && (
              <>
                {primaryOptions.map((field, index) => {
                  return (
                    <>
                      <Grid item xs={12} sm={6} key={field.id}>
                        <Controller
                          name={`primary.${index}.id`}
                          control={control}
                          rules={{ required: false }}
                          render={({ field: { value, onChange } }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                              <CustomTextField
                                sx={{ display: 'none' }}
                                fullWidth
                                value={value}
                                label={`Option ${index + 1}`}
                                onChange={onChange}
                                placeholder='Enter option name'
                                error={Boolean(errors.primary)}
                                aria-describedby='validation-basic-first-name'
                                {...(errors.primary && { helperText: 'This field is required' })}
                                defaultValues={value}
                              />
                            </Box>
                          )}
                        />
                        {/* <Controller
                          name={`primary.${index}.type`}
                          control={control}
                          rules={{ required: false }}
                          render={({ field: { value, onChange } }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                              <CustomTextField
                                select
                                fullWidth
                                value={value}
                                label={`Primary Option ${index + 1} Type`}
                                onChange={onChange}
                                placeholder='Enter option name'
                                error={Boolean(errors.primary)}
                                aria-describedby='validation-basic-first-name'
                                defaultValue={value}
                                {...(errors.primary && { helperText: 'This field is required' })}
                              >
                                <MenuItem value={'veg'}>Veg</MenuItem>
                                <MenuItem value={'non-veg'}>Non Veg</MenuItem>
                                <MenuItem value={'vegan'}>Vegan</MenuItem>
                              </CustomTextField>
                             
                            </Box>
                          )}
                        /> */}
                        <Box sx={{ height: '0.5em' }} />
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
                                defaultValues={value}
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

            {categoryType === 'make-your-own' && (
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
                          name={`topping.${index}.id`}
                          control={control}
                          rules={{ required: false }}
                          render={({ field: { value, onChange } }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                              <CustomTextField
                                sx={{ display: 'none' }}
                                fullWidth
                                value={value}
                                label={`Option ${index + 1}`}
                                onChange={onChange}
                                placeholder='Enter option name'
                                error={Boolean(errors.topping)}
                                aria-describedby='validation-basic-first-name'
                                {...(errors.topping && { helperText: 'This field is required' })}
                                defaultValues={value}
                              />
                            </Box>
                          )}
                        />
                        {/* <Controller
                          name={`topping.${index}.type`}
                          control={control}
                          rules={{ required: false }}
                          render={({ field: { value, onChange } }) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                              <CustomTextField
                                select
                                fullWidth
                                value={value}
                                label={`Topping ${index + 1} Type`}
                                onChange={onChange}
                                placeholder='Enter option name'
                                error={Boolean(errors.primary)}
                                defaultValue={value}
                                aria-describedby='validation-basic-first-name'
                                {...(errors.primary && { helperText: 'This field is required' })}
                              >
                                <MenuItem value={'veg'}>Veg</MenuItem>
                                <MenuItem value={'non-veg'}>Non Veg</MenuItem>
                                <MenuItem value={'vegan'}>Vegan</MenuItem>
                              </CustomTextField>
                           
                            </Box>
                          )}
                        /> */}
                        <Box sx={{ height: '0.5em' }} />
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
                      checked={field?.value}
                    />{' '}
                    <br />
                    <small style={{ fontWeight: '400' }}>
                      (Turning this off will automatically turn off the item respectively for all days)
                    </small>
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

export default EditMenu
