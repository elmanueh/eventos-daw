import { EVENTOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { TOAST_MESSAGES } from '@/configs/notifications'
import { useEventos } from '@/hooks/useEventos'
import { useToast } from '@/hooks/useToast'
import {
  obtenerEventosActivos,
  obtenerEventosCancelados,
  obtenerEventosEnCurso,
  obtenerEventosFinalizados
} from '@/utils/eventoHelper'
import FilterEventos from '@components/filters/FilterEventos'
import GroupCards from '@components/groups/GroupCards'
import Loading from '@components/Loading'
import EventoModal from '@components/modals/EventoModal'
import MyToast from '@components/MyToast'
import { EventoActionContext } from '@context/EventoActionContext'
import { useCallback, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

export default function MisEventos() {
  const { eventos, loading, updateEvento, updateEventoStatus, addEvento } =
    useEventos(EVENTOS_REDUCER.BY_GESTOR)
  const [eventosFiltrados, setEventosFiltrados] = useState(eventos)
  const [showEventoModal, setShowEventoModal] = useState(false)
  const { toasts, showToast, hideToast } = useToast()

  const handleFiltroChange = useCallback((eventosFiltrados) => {
    setEventosFiltrados(eventosFiltrados)
  }, [])

  const handleAddEvento = async (evento) => {
    try {
      await addEvento(evento)
      setShowEventoModal(false)
      showToast(TOAST_MESSAGES.EVENT.CREATED)
    } catch {
      setShowEventoModal(false)
      showToast(TOAST_MESSAGES.EVENT.CREATED_ERROR)
    }
  }

  const handleUpdateEvento = async (id, evento) => {
    try {
      await updateEvento(id, evento)
      showToast(TOAST_MESSAGES.EVENT.UPDATED)
    } catch {
      showToast(TOAST_MESSAGES.EVENT.UPDATED_ERROR)
    }
  }

  const handleUpdateEventoEstado = async (id) => {
    try {
      await updateEventoStatus(id)
      showToast(TOAST_MESSAGES.EVENT.STATUS_UPDATED)
    } catch {
      showToast(TOAST_MESSAGES.EVENT.STATUS_ERROR)
    }
  }

  const eventosEnCurso = obtenerEventosEnCurso(eventosFiltrados)
  const eventosFinalizados = obtenerEventosFinalizados(eventosFiltrados)
  const eventosActivos = obtenerEventosActivos(eventosFiltrados)
  const eventosCancelados = obtenerEventosCancelados(eventosFiltrados)

  if (loading) return <Loading />

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <MyToast toasts={toasts} hideToast={hideToast} />
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

      <EventoActionContext.Provider
        value={{
          onUpdate: handleUpdateEvento,
          onUpdateState: handleUpdateEventoEstado
        }}
      >
        {eventosFiltrados.length === 0 && (
          <div className="d-flex flex-column gap-4 w-100">
            <p>No hay evento disponibles para mostrar.</p>
          </div>
        )}

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
      </EventoActionContext.Provider>
    </Container>
  )
}
