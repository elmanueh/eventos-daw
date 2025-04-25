import { TARJETA_TIPOS } from '@/configs/constant'
import { handleCrearEvento } from '@/utils/operations'
import GroupCards from '@components/GroupCards'
import EventoModal from '@components/modals/EventoModal'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEventos() {
  const initialEventos = useLoaderData()._embedded.eventoResumenList
  const [eventos, setEventos] = useState(initialEventos)

  const eventosActivos = eventos.filter((e) => !e.cancelado)
  const eventosCancelados = eventos.filter((e) => e.cancelado)

  const [showEventoModal, setShowEventoModal] = useState(false)

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <EventoModal
        show={showEventoModal}
        callback={(evento) => handleCrearEvento(evento, setShowEventoModal)}
        onHide={() => setShowEventoModal(false)}
      />
      <h1 className="text-center">Mis Eventos</h1>

      <Button
        variant="primary"
        className="ms-auto"
        onClick={() => setShowEventoModal(true)}
      >
        Crear Evento
      </Button>

      <h3 id="titulo1-groupCards">Activos</h3>
      <GroupCards
        objetos={eventosActivos}
        tipo={TARJETA_TIPOS.EVENTOS}
        visible={true}
        id={'titulo1-groupCards'}
      ></GroupCards>

      <h3 id="titulo2-groupCards">Cancelados</h3>
      <GroupCards
        objetos={eventosCancelados}
        tipo={TARJETA_TIPOS.EVENTOS}
        visible={true}
        id={'titulo2-groupCards'}
      ></GroupCards>
    </Container>
  )
}
