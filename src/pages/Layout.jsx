import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import UserInfoCard from '@components/UserInfoCard'
import { AuthContext } from '@context/AuthProvider'
import { useContext } from 'react'
import { Outlet } from 'react-router'

export default function Layout() {
  const { user } = useContext(AuthContext)

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
          <UserInfoCard user={user} />
        </div>
      </div>
      <Footer />
    </>
  )
}
