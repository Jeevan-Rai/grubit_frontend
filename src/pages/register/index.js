// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import RedirectIfAuthenticated from 'src/guards/RedirectIfAuthenticated'
import { CardActions, CardContent, Grid, IconButton, InputAdornment, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { registerUser } from 'src/helpers/authHelpers'
import MessageDialog from 'src/views/components/dialogs/MessageDialog'
import { useRouter } from 'next/router'
import Usernavbar from 'src/views/components/UserNavbar'

// ** Styled Components

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@grubit.com'
}

const RegisterPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(false)
  const [title, setTitle] = useState(false)
  const [message, setMessage] = useState(false)
  const router = useRouter()
  const { returnUrl } = router.query
  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm()
  const password = watch('password', '')
  const onSubmit = async data => {
    try {
      const { email, password } = data
      const formData = new FormData()

      let user = await registerUser(data)

      if (user.status === 201) {
        setType('success')
        setTitle('Verify your email ✉️')
        setMessage(
          `Account activation link sent to your email address: ${data.email} Please follow the link inside to continue.`
        )
        setOpen(true)
        reset({
          firstName: '',
          lastName: '',
          addressLineOne: '',
          addressLineTwo: '',
          email: '',
          cityName: '',
          postCode: '',
          phoneNumber: '',
          password: '',
          confirmPassword: ''
        })

        router.replace(returnUrl ? user?.data?.url + '?returnUrl=' + returnUrl : user?.data?.url)
      }
    } catch (error) {
      setType('error')
      setTitle('Oops!')
      setMessage(error?.response?.data?.message || 'Something went wrong')
      setOpen(true)
    }
  }
  console.log(errors)

  return (
    <>
      <Usernavbar />
      <Box sx={{ padding: '40px' }} />
      <Box
        className=''
        sx={{
          background: "url('/images/Grubit Login Background Image.png')",
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            p: [6, 6],

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '10px'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: { xs: '80vw ', md: '50vw' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1em' }}>
            <Box component={'img'} src='/images/logo.png' sx={{ width: '100px' }} />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {`Welcome to GRUBIT 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign in to your account and start your nourishing journey
              </Typography>
            </Box>
            {/* <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
              <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
                Admin: <strong> </strong> / Pass: <strong>admin</strong>
              </Typography>
              <Typography variant='body2' sx={{ color: 'primary.main' }}>
                Client: <strong>client@vuexy.com</strong> / Pass: <strong>client</strong>
              </Typography>
            </Alert> */}
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
                          label='Last Name'
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
                          value: /^[0-9]{11}$/, // Example for a 10-digit phone number
                          message: 'Invalid phone number. Must be 11 digits.'
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
                          label='State/Country'
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
                      rules={{ required: true }}
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

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='password'
                      control={control}
                      rules={{
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                          message:
                            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
                        }
                      }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label='Password'
                          onChange={onChange}
                          placeholder='Enter Password'
                          error={Boolean(errors.password)}
                          aria-describedby='validation-basic-first-name'
                          {...(errors.password && { helperText: errors.password.message })}
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='confirmPassword'
                      control={control}
                      rules={{
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                          message:
                            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
                        },
                        validate: value => value === password || 'Passwords do not match'
                      }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label='Confirm Password'
                          onChange={onChange}
                          placeholder='Enter Post Code'
                          error={Boolean(errors.confirmPassword)}
                          aria-describedby='validation-basic-first-name'
                          {...(errors.confirmPassword && { helperText: errors.confirmPassword.message })}
                          type={showConfirmPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  <Icon
                                    fontSize='1.25rem'
                                    icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'}
                                  />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
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
                {/* <Button type='reset' color='secondary' variant='tonal'>
                  Reset
                </Button> */}
                <Button type='submit' sx={{ mr: 2 }} variant='contained'>
                  Register
                </Button>
              </CardActions>
            </form>
          </Box>
        </Box>
      </Box>
      <MessageDialog type={type} open={open} setOpen={setOpen} title={title} message={message} />
    </>
  )
}
RegisterPage.getLayout = page => (
  // <RedirectIfAuthenticated>
  <BlankLayout>{page}</BlankLayout>
  // </RedirectIfAuthenticated>
)

export default RegisterPage
