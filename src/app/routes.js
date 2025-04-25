import { API_URLS, NAV_ROUTES } from '@/configs/constant'
import { fetchGet } from '@/utils/fetchGet'
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
  if (!user && location.pathname !== NAV_ROUTES.LOGIN) {
    redirect(NAV_ROUTES.LOGIN)
  }

  if (user && location.pathname === NAV_ROUTES.LOGIN) {
    redirect(NAV_ROUTES.HOME)
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
        loader: () =>
          fetchGet(API_URLS.ESPACIOS_LISTAR, API_URLS.EVENTOS_LISTAR)
      },
      {
        path: 'espacios',
        children: [
          {
            index: true,
            Component: Espacios,
            loader: () => fetchGet(API_URLS.ESPACIOS_LISTAR)
          },
          {
            path: ':id',
            Component: EspacioDetalle,
            loader: ({ params }) =>
              fetchGet(
                API_URLS.ESPACIOS_DETALLE(params.id),
                API_URLS.ESPACIOS_LISTAR
              )
          }
        ]
      },
      {
        path: 'eventos',
        children: [
          {
            index: true,
            Component: Eventos,
            loader: () => fetchGet(API_URLS.EVENTOS_LISTAR)
          },
          {
            path: ':id',
            Component: EventoDetalle,
            loader: ({ params }) =>
              fetchGet(
                API_URLS.EVENTOS_DETALLE(params.id),
                API_URLS.EVENTOS_LISTAR
              )
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
              fetchGet(API_URLS.ESPACIOS_PROPIETARIO(getUser().username))
          },
          {
            path: 'eventos',
            Component: MisEventos,
            loader: () => fetchGet(API_URLS.EVENTOS_GESTOR(getUser().username))
          },
          {
            path: 'reservas',
            Component: MisReservas,
            loader: () => fetchGet(API_URLS.RESERVAS_USUARIO(getUser().id))
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
