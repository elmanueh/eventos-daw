import { NAV_ROUTES } from '@/configs/constant'
import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import UserInfoCard from '@components/UserInfoCard'
import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export default function Layout() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate(NAV_ROUTES.LOGIN)
    }
  }, [user, navigate])

  if (!user) return null
  return (
    <>
      <Header />
      <div className="d-flex">
        <div className="flex-grow-1">
          <Outlet />
        </div>
        <div
          className="mt-5 ms-4 me-4 d-none d-xl-block"
          style={{ minWidth: '320px' }}
        >
          <UserInfoCard />
        </div>
      </div>
      <Footer />
    </>
  )
}
