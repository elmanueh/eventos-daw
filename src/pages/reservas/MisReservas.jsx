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

      <h3 id="titulo1-groupCards">Activas</h3>
      <GroupCards
        objetos={reservasActivas}
        tipo={TARJETA_TIPOS.RESERVAS}
        id={'titulo1-groupCards'}
      ></GroupCards>

      <h3 id="titulo2-groupCards">Canceladas</h3>
      <GroupCards
        objetos={reservasCanceladas}
        tipo={TARJETA_TIPOS.RESERVAS}
        id={'titulo2-groupCards'}
      ></GroupCards>
    </Container>
  )
}
