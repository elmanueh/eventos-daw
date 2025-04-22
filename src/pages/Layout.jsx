import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
