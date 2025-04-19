import AppNavbar from '@components/layout/AppNavBar'
import Footer from '@components/layout/Footer'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
      <Footer />
    </>
  )
}
