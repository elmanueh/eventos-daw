import {
  EVENTOS_REDUCER,
  GROUP_DETALLES_CARDS_TIPOS,
  RESERVAS_REDUCER,
  TARJETA_TIPOS
} from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import { useReservas } from '@/hooks/useReservas'
import { esEventoMio, getEstadoEvento } from '@/utils/eventoHelper'
import { handleDesactivarEvento, handleEditEvento } from '@/utils/operations'
import EventoDetalleCard from '@components/cards/EventoDetalleCard'
import GroupDetallesCards from '@components/GroupDetallesCards'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EventoModal from '@components/modals/EventoModal'
import ReservaModal from '@components/modals/ReservaModal'
import OthersCards from '@components/OthersCards'
import MyToast, { useToast } from '@components/toast/MyToast'
import { AuthContext } from '@context/AuthContext'
import Loading from '@pages/Loading'
import { useContext, useId, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EventoDetalle() {
  const { user } = useContext(AuthContext)
  const eventoId = useLoaderData()
  const {
    eventos: evento,
    loading,
    error
  } = useEventos(EVENTOS_REDUCER.BY_ID, eventoId)
  const { eventos: otrosEventos, loading: otrosLoading } = useEventos(
    EVENTOS_REDUCER.RANDOM_SIN_EVENTO,
    4,
    eventoId
  )
  const {
    reservas,
    loading: loadingReservas,
    reservar
  } = useReservas(RESERVAS_REDUCER.BY_EVENTO, eventoId)
  const idGroupReservas = useId()

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showReservaModal, setShowReservaModal] = useState(false)
  const [showEventoModal, setShowEventoModal] = useState(false)
  const { addToast, toasts, removeToast } = useToast()

  if (loading || loadingReservas || otrosLoading) return <Loading />

  const esMio = esEventoMio(evento, user)

  const status = getEstadoEvento(evento)

  return (
    <Container className="p-0">
      <MyToast toasts={toasts} removeToast={removeToast} />

      <EventoModal
        show={showEventoModal}
        callback={(modificados) =>
          handleEditEvento(evento.id, modificados, setShowEventoModal, addToast)
        }
        onHide={() => setShowEventoModal(false)}
        evento={evento}
      />
      <ReservaModal
        show={showReservaModal}
        callback={(reserva) => reservar(reserva, setShowReservaModal, addToast)}
        onHide={() => setShowReservaModal(false)}
        evento={evento}
      />
      <ConfirmationModal
        show={showConfirmation}
        callback={() =>
          handleDesactivarEvento(evento.id, setShowConfirmation, addToast)
        }
        onHide={() => setShowConfirmation(false)}
        title={evento.nombre}
        status={status}
        tipo={TARJETA_TIPOS.EVENTOS}
      />

      <Row>
        <Col md={4} className="order-sm-2 order-md-1">
          <OthersCards
            otros={otrosEventos}
            tipo={TARJETA_TIPOS.EVENTOS}
          ></OthersCards>
        </Col>

        <Col md={8} className="order-sm-1 order-md-2">
          {error ? (
            <h2 className="text-center">Evento no encontrado</h2>
          ) : (
            <>
              <EventoDetalleCard evento={evento} />
              {esMio && (
                <div className="mt-4">
                  <GroupDetallesCards
                    objetos={reservas}
                    tipo={GROUP_DETALLES_CARDS_TIPOS.RESERVAS}
                    id={idGroupReservas}
                  />
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}
