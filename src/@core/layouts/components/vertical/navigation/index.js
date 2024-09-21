// ** React Import
import { useRef, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Theme Config
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'

// ** Theme Options
import themeOptions from 'src/@core/theme/ThemeOptions'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useAuth } from 'src/hooks/useAuth'
import { Icon } from '@mui/material'

const StyledBoxForShadow = styled(Box)(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(${theme.palette.background.paper} ${
    theme.direction === 'rtl' ? '95%' : '5%'
  },${hexToRGBA(theme.palette.background.paper, 0.85)} 30%,${hexToRGBA(
    theme.palette.background.paper,
    0.5
  )} 65%,${hexToRGBA(theme.palette.background.paper, 0.3)} 75%,transparent)`,
  '&.scrolled': {
    opacity: 1
  }
}))

const Navigation = props => {
  // ** Props
  const {
    hidden,
    settings,
    afterNavMenuContent,
    beforeNavMenuContent,
    navigationBorderWidth,
    navMenuContent: userNavMenuContent
  } = props

  // ** States
  const [navHover, setNavHover] = useState(false)
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])

  // ** Ref
  const shadowRef = useRef(null)
  const { logout } = useAuth()

  // ** Var
  const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig

  const navMenuContentProps = {
    ...props,
    navHover,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    setCurrentActiveGroup
  }

  // ** Create new theme for the navigation menu when mode is `semi-dark`
  let darkTheme = createTheme(themeOptions(settings, 'dark'))

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    darkTheme = responsiveFontSizes(darkTheme)
  }

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = ref => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect
      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      container = hidden ? container.target : container
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains('scrolled')) {
          // @ts-ignore
          shadowRef.current.classList.add('scrolled')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('scrolled')
      }
    }
  }
  const ScrollWrapper = hidden ? Box : PerfectScrollbar

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover} navigationBorderWidth={navigationBorderWidth}>
        <VerticalNavHeader {...props} navHover={navHover} />
        {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed'
          ? beforeNavMenuContent(navMenuContentProps)
          : null}
        {(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) && (
          <StyledBoxForShadow ref={shadowRef} />
        )}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* @ts-ignore */}
          <ScrollWrapper
            {...(hidden
              ? {
                  onScroll: container => scrollMenu(container),
                  sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
                }
              : {
                  options: { wheelPropagation: false },
                  onScrollY: container => scrollMenu(container),
                  containerRef: ref => handleInfiniteScroll(ref)
                })}
          >
            {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static'
              ? beforeNavMenuContent(navMenuContentProps)
              : null}
            {userNavMenuContent ? (
              userNavMenuContent(navMenuContentProps)
            ) : (
              <List className='nav-items' sx={{ pt: 0, '& > :first-child': { mt: '0' } }}>
                <VerticalNavItems
                  navHover={navHover}
                  groupActive={groupActive}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                  {...props}
                />
              </List>
            )}
            {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static'
              ? afterNavMenuContent(navMenuContentProps)
              : null}
          </ScrollWrapper>
        </Box>
        {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed'
          ? afterNavMenuContent(navMenuContentProps)
          : null}
        <ListItem
          disablePadding
          className='nav-link fixed bottom'
          onClick={() => logout()}
          sx={{
            position: 'fixed',
            bottom: 50,
            left: 50,
            bgcolor: 'background.paper',
            boxShadow: 0,
            padding: 2,
            width: 'max-content',
            textAlign: 'center',
            fontSize: '15px',
            color: '#4B465C',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          <svg
            width={24}
            height={24}
            style={{ marginRight: '0.5em' }}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.9999 6C4.51393 8.09915 3.60383 11.5276 4.7214 14.5833C5.83897 17.639 8.74621 19.6714 11.9999 19.6714C15.2536 19.6714 18.1608 17.639 19.2784 14.5833C20.396 11.5276 19.4859 8.09915 16.9999 6'
              stroke='#FD2929'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path d='M12 4V12' stroke='#FD2929' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
          Logout
        </ListItem>
      </Drawer>
    </ThemeProvider>
  )
}

export default Navigation
