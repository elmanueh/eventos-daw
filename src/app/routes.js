import Login from '@pages/auth/Login'
import ErrorCargandoDatos from '@pages/ErrorCargandoDatos'
import ErrorNotFound from '@pages/ErrorNotFound'
import EspacioDetalle from '@pages/espacios/EspacioDetalle'
import Espacios from '@pages/espacios/Espacios'
import MisEspacios from '@pages/espacios/MisEspacios'
import EventoDetalle from '@pages/eventos/EventoDetalle'
import Eventos from '@pages/eventos/Eventos'
import MisEventos from '@pages/eventos/MisEventos'
import Home from '@pages/home/Home'
import HomeMain from '@pages/home/HomeMain'
import Layout from '@pages/Layout'
import MisReservas from '@pages/reservas/MisReservas'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/',
    Component: Layout,
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
