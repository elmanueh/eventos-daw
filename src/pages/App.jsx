import AppNavbar from '@components/layout/AppNavBar'
import Footer from '@components/layout/Footer'
import Login from '@pages/auth/Login'
import EspacioDetalle from '@pages/espacios/EspacioDetalle'
import Espacios from '@pages/espacios/Espacios'
import MisEspacios from '@pages/espacios/MisEspacios'
import EventoDetalle from '@pages/eventos/EventoDetalle'
import Eventos from '@pages/eventos/Eventos'
import MisEventos from '@pages/eventos/MisEventos'
import Home from '@pages/home/Home'
import MisReservas from '@pages/reservas/MisReservas'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'

function App() {
  return (
    <>
      <AppNavbar />
      <div style={{ paddingTop: '60px' }}>
        <Routes>
          <Route
            path="/"
            element={<PrivateRouteLogin element={<RedirectToMainApp />} />}
          />
          <Route
            path="/login"
            element={<PrivateRouteLogin element={<Login />} />}
          />

          <Route
            path="/home"
            element={<PrivateRouteProtected element={<Home />} />}
          />

          <Route
            path="/espacios"
            element={<PrivateRouteProtected element={<Espacios />} />}
          />
          <Route path="/espacios/:id" element={<EspacioDetalle />} />

          <Route
            path="/eventos"
            element={<PrivateRouteProtected element={<Eventos />} />}
          />
          <Route path="/eventos/:id" element={<EventoDetalle />} />

          <Route
            path="/mis-espacios"
            element={<PrivateRouteProtected element={<MisEspacios />} />}
          />
          <Route
            path="/mis-eventos"
            element={<PrivateRouteProtected element={<MisEventos />} />}
          />

          <Route
            path="/mis-reservas"
            element={<PrivateRouteProtected element={<MisReservas />} />}
          />

          <Route
            path="*"
            element={
              <PrivateRouteProtected element={<Navigate to="/home" />} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

function RedirectToMainApp() {
  useEffect(() => {
    window.location.href = 'http://localhost:3000/'
  }, [])

  return null
}

function PrivateRouteLogin({ element, ...rest }) {
  const isAuthenticated = localStorage.getItem('token') !== null

  return isAuthenticated ? <Navigate to="/home" /> : element
}

function PrivateRouteProtected({ element, ...rest }) {
  const isAuthenticated = localStorage.getItem('token') !== null

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return element
}

export default App
