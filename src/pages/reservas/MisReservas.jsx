import { TARJETA_TIPOS } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisReservas() {
  const [showReservaModal, setShowReservaModal] = useState(false)
  const reservas = useLoaderData()._embedded.reservaResumenList

  const reservasActivas = reservas.filter((r) => !r.cancelada)
  const reservasCanceladas = reservas.filter((r) => r.cancelada)

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <h1 className="text-center">Mis Reservas</h1>

      <h3 id="reservas-activas">Activas</h3>
      <GroupCards
        objetos={reservasActivas}
        tipo={TARJETA_TIPOS.RESERVAS}
        id={'reservas-activas'}
      ></GroupCards>

      <h3 id="reservas-canceladas">Canceladas</h3>
      <GroupCards
        objetos={reservasCanceladas}
        tipo={TARJETA_TIPOS.RESERVAS}
        id={'reservas-canceladas'}
      ></GroupCards>
    </Container>
  )
}
