import HomeMain from '@/HomeMain'
import Layout from '@/Layout'
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
        path: 'login',
        Component: Login
      },
      {
        path: 'home',
        Component: Home
      },
      {
        path: 'espacios',
        Component: Espacios
      },
      {
        path: 'espacios/:id',
        Component: EspacioDetalle
      },
      {
        path: 'eventos',
        Component: Eventos
      },
      {
        path: 'eventos/:id',
        Component: EventoDetalle
      },
      {
        path: 'mis-espacios',
        Component: MisEspacios
      },
      {
        path: 'mis-eventos',
        Component: MisEventos
      },
      {
        path: 'mis-reservas',
        Component: MisReservas
      }
    ]
  }
])

export default appRouter
