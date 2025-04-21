import ErrorCargandoDatos from '@/ErrorCargandoDatos'
import ErrorNotFound from '@/ErrorNotFound'
import { authLoader } from '@/app/authLoader'
import { routes, urls } from '@/configs/constant'
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

function redirectLogin() {
  const user = localStorage.getItem('user')
  if (!user && location.pathname !== routes.LOGIN) {
    return redirect(routes.LOGIN)
  }

  return null
}

function redirectApp() {
  const user = localStorage.getItem('user')
  if (user && location.pathname === routes.LOGIN) {
    return redirect(routes.HOME)
  }
  return null
}

const appRouter = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
    loader: redirectApp
  },
  {
    path: '/',
    Component: Layout,
    loader: redirectLogin,
    ErrorBoundary: ErrorCargandoDatos,
    children: [
      { index: true, Component: HomeMain },
      {
        path: 'home',
        Component: Home,
        loader: () => authLoader(urls.ESPACIOS, urls.EVENTOS)
      },
      {
        path: 'espacios',
        children: [
          {
            index: true,
            Component: Espacios,
            loader: () => authLoader(urls.ESPACIOS)
          },
          {
            path: ':id',
            Component: EspacioDetalle,
            loader: ({ params }) => authLoader(urls.ESPACIOS_DET(params.id))
          }
        ]
      },
      {
        path: 'eventos',
        children: [
          {
            index: true,
            Component: Eventos,
            loader: () => authLoader(urls.EVENTOS)
          },
          {
            path: ':id',
            Component: EventoDetalle,
            loader: ({ params }) => authLoader(urls.EVENTOS_DET(params.id))
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'espacios',
            Component: MisEspacios,
            loader: () => authLoader(urls.ESPACIOS_PRIVADOS)
          },
          {
            path: 'eventos',
            Component: MisEventos,
            loader: () => authLoader(urls.EVENTOS_PRIVADOS)
          },
          {
            path: 'reservas',
            Component: MisReservas,
            loader: () => authLoader(urls.RESERVAS_PRIVADAS)
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

export default appRouter
