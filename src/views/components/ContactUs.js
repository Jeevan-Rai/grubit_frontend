import { forwardRef, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import SectionHeader from './SectionHeader'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import MessageDialog from './dialogs/MessageDialog'
import axiosInstance from 'src/helpers/axiosInstance'
const Label = ({ name }) => {
  return (
    <>
      <Typography sx={{ fontFamily: 'DM Sans', fontWeight: '500', color: '#0A5247' }}>{name}</Typography>
    </>
  )
}
export default function ContactUs() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    watch
  } = useForm()
  const [open, setOpen] = useState(false)

  const onSubmit = async data => {
    axiosInstance.post('/api/v1/contact-us', data).then(res => {})
    setOpen(true)
    reset({
      name: '',
      email: '',
      phoneNumber: '',
      message: ''
    })
  }
  return (
    <>
      <Grid container sx={{ width: { xs: '90%', md: '75%' }, margin: '0px auto' }} id='contact'>
        <Grid item xs={12} sm={6} md={6} sx={{}}>
          <SectionHeader title='CONTACT US' align='left' />
          <Typography
            sx={{
              color: '#0A5247',
              fontSize: { xs: '15', md: '24px' },
              lineHeight: '40px',
              fontFamily: 'DM Sans',
              textAlign: 'justify',
              width: { xs: '100%', md: '80%' }
            }}
          >
            Got a question, feedback, or need assistance? Our team at Grub It is just a message away! Whether it’s about
            your order, our services, or anything else, we’d love to hear from you. Reach out to us, and we’ll get back
            to you as soon as possible to ensure your experience with Grub It is nothing short of amazing!
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              p: [6, 6],
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFF8DE',
              borderRadius: '10px',
              border: '1px solid #78B34E',
              marginTop: { xs: '30px', md: '0px' }
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 500 }}>
              <Box sx={{ my: 2 }}>
                <Typography variant='h3' sx={{ mb: 1.5, textAlign: 'center' }}>
                  Any Questions?
                </Typography>
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', color: '#969696' }}>
                  Please feel free to reach out to us.
                </Typography>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Box sx={{ mb: 4 }}></Box>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='name'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label={<Label name={'Name'} />}
                          onChange={onChange}
                          placeholder='Enter your Name'
                          error={Boolean(errors.name)}
                          aria-describedby='validation-basic-first-name'
                          {...(errors.name && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
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
                          label={<Label name={'Email'} />}
                          onChange={onChange}
                          placeholder='Enter your email'
                          error={Boolean(errors.email)}
                          aria-describedby='validation-basic-first-email'
                          {...(errors.email && { helperText: errors.email.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='phoneNumber'
                      control={control}
                      rules={{
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{11}$/, // Example for a 10-digit phone number
                          message: 'Invalid phone number. Must be 10 digits.'
                        }
                      }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label={<Label phone={'Phone Number'} />}
                          onChange={onChange}
                          placeholder='Enter phone number'
                          error={Boolean(errors.phoneNumber)}
                          aria-describedby='validation-basic-first-phone'
                          {...(errors.phoneNumber && { helperText: errors.phoneNumber.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='message'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          multiline
                          rows={4}
                          fullWidth
                          value={value}
                          label={<Label name={'Message'} />}
                          onChange={onChange}
                          placeholder='Enter message'
                          error={Boolean(errors.message)}
                          aria-describedby='validation-basic-first-name'
                          {...(errors.message && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button fullWidth type='submit' variant='contained' sx={{ mb: 4, backgroundColor: '#F56700' }}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <MessageDialog
        type={'success'}
        title={'Contact Us'}
        message={'Your information has been saved successfully , Our team wil reach out to you soon!'}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
