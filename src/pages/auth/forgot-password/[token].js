// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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

// ** Demo Imports

import RedirectIfAuthenticated from 'src/guards/RedirectIfAuthenticated'
import { borderRadius } from '@mui/system'
import { forgotPassword, updateForgotPassword } from 'src/helpers/authHelpers'
import toast from 'react-hot-toast'
import MessageDialog from 'src/views/components/dialogs/MessageDialog'
import { useRouter } from 'next/router'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@grubit.com'
}

const VerifyResetPasswordToken = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { token } = router.query
  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(false)
  const [title, setTitle] = useState(false)
  const [message, setMessage] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const password = watch('password', '')
  const onSubmit = async data => {
    try {
      const { password, confirmPassword } = data
      const response = await updateForgotPassword({ password, confirmPassword, token })

      if (response.status === 200) {
        toast.success('Password updated successfully')
        router.replace('/login')
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box
      className=''
      sx={{
        background: "url('/images/Grubit Login Background Image.png')",
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
      }}
    >
      <RightWrapper>
        <Box
          sx={{
            p: [6, 6],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '10px'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1em' }}>
            <Box component={'img'} src='/images/logo.png' sx={{ width: '100px' }} />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Verified!
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please provide a new password to access you account
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
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
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
                      {...(errors.password && { helperText: 'This field is required' })}
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
              </Box>
              <Box sx={{ mb: 4 }}>
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
                              <Icon fontSize='1.25rem' icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {/* <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                /> */}
                {/* <Typography component={LinkStyled} href='/forgot-password'>
                  Forgot Password?
                </Typography> */}
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4, backgroundColor: '#F56700' }}>
                Verify Account
              </Button>
              <Button
                fullWidth
                component={Link}
                href={'/login'}
                variant='contained'
                sx={{
                  mb: 4,
                  backgroundColor: 'transparent',
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Cancel
              </Button>
            </form>
          </Box>
        </Box>
      </RightWrapper>
      <MessageDialog type={type} open={open} setOpen={setOpen} title={title} message={message} />
    </Box>
  )
}
VerifyResetPasswordToken.getLayout = page => (
  <RedirectIfAuthenticated>
    <BlankLayout>{page}</BlankLayout>
  </RedirectIfAuthenticated>
)

export default VerifyResetPasswordToken
