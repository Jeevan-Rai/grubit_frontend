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
import MakeYourOwnCollapsibleForm from '../MakeYourOwnCollapsibleForm'

const MakeYourOwnForm = ({ open, setOpen, item, type, date, week }) => {
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
        maxWidth='lg'
        open={open}
        scroll={'body'}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        sx={{ padding: '0px', borderRadius: '50px !important' }}
      >
        <DialogContent dividers={scroll === 'paper'} sx={{ padding: '0px !important', overflowY: 'hidden' }}>
          <Grid container>
            <Grid item md={4} component={'img'} sx={{ width: '400px', height: '100%', margin: '0px' }} src={process.env.NEXT_PUBLIC_BACKEND_URL + '/uploads/' + item.image}>
              {/* <Box component={'img'} sx={{ width: '400px', height: '100%', margin: '0px' }} src={process.env.NEXT_PUBLIC_BACKEND_URL + '/uploads/' + item.image} /> */}
            </Grid>
            <Grid item md={8} sx={{ padding: '2em' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: '500',
                  color: '#4B465C',
                  fontSize: '18px',
                  marginBottom: '0.5em'
                }}
              >
                {item.name}
              </Typography>
              <MakeYourOwnCollapsibleForm week={week} type={type} date={date} setOpen={setOpen} item={item} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MakeYourOwnForm
