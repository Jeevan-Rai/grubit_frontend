// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Box } from '@mui/material'

const MessageDialog = ({ open, title, message, setOpen, type }) => {
  // ** State

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
      >
        <DialogTitle
          id='alert-dialog-title'
          sx={{ display: 'flex', alignItems: 'center', gap: '1em', minWidth: '30vw' }}
        >
          {(type === 'warning' || type == 'error') && (
            <svg width='30' height='30' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M9 6V8.83617'
                stroke='#FF9F43'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M9 11.6541L9 11.6897'
                stroke='#FF9F43'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M3.7499 14.2499H14.2499C14.7468 14.2464 15.2097 13.9971 15.4861 13.5841C15.7624 13.1711 15.8163 12.648 15.6299 12.1874L10.3049 2.99989C10.0407 2.52242 9.53809 2.22607 8.9924 2.22607C8.44672 2.22607 7.94408 2.52242 7.6799 2.99989L2.3549 12.1874C2.1722 12.6372 2.21849 13.1476 2.47914 13.5572C2.73979 13.9668 3.18256 14.2249 3.6674 14.2499'
                stroke='#FF9F43'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          )}

          {type === 'success' && (
            <svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M0.75 5L4.5 8.75L12 1.25'
                stroke='#28C76F'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          )}

          {title}
        </DialogTitle>
        <Box sx={{ paddingLeft: '2.75em' }}>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
          </DialogContent>
          <DialogActions
            className='dialog-actions-dense'
            sx={{
              justifyContent: 'flex-start',
              marginLeft: '0.5em'
            }}
          >
            {type == 'warning' && (
              <>
                <Button onClick={handleClose} variant='contained' className='primary'>
                  Disagree
                </Button>
                <Button onClick={handleClose} variant='contained' color='secondary'>
                  Agree
                </Button>
              </>
            )}

            {(type === 'success' || type === 'error') && (
              <Button onClick={handleClose} variant='contained' className='primary'>
                Continue
              </Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  )
}

export default MessageDialog
