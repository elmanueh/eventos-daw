import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import PrivateRoute from '@components/PrivateRoute'
import UserInfoCard from '@components/UserInfoCard'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <PrivateRoute>
      <Header />
      <div className="d-flex gap-4 mt-5">
        <div className="flex-grow-1">
          <Outlet />
        </div>
        <div className="d-none d-xl-block" style={{ minWidth: '350px' }}>
          <UserInfoCard />
        </div>
      </div>
      <Footer />
    </PrivateRoute>
  )
}
