import { fetchLoader } from '@/app/fetchLoader'
import { routes, urls } from '@/configs/constant'
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

function getUser() {
  const user = localStorage.getItem('user')
  if (!user) return null
  return JSON.parse(user)
}

function authLoader() {
  const user = localStorage.getItem('user')
  if (!user && location.pathname !== routes.LOGIN) {
    redirect(routes.LOGIN)
  }

  if (user && location.pathname === routes.LOGIN) {
    redirect(routes.HOME)
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
        Component: Home,
        loader: () => fetchLoader(urls.ESPACIOS, urls.EVENTOS)
      },
      {
        path: 'espacios',
        children: [
          {
            index: true,
            Component: Espacios,
            loader: () => fetchLoader(urls.ESPACIOS)
          },
          {
            path: ':id',
            Component: EspacioDetalle,
            loader: ({ params }) =>
              fetchLoader(urls.ESPACIOS_DET(params.id), urls.ESPACIOS)
          }
        ]
      },
      {
        path: 'eventos',
        children: [
          {
            index: true,
            Component: Eventos,
            loader: () => fetchLoader(urls.EVENTOS)
          },
          {
            path: ':id',
            Component: EventoDetalle,
            loader: ({ params }) =>
              fetchLoader(urls.EVENTOS_DET(params.id), urls.EVENTOS)
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'espacios',
            Component: MisEspacios,
            loader: () =>
              fetchLoader(urls.ESPACIOS_PRIVADOS(getUser().username))
          },
          {
            path: 'eventos',
            Component: MisEventos,
            loader: () => fetchLoader(urls.EVENTOS_PRIVADOS(getUser().username))
          },
          {
            path: 'reservas',
            Component: MisReservas,
            loader: () => fetchLoader(urls.RESERVAS_PRIVADAS(getUser().id))
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
