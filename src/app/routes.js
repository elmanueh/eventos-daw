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
import { createBrowserRouter } from 'react-router'

const appRouter = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomeMain },
      {
        path: 'home',
        Component: Home
      },
      {
        path: 'espacios',
        children: [
          { index: true, Component: Espacios },
          {
            path: ':id',
            Component: EspacioDetalle
          }
        ]
      },
      {
        path: 'eventos',
        children: [
          { index: true, Component: Eventos },
          {
            path: ':id',
            Component: EventoDetalle
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
    path: '/login',
    Component: Login
  }
])

export default appRouter
