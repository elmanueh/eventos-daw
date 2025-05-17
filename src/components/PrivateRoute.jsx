import { NAV_ROUTES } from '@/configs/constant'
import { AuthContext } from '@context/AuthContext'
import Loading from '@pages/Loading'
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
