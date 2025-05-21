import {
  EVENTOS_REDUCER,
  GROUP_DETALLES_CARDS_TIPOS,
  RESERVAS_REDUCER,
  TARJETA_TIPOS
} from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import { useReservas } from '@/hooks/useReservas'
import EventoDetalleCard from '@components/cards/EventoDetalleCard'
import GroupDetallesCards from '@components/GroupDetallesCards'
import OthersCards from '@components/OthersCards'
import { EventoActionContext } from '@context/EventoActionContext'
import { ReservaActionContext } from '@context/ReservaActionContext'
import Loading from '@pages/Loading'
import { useCallback, useState } from 'react'
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

  const [esEventoMio, setEsEventoMio] = useState(false)
  const onEsEventoMio = useCallback((esMio) => {
    setEsEventoMio(esMio)
  }, [])

  if (otrosLoading || loadingReservas) return <Loading />

  const handleAddReserva = async (reserva) => {
    await addReserva(reserva)
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
            <EventoActionContext.Provider
              value={{
                onEsEventoMio: onEsEventoMio
              }}
            >
              <EventoDetalleCard idEvento={eventoId} />
            </EventoActionContext.Provider>
          </ReservaActionContext.Provider>

          {esEventoMio && (
            <div className="mt-4">
              <GroupDetallesCards
                items={reservas}
                type={GROUP_DETALLES_CARDS_TIPOS.RESERVAS}
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}
