import { tipoTarjeta } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { Button, Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisReservas() {
  const reservas = useLoaderData()._embedded.reservaResumenList

  const reservasActivas = reservas.filter((r) => !r.cancelada)
  const reservasCanceladas = reservas.filter((r) => r.cancelada)

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Reservas</h1>

      <Button variant="primary" className="ms-auto">
        Crear Reserva
      </Button>

      <h3>Activas</h3>
      <GroupCards
        objetos={reservasActivas}
        tipoTarjeta={tipoTarjeta.RESERVAS}
      ></GroupCards>

      <h3>Canceladas</h3>
      <GroupCards
        objetos={reservasCanceladas}
        tipoTarjeta={tipoTarjeta.RESERVAS}
      ></GroupCards>
    </Container>
  )
}
