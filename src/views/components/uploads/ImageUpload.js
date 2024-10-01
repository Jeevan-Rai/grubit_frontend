// ** React Imports
import { useRef, useState } from 'react'

// ** MUI Imports

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { Box } from '@mui/material'

export default function ImageUpload({ register, reset, image = null }) {
  const [imgSrc, setImgSrc] = useState(image ? image : '/images/Background.png')
  const hiddenInputRef = useRef()
  const { ref: registerRef, ...rest } = register('file')
  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
  }))

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))

  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  }))

  const handleInputImageChange = event => {
    reset({ file: event.target.files[0] })
    const file = event.target.files[0]
    const urlImage = URL.createObjectURL(file)

    setImgSrc(urlImage)
  }

  const handleInputImageReset = () => {
    reset({ file: null })
    setImgSrc('/images/Background.png')
  }
  return (
    <>
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ImgStyled src={imgSrc} alt='Profile Pic' />
          <div>
            <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
              Upload New Photo
              <input
                hidden
                type='file'
                {...rest}
                onChange={handleInputImageChange}
                ref={e => {
                  registerRef(e)
                  hiddenInputRef.current = e
                }}
                accept='image/png, image/jpeg'
                //
                id='account-settings-upload-image'
              />
            </ButtonStyled>

            <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
              Reset
            </ResetButtonStyled>
            <Typography sx={{ mt: 4, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
          </div>
        </Box>
      </CardContent>
    </>
  )
}
