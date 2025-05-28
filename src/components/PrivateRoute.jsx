import { NAV_ROUTES } from '@/configs/constant'
import Loading from '@components/Loading'
import { AuthContext } from '@context/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router'

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <Loading />
  if (!user) {
    return <Navigate to={NAV_ROUTES.LOGIN} replace />
  }

  return children
}
