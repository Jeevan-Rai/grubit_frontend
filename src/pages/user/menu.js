import FallbackSpinner from 'src/@core/components/spinner'
import Guard from 'src/guards/Guard'
import { useAuth } from 'src/hooks/useAuth'
import MainUserLayout from 'src/layouts/MainUserLayout'
import GuestMenu from 'src/views/pages/menu/GuestMenu'
import UserMenuPage from 'src/views/pages/menu/UserMenuPage'

export default function FoodMenu() {
  const { user } = useAuth()

  return user && user.role === 'user' ? (
    <>
      <UserMenuPage />
    </>
  ) : (
    <FallbackSpinner />
  )
}
FoodMenu.getLayout = function getLayout(page) {
  return (
    <>
      <Guard allowedRoles={['user']}>
        <MainUserLayout>{page}</MainUserLayout>
      </Guard>
    </>
  )
}
