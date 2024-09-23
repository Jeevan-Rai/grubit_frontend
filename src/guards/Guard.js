// components/Guard.js
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import FallbackSpinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'
// import { useAuth } from '../context/AuthContext'
import Spinner from 'src/@core/components/spinner'
const Guard = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth() // Get user and loading from useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log(user)

    if (!loading && !user) {
      router.push('/login?returnUrl=' + router.pathname) // Redirect to login if not authenticated
    } else if (!loading && allowedRoles && !allowedRoles.includes(user?.role)) {
      console.log(user)

      // router.push('/403') // Redirect to 403 if role is not allowed
    }
  }, [loading, user])

  // Show spinner while loading user data
  if (loading) {
    return <Spinner />
  }

  // If not allowed to access, prevent rendering
  if (!user || (allowedRoles && !allowedRoles.includes(user?.role))) {
    return (
      <>
        <Spinner />
      </>
    )
  }

  return <>{children}</>
}

export default Guard
