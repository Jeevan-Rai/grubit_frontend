// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Guard from 'src/guards/Guard'
import UserLayout from 'src/layouts/UserLayout'
import CreateMenu from 'src/views/pages/admin/menu-items/CreateMenu'
import MainUserLayout from 'src/layouts/MainUserLayout'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, CardActions, CardContent } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import { registerUser, updatePassword, updateUser } from 'src/helpers/authHelpers'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const AccountPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(false)
  const [title, setTitle] = useState(false)
  const [message, setMessage] = useState(false)
  const { user } = useAuth()
  console.log(user)

  const {
    control,
    setError,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    values: {
      firstName: user.firstName,
      lastName: user.lastName,
      addressOne: user.addressOne,
      addressTwo: user.addressTwo,
      email: user.email,
      cityName: user.cityName,
      postCode: user.postCode,
      phoneNumber: user.phone
    }
  })

  const {
    control: paswordControl,
    setError: passwordError,
    handleSubmit: handlePasswordUpdate,
    reset: passwordReset,
    formState: { errors: passwordErrors }
  } = useForm()

  const onSubmit = async data => {
    try {
      console.log(data)

      let user = await updateUser(data)

      setType('success')
      setTitle('Verify your email ✉️')
      setMessage(
        `Account activation link sent to your email address: ${data.email} Please follow the link inside to continue.`
      )
      setOpen(true)
      toast.success('Profile updates sucessfully')
    } catch (error) {
      setType('error')
      setTitle('Oops!')
      setMessage(errors.message)
      setOpen(true)
      reset({})
    }
  }

  const onPasswordUpdate = async data => {
    try {
      console.log(data)

      let user = await updatePassword(data)

      setType('success')
      setTitle('Verify your email ✉️')
      setMessage(
        `Account activation link sent to your email address: ${data.email} Please follow the link inside to continue.`
      )
      setOpen(true)
      toast.success('Profile updates sucessfully')
    } catch (error) {
      toast.error(error.response.data.message)
      setType('error')
      setTitle('Oops!')
      setMessage(errors.message)
      setOpen(true)
      reset({})
    }
  }

  console.log(passwordErrors)

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Add Menu Items
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography sx={{ color: 'text.secondary' }}></Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='First Name'
                        onChange={onChange}
                        placeholder='Enter first name'
                        error={Boolean(errors.firstName)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.firstName && { helperText: 'This field is required' })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='lastName'
                        onChange={onChange}
                        placeholder='Enter last name'
                        error={Boolean(errors.lastName)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.lastName && { helperText: 'This field is required' })}
                        id='form-layouts-separator-select'
                        defaultValue=''
                      ></CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{
                      required: 'This field is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Email'
                        onChange={onChange}
                        placeholder='Enter email'
                        error={Boolean(errors.email)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.email && { helperText: errors.email.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='phoneNumber'
                    control={control}
                    rules={{
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/, // Example for a 10-digit phone number
                        message: 'Invalid phone number. Must be 10 digits.'
                      }
                    }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Phone Number'
                        onChange={onChange}
                        placeholder='Enter phone number'
                        error={Boolean(errors.phoneNumber)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.phoneNumber && { helperText: errors.phoneNumber.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='addressOne'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Address Line 1'
                        onChange={onChange}
                        placeholder='Enter  Address Line One'
                        error={Boolean(errors.addressLineOne)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.addressLineOne && { helperText: 'This field is required' })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='addressTwo'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Address Line 2'
                        onChange={onChange}
                        placeholder='Enter Address Line Two'
                        error={Boolean(errors.addressLineTwo)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.addressLineTwo && { helperText: 'This field is required' })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='cityName'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='City Name'
                        onChange={onChange}
                        placeholder='Enter City Name'
                        error={Boolean(errors.cityName)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.cityName && { helperText: 'This field is required' })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='postCode'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Post Code'
                        onChange={onChange}
                        placeholder='Enter Post Code'
                        error={Boolean(errors.postCode)}
                        aria-describedby='validation-basic-first-name'
                        {...(errors.postCode && { helperText: 'This field is required' })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '18px' }}></Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type='submit' sx={{ mr: 2, backgroundColor: '#FD5B29' }} variant='contained'>
                Register
              </Button>
              <Button type='reset' color='secondary' variant='tonal'>
                Reset
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <form onSubmit={handlePasswordUpdate(onPasswordUpdate)} encType='multipart/form-data'>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='oldPassword'
                    control={paswordControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Old Password'
                        onChange={onChange}
                        placeholder='Enter old password'
                        error={Boolean(passwordErrors.oldPassword)}
                        aria-describedby='validation-basic-first-name'
                        {...(passwordErrors.oldPassword && { helperText: 'This field is required' })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='newPassword'
                    control={paswordControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='New Password'
                        onChange={onChange}
                        placeholder='Enter new password'
                        error={Boolean(passwordErrors.newPassword)}
                        aria-describedby='validation-basic-first-name'
                        {...(passwordErrors.newPassword && { helperText: 'This field is required' })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '18px' }}></Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type='submit' sx={{ mr: 2, backgroundColor: '#FD5B29' }} variant='contained'>
                Update Password
              </Button>
              <Button type='reset' color='secondary' variant='tonal'>
                Reset
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

AccountPage.getLayout = page => (
  <Guard allowedRoles={['user']}>
    <MainUserLayout>{page}</MainUserLayout>
  </Guard>
)
export default AccountPage
