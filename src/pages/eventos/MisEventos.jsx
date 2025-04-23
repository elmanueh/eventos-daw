import { tipoTarjeta } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { Button, Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEventos() {
  const eventos = useLoaderData()._embedded.eventoResumenList

  const eventosActivos = eventos.filter((e) => !e.cancelado)
  const eventosCancelados = eventos.filter((e) => e.cancelado)

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Eventos</h1>

      <Button variant="primary" className="ms-auto">
        Crear Evento
      </Button>

      <h3>Activos</h3>
      <GroupCards
        objetos={eventosActivos}
        tipoTarjeta={tipoTarjeta.EVENTOS}
        visible={true}
      ></GroupCards>

      <h3>Cancelados</h3>
      <GroupCards
        objetos={eventosCancelados}
        tipoTarjeta={tipoTarjeta.EVENTOS}
        visible={true}
      ></GroupCards>
    </Container>
  )
}
