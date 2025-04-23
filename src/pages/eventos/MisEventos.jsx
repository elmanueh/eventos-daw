import { tipoTarjeta } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEventos() {
  const initialEventos = useLoaderData()._embedded.eventoResumenList
  const [eventos, setEventos] = useState(initialEventos)

  const eventosActivos = eventos.filter((e) => !e.cancelado)
  const eventosCancelados = eventos.filter((e) => e.cancelado)

  const handleActualizarEventos = (eventoActualizado) => {
    setEventos((prevEventos) =>
      prevEventos.map((evento) =>
        evento.id === eventoActualizado.id ? eventoActualizado : evento
      )
    )
  }

  const handleCrearEvento = () => {
    // Implementar la lógica para crear un nuevo evento
  }

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Eventos</h1>

      <Button variant="primary" className="ms-auto" onClick={handleCrearEvento}>
        Crear Evento
      </Button>

      <h3>Activos</h3>
      <GroupCards
        objetos={eventosActivos}
        tipoTarjeta={tipoTarjeta.EVENTOS}
        visible={true}
        onActualizar={handleActualizarEventos}
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
