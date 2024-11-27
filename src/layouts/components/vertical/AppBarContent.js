// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import Typography from '@mui/material/Typography'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
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
      </Box>

      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              marginRight: '15px',
              color: '#F56700',
              padding: '0.25em',
              border: `1px solid #F56700`,
              borderRadius: '50%'
            }}
            onClick={toggleNavVisibility}
          >
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}

        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
      </Box>
    </Box>
  )
}

export default AppBarContent
