import { Fab, Badge } from '@mui/material'
import Link from 'next/link'
import Icon from 'src/@core/components/icon'

const FloatingCartButton = () => {
  const handleClick = () => {
    // Your cart click handler logic here
    console.log('Cart button clicked')
  }

  return (
    <Fab
      color='primary'
      aria-label='cart'
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        backgroundColor: '#FD5B29'
      }}
    >
      <Badge component={Link} href='/cart' sx={{ color: '#FFFFFF', fontWeight: '700', fontSize: '40px' }}>
        <Icon icon={'tabler:shopping-cart'} />
      </Badge>
    </Fab>
  )
}

export default FloatingCartButton
