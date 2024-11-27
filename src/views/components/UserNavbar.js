import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import { ButtonGroup, Drawer } from '@mui/material'
import Link from 'next/link'
import UserDrawer from './UserDrawer'
import { useRouter } from 'next/router'

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About Us', path: '/#about', type: 'scroll' },
  { name: 'Contact', path: '/#contact', type: 'scroll' }
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function Usernavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [appBarColor, setAppBarColor] = React.useState('#FFFFFF')
  const [appBarStatus, setAppBarStatus] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  let { user, logout } = useAuth()
  let router = useRouter()

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const scrollToSection = path => {
    // let element = document.querySelector(path)
    // if (element) {
    //   element?.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'start' // Can be 'start', 'center', 'end', 'nearest'
    //   })
    // }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY
  //     if (scrollY > 50) {
  //       setAppBarColor('#FFFFFF')
  //       setAppBarStatus(true) // Change to primary color when scrolling
  //     } else {
  //       setAppBarColor('white')
  //       setAppBarStatus(false) // Change to primary color when scrolling
  //       // Transparent when at the top
  //     }
  //   }
  //   setAppBarColor('white')

  //   // Add event listener for scroll
  //   window.addEventListener('scroll', handleScroll)

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])
  return (
    <>
      <AppBar position='fixed' sx={{ background: appBarColor, boxShadow: 'none' }}>
        <Container maxWidth='xl'>
          <Toolbar
            disableGutters
            sx={{
              width: { xs: '90%', md: '90%' },
              margin: '0px auto',
              p: appBarColor == 'transparent' ? { xs: '1rem 0px', md: '3rem' } : { xs: '1rem 0px', md: '1rem 3rem' },
              background: 'transparent'
            }}
          >
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              <Box component={'img'} src='/images/logo.png' sx={{ width: '100px' }} />
            </Typography>

            <Box
            // sx={{
            //   flexGrow: 1,
            //   display: { xs: 'flex', md: 'none' },
            //   marginRight: '15px',
            //   color: appBarColor === '#FFFFFF'  ? '#000000' : '#FFFFFF',
            //   padding: '0.25em',
            //   border: `1px solid ${appBarColor === '#FFFFFF' || router.pathname ? '#000000' : '#FFFFFF'}`,
            //   borderRadius: '50%'
            // }}
            >
              {/* <Icon onClick={() => setOpen(true)} icon='tabler:menu-2' fontSize={20} />

              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map(page => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography component={Link} href={page.path} sx={{ textAlign: 'center', fontFamily: 'DM sans' }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: '30 ',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
                           <Box component={'img'} src='/images/logo.png' sx={{ width: '100px' }} />

            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center ' }}>
              {pages.map(page => (
                <Button
                  key={page}
                  component={Link}
                  href={page.path}
                  onClick={() => page.type == 'scroll' && scrollToSection(page.path)}
                  sx={{
                    my: 2,
                    color: '#F56700',
                    display: 'block',
                    fontFamily: 'DM sans'
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {user && (
                <>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Tooltip title='Open settings'>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={user?.firstName} src='/static/images/avatar/2.jpg' />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem component={Link} href={user?.role == 'user' ? '/account' : '/admin/dashboard'}>
                        <Typography sx={{ textAlign: 'center' }}>Account</Typography>
                      </MenuItem>
                      {user?.role == 'user' && (
                        <MenuItem component={Link} href='/user/cart'>
                          <Typography sx={{ textAlign: 'center' }}>Cart</Typography>
                        </MenuItem>
                      )}

                      <MenuItem onClick={() => logout()}>
                        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              )}

              {!user && (
                <>
                  <Button
                    component={Link}
                    href={'/login'}
                    variant='oulined'
                    color='white'
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      background: appBarStatus ? '#F56700' : '#ffffff',
                      color: appBarStatus ? '#FFFFFF' : '#000000',
                      borderRadius: '37px',
                      p: '10px 20px',
                      '&:hover': {
                        //   backgroundColor: '#ffffff', // Change the background color on hover
                        //   transform: 'scale(1.05)' // Scale the button on hover

                        color: '#000000',
                        border: '#000000'
                      }
                    }}
                  >
                    Login / Sign Up
                  </Button>
                </>
              )}

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'flex', md: 'none' },
                  marginRight: '15px',
                  color: appBarColor === '#FFFFFF' ? '#F56700' : '#FFFFFF',
                  padding: '0.25em',
                  border: `1px solid ${appBarColor === '#FFFFFF' || router.pathname ? '#F56700' : '#FFFFFF'}`,
                  borderRadius: '50%'
                }}
              >
                <Icon onClick={() => setOpen(true)} icon='tabler:menu-2' fontSize={20} />

                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  {pages.map(page => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography component={Link} href={page.path} sx={{ textAlign: 'center', fontFamily: 'DM sans' }}>
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <UserDrawer open={open} setOpen={setOpen} pages={pages} />
    </>
  )
}
export default Usernavbar
