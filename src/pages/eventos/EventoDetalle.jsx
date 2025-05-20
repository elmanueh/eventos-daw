import {
  EVENTOS_REDUCER,
  RESERVAS_REDUCER,
  TARJETA_TIPOS
} from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import { useReservas } from '@/hooks/useReservas'
import EventoDetalleCard from '@components/cards/EventoDetalleCard'
import OthersCards from '@components/OthersCards'
import { ReservaActionContext } from '@context/ReservaActionContext'
import Loading from '@pages/Loading'
import { Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EventoDetalle() {
  const eventoId = useLoaderData()
  const { eventos: otrosEventos, loading: otrosLoading } = useEventos(
    EVENTOS_REDUCER.RANDOM_SIN_EVENTO,
    4,
    eventoId
  )
  const {
    reservas,
    loading: loadingReservas,
    addReserva
  } = useReservas(RESERVAS_REDUCER.BY_EVENTO, eventoId)

  if (otrosLoading || loadingReservas) return <Loading />

  const handleAddReserva = (reserva) => {
    addReserva(reserva)
  }

  return (
    <Container className="p-0">
      <Row>
        <Col md={4} className="order-sm-2 order-md-1">
          <OthersCards
            otros={otrosEventos}
            tipo={TARJETA_TIPOS.EVENTOS}
          ></OthersCards>
        </Col>

        <Col md={8} className="order-sm-1 order-md-2">
          <ReservaActionContext.Provider
            value={{
              onAdd: handleAddReserva
            }}
          >
            <EventoDetalleCard idEvento={eventoId} />
          </ReservaActionContext.Provider>

          {/*{esEventoMio && (
            <div className="mt-4">
              <GroupDetallesCards
                items={reservas}
                type={GROUP_DETALLES_CARDS_TIPOS.RESERVAS}
              />
            </div>
          )}*/}
        </Col>
      </Row>
    </Container>
  )
}
