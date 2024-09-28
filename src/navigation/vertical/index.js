const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: 'tabler:chart-bar'
    },
    {
      title: 'Customer',
      path: '/admin/customers',
      icon: 'tabler:users'
    },
    {
      title: 'Menu Items',
      path: '/admin/menu-items',
      icon: 'tabler:list'
    },
    {
      title: 'Daily Orders',
      path: '/admin/orders/items',
      icon: 'tabler:calendar-event'
    },
    {
      title: 'Orders',
      path: '/admin/orders',
      icon: 'tabler:shopping-cart'
    },
    {
      title: 'Pickup Locations',
      path: '/admin/pickup-locations',
      icon: 'tabler:building'
    },
    {
      title: 'Coupons',
      path: '/admin/coupons',
      icon: 'tabler:gift'
    }
  ]
}

export default navigation
