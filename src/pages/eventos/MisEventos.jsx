import { EVENTOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import {
  obtenerEventosActivos,
  obtenerEventosCancelados,
  obtenerEventosEnCurso,
  obtenerEventosFinalizados
} from '@/utils/eventoHelper'
import FilterEventos from '@components/filters/FilterEventos'
import GroupCards from '@components/GroupCards'
import EventoModal from '@components/modals/EventoModal'
import MyToast, { useToast } from '@components/toast/MyToast'
import Loading from '@pages/Loading'
import { useCallback, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

export default function MisEventos() {
  const { eventos, loading, updateEventoStatus, addEvento } = useEventos(
    EVENTOS_REDUCER.BY_GESTOR
  )
  const [eventosFiltrados, setEventosFiltrados] = useState(eventos)
  const [showEventoModal, setShowEventoModal] = useState(false)
  const { addToast, toasts, removeToast } = useToast()

  useEffect(() => {
    setEventosFiltrados(eventos)
  }, [eventos])

  const handleFiltroChange = useCallback((eventosFiltrados) => {
    setEventosFiltrados(eventosFiltrados)
  }, [])

  const handleAddEvento = (evento) => {
    try {
      addEvento(evento)
      setShowEventoModal(false)
      addToast('Evento creado', 'Tu evento se ha creado con éxito.', 'success')
    } catch {
      addToast('Error al crear evento')
    }
  }

  const eventosEnCurso = obtenerEventosEnCurso(eventosFiltrados)
  const eventosFinalizados = obtenerEventosFinalizados(eventosFiltrados)
  const eventosActivos = obtenerEventosActivos(eventosFiltrados)
  const eventosCancelados = obtenerEventosCancelados(eventosFiltrados)

  if (loading) return <Loading />

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <MyToast toasts={toasts} removeToast={removeToast} />
      <EventoModal
        show={showEventoModal}
        onHide={() => setShowEventoModal(false)}
        callback={handleAddEvento}
      />

      <h1 className="text-center">Mis Eventos</h1>

      <Button className="ms-auto" onClick={() => setShowEventoModal(true)}>
        Crear Evento
      </Button>

      <FilterEventos eventos={eventos} callback={handleFiltroChange} />

      {eventosEnCurso.length > 0 && (
        <>
          <h3>En curso</h3>
          <GroupCards
            items={eventosEnCurso}
            type={TARJETA_TIPOS.EVENTOS}
            paginator
            actions
          />
        </>
      )}

      {eventosActivos.length > 0 && (
        <>
          <h3>Próximos</h3>
          <GroupCards
            items={eventosActivos}
            type={TARJETA_TIPOS.EVENTOS}
            paginator
            actions
          />
        </>
      )}

      {eventosFinalizados.length > 0 && (
        <>
          <h3>Finalizados</h3>
          <GroupCards
            items={eventosFinalizados}
            type={TARJETA_TIPOS.EVENTOS}
            paginator
            actions
          />
        </>
      )}

      {eventosCancelados.length > 0 && (
        <>
          <h3>Cancelados</h3>
          <GroupCards
            items={eventosCancelados}
            type={TARJETA_TIPOS.EVENTOS}
            paginator
            actions
          />
        </>
      )}
    </Container>
  )
}
