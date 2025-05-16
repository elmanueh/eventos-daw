import { NAV_ROUTES } from '@/configs/constant'
import ErrorCargandoDatos from '@pages/ErrorCargandoDatos'
import ErrorNotFound from '@pages/ErrorNotFound'
import HomeMain from '@pages/HomeMain'
import Layout from '@pages/Layout'
import Login from '@pages/auth/Login'
import EspacioDetalle from '@pages/espacios/EspacioDetalle'
import Espacios from '@pages/espacios/Espacios'
import MisEspacios from '@pages/espacios/MisEspacios'
import EventoDetalle from '@pages/eventos/EventoDetalle'
import Eventos from '@pages/eventos/Eventos'
import MisEventos from '@pages/eventos/MisEventos'
import Home from '@pages/home/Home'
import MisReservas from '@pages/reservas/MisReservas'
import { createBrowserRouter, redirect } from 'react-router'

function authLoader({ request }) {
  const user = localStorage.getItem('user')
  const url = new URL(request.url)

  if (!user && url.pathname !== NAV_ROUTES.LOGIN) {
    return redirect(NAV_ROUTES.LOGIN)
  }

  if (user && url.pathname === NAV_ROUTES.LOGIN) {
    return redirect(NAV_ROUTES.HOME)
  }

  return null
}

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
    loader: authLoader
  },
  {
    path: '/',
    Component: Layout,
    loader: authLoader,
    ErrorBoundary: ErrorCargandoDatos,
    children: [
      { index: true, Component: HomeMain },
      {
        path: 'home',
        Component: Home
      },
      {
        path: 'espacios',
        children: [
          {
            index: true,
            Component: Espacios
          },
          {
            path: ':id',
            Component: EspacioDetalle,
            loader: ({ params }) => params.id
          }
        ]
      },
      {
        path: 'eventos',
        children: [
          {
            index: true,
            Component: Eventos
          },
          {
            path: ':id',
            Component: EventoDetalle,
            loader: ({ params }) => params.id
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'espacios',
            Component: MisEspacios
          },
          {
            path: 'eventos',
            Component: MisEventos
          },
          {
            path: 'reservas',
            Component: MisReservas
          }
        ]
      }
    ]
  },
  {
    path: '*',
    Component: ErrorNotFound
  }
])

export default router
