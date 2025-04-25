import { TARJETA_TIPOS } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { Button, Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisReservas() {
  const reservas = useLoaderData()._embedded.reservaResumenList

  const reservasActivas = reservas.filter((r) => !r.cancelada)
  const reservasCanceladas = reservas.filter((r) => r.cancelada)

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <h1 className="text-center">Mis Reservas</h1>

      <Button variant="primary" className="ms-auto">
        Crear Reserva
      </Button>

      <h3>Activas</h3>
      <GroupCards
        objetos={reservasActivas}
        tipo={TARJETA_TIPOS.RESERVAS}
        raw={true}
      ></GroupCards>

      <h3>Canceladas</h3>
      <GroupCards
        objetos={reservasCanceladas}
        tipo={TARJETA_TIPOS.RESERVAS}
      ></GroupCards>
    </Container>
  )
}
