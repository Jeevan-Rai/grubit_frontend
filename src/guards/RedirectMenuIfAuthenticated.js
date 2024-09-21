// components/RedirectIfAuthenticated.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import FallbackSpinner from 'src/@core/components/spinner'

const RedirectMenuIfAuthenticated = ({ children }) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // If the user is authenticated, redirect to dashboard or any protected route
      user.role === 'user' ? router.push('/user/menu') : ''
    }
  }, [loading, user])

  if (loading) {
    return <FallbackSpinner /> // Show spinner while loading user data
  }

  // If not authenticated, allow access to the page (login page)
  return <>{children}</>
}

export default RedirectMenuIfAuthenticated
