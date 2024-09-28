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
import { TextField } from '@mui/material'
import ReactDatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { createCoupon, getCouponItem, updateCoupon } from 'src/helpers/couponHelper'
import { useRouter } from 'next/router'
const CustomInput = forwardRef((props, ref, label) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label={props.label} autoComplete='off' />
})

const EditCoupon = () => {
  let router = useRouter()
  const { id } = router.query
  const [coupon, setCoupon] = useState({})
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    watch
  } = useForm({
    defaultValues: {
      ...coupon,
      validFrom: coupon?.validFrom ? new Date(coupon?.validFrom) : new Date(),
      validTill: coupon?.validTill ? new Date(coupon?.validTill) : new Date(),
      category: coupon?.itemType
    }
  })

  // Handle Password
  const onSubmit = async data => {
    // Create a FormData object to send files
    console.log('submitted')
    console.log(data)

    try {
      const formData = {}
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData[key] = data[key]
        }
      }

      let response = await updateCoupon(formData, id)
      toast.success('Coupon updated successfully')
      router.replace('/admin/coupons')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCoupon = async () => {
    const response = await getCouponItem({ id })
    setCoupon(response.data)
    console.log({
      ...response.data,
      validFrom: new Date(response.data.validFrom),
      validTill: new Date(response.data.validTill),
      category: response.data.itemType
    })

    reset({
      ...response.data,
      validFrom: new Date(response.data.validFrom),
      validTill: new Date(response.data.validTill),
      category: response.data.itemType
    })
  }

  useEffect(() => {
    if (id) fetchCoupon()
  }, [id])
  return (
    <Card>
      <CardHeader title='Coupon Details' />
      <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='couponName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Coupon Name'
                    onChange={onChange}
                    placeholder='Enter Coupon Name'
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.name && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='code'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Coupon code'
                    onChange={onChange}
                    placeholder='Enter Coupon code'
                    error={Boolean(errors.code)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.code && { helperText: 'This field is required' })}
                    id='form-layouts-separator-select'
                    defaultValue=''
                    disabled
                  ></CustomTextField>
                )}
              />
            </Grid>
      
            <Grid item xs={12} sm={6}>
              <Controller
                name='category'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    value={value}
                    label='Coupon category'
                    onChange={onChange}
                    placeholder='Enter Coupon category'
                    error={Boolean(errors.category)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.category && { helperText: 'This field is required' })}
                    defaultValue={value}
                  >
                    <MenuItem value='general'>General</MenuItem>
                    <MenuItem value='first-time'>First Time</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='discountValue'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Discount value'
                    onChange={onChange}
                    placeholder='Enter  Discount value'
                    error={Boolean(errors.discount)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.discount && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='validFrom'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <DatePickerWrapper>
                      <ReactDatePicker
                        selected={value}
                        id='basic-input'
                        placeholderText='Click to select a date'
                        defaultValue={value}
                        onChange={onChange}
                        customInput={
                          <CustomInput
                            label='Valid From'
                            {...(errors.validFrom && { helperText: 'This field is required' })}
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
                name='validTill'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <DatePickerWrapper>
                      <ReactDatePicker
                        selected={value}
                        id='basic-input'
                        placeholderText='Click to select a date'
                        value={value}
                        onChange={onChange}
                        customInput={
                          <CustomInput
                            label='Valid Till'
                            {...(errors.validTill && { helperText: 'This field is required' })}
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
                name='maximumDiscount'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Maximum Discount'
                    onChange={onChange}
                    placeholder='Enter Maximum Discount'
                    error={Boolean(errors.maximumDiscount)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.maximumDiscount && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='minimumBilling'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Minimum Billing Amount (GBP)'
                    onChange={onChange}
                    placeholder='Enter amount of minimumBillingAmount'
                    error={Boolean(errors.minimumBillingAmount)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.minimumBillingAmount && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='maximumUsage'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Maximum number of times this coupon should be used'
                    onChange={onChange}
                    placeholder='Enter Maximum number of times this coupon should be used'
                    error={Boolean(errors.maximumUsage)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.maximumUsage && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='perUserUsage'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='How many times a single user can use this?'
                    onChange={onChange}
                    placeholder='How many times a single user can use this?'
                    error={Boolean(errors.maximumPerUser)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.maximumPerUser && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ fontWeight: '800', fontSize: '18px' }}>
              <Controller
                name='couponStatus'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Box>
                    Is the Coupon Available Now?
                    <Switch
                      {...field}
                      aria-describedby='validation-basic-first-name'
                      sx={errors.couponStatus ? { color: 'error.main' } : null}
                      checked={field?.value}
                    />{' '}
                    <br />
                    <small style={{ fontWeight: '400' }}>
                      (Turning this off will automatically turn off the coupon respectively for all orders)
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

export default EditCoupon
