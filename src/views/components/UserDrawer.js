import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { Typography } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
export default function UserDrawer({ open, setOpen, pages }) {
  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }

  let { user, logout } = useAuth()
  const DrawerList = (
    <Box sx={{ width: 250 }} role='presentation'>
      <List>
        {pages.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>{index % 2 === 0 ? 'inbox' : 'mail'}</ListItemIcon> */}
              <Typography
                component={Link}
                href={text.path}
                sx={{
                  marginBottom: '1em',
                  color: '#F56700 !important',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                {text.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <Drawer anchor={'right'} open={open} sx={{ padding: '1em', paddingBottom: '0px' }} onClose={toggleDrawer(false)}>
        <Box sx={{ padding: '1em', paddingBottom: '0px' }}>
        <Box component={'img'} src='/images/logo.png' sx={{ width: '100px' }} />

        </Box>

        {DrawerList}

        <Divider
          sx={{
            color: '#FFFFFF',
            backgroundColor: '#F56700',
            borderRadius: '25px',
            width: '80%',
            margin: '0px auto',
            marginTop: '1em'
          }}
        />
        <Box sx={{ padding: '1em', paddingBottom: '0px' }}>
          <Button
            fullwidth
            component={Link}
            href='/menu'
            sx={{
              border: '1px solid #F56700 !important',
              marginBottom: '1em',
              color: '#F56700',
              borderRadius: '25px',
              width: '100%'
            }}
            variant='outlined'
          >
            Get Started
          </Button>
          {!user && (
            <Button
              fullwidth
              component={Link}
              href='/login'
              sx={{
                border: '1px solid #F56700 !important',
                color: '#FFFFFF',
                backgroundColor: '#F56700',
                borderRadius: '25px',
                width: '100%'
              }}
              variant='outlined'
            >
              Login
            </Button>
          )}

          {user && (
            <Button
              fullwidth
              onClick={() => logout()}
              sx={{
                border: '1px solid #F56700 !important',
                color: '#FFFFFF',
                backgroundColor: '#F56700',
                borderRadius: '25px',
                width: '100%'
              }}
              variant='outlined'
            >
              Logout
            </Button>
          )}
          {/* onClick={() => logout()} */}
        </Box>
      </Drawer>
    </div>
  )
}
