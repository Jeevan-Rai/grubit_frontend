// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import { Box, Grid, Typography } from '@mui/material'

const FoodCardModal = ({ open, setOpen }) => {
  // ** States

  const [scroll, setScroll] = useState('body')

  // ** Ref
  const descriptionElementRef = useRef(null)

  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll('body')
  }
  const handleClose = () => setOpen(false)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div className='demo-space-x'>
      <Dialog
        maxWidth='md'
        open={open}
        scroll={'body'}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        sx={{ padding: '0px', borderRadius: '50px !important' }}
      >
        <DialogContent dividers={scroll === 'paper'} sx={{ padding: '0px !important', overflowY: 'hidden' }}>
          <Grid container>
            <Grid item md={6}>
              <Box component={'img'} sx={{ width: '100%', height: '100%', margin: '0px' }} src={'/images/Image.png'} />
            </Grid>
            <Grid item md={6} sx={{ padding: '2em' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: '500',
                  color: '#4B465C',
                  fontSize: '18px',
                  marginBottom: '0.5em'
                }}
              >
                Chicken Shawarma
              </Typography>
              <Grid container>
                <Grid item xs={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Box component={'img'} src='/images/icon/fire.png' />

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>Calorie</Typography>
                      <Typography variant='body2'>250</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Box component={'img'} src='/images/icon/fire.png' />

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>Calorie</Typography>
                      <Typography variant='body2'>250</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Box component={'img'} src='/images/icon/fire.png' />

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>Calorie</Typography>
                      <Typography variant='body2'>250</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Box component={'img'} src='/images/icon/fire.png' />

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>Calorie</Typography>
                      <Typography variant='body2'>250</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Typography
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: '500',
                  color: '#4B465C',
                  fontSize: '18px',
                  margin: '1em 0px'
                }}
              >
                Details
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: '400',
                  color: '#06423C',
                  fontSize: '15px',
                  margin: '0.5em 0px',
                  textAlign: 'justify'
                }}
              >
                chicken thigh, tortilla wrap (fortified wheat flour (wheat Flour, calcium carbonate, iron, niacin,
                thiamin), water, rapeseed oil, acidity regulator (E296), raising agents (E500), sugar, salt.) (GLUTEN),
                basmati rice, water, rapeseed oil, salt, oil, red onion, cucumber, tomato ketchup, shallot, coriander,
                gluten free soy sauce (water, SOY beans, salt, Spirit Vinegar) (SOYA), lemon juice, tomatoes, sriracha,
                water, salt, garlic puree, vinegar, ginger paste (SULPHITES), lime juice, caster sugar, parsley, ground
                cumin, turmeric, green chilli, ground coriander, black pepper, garlic paste, all purpose seasoning
                (CELERY, MUSTARD), ground cardamom, ground cinnamon, nutmeg, chilli powder, beetroot powder, Aleppo
                Pepper, black onion seeds
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: '500',
                  color: '#06423C',
                  fontSize: '18px',
                  margin: '0.5em 0px'
                }}
              >
                *For allergens, see ingredients in BOLD*
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: '1.5em' }}>
                <Button
                  sx={{
                    fontFamily: 'DM Sans',
                    fontWeight: '500',
                    color: '#5D586C',
                    fontSize: '15px',
                    border: '1px solid #FD5B2980',

                    color: '#FFFFFF',
                    background: '#FD5B29',
                    margin: '0.25em',
                    '&:hover': {
                      color: '#FFFFFF',
                      backgroundColor: '#FD5B29'
                    }
                  }}
                >
                  Add Item
                </Button>
                <Button
                  sx={{
                    fontFamily: 'DM Sans',
                    fontWeight: '500',
                    color: '#5D586C',
                    fontSize: '15px',
                    border: '1px solid #FD5B2980',

                    color: '#FD5B29',
                    margin: '0.25em',
                    '&:hover': {
                      color: '#FFFFFF',
                      backgroundColor: '#FD5B29'
                    }
                  }}
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FoodCardModal
