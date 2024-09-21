import Guard from 'src/guards/Guard'
import RedirectMenuIfAuthenticated from 'src/guards/RedirectMenuIfAuthenticated'
import { useAuth } from 'src/hooks/useAuth'
import MainUserLayout from 'src/layouts/MainUserLayout'
import GuestMenu from 'src/views/pages/menu/GuestMenu'
import UserMenuPage from 'src/views/pages/menu/UserMenuPage'

export default function FoodMenu() {
  const { user } = useAuth()

  return <GuestMenu />
}
FoodMenu.getLayout = function getLayout(page) {
  return (
    <>
      <RedirectMenuIfAuthenticated>{page}</RedirectMenuIfAuthenticated>
    </>
  )
}
