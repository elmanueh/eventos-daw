import {
  ESPACIOS_REDUCER,
  EVENTOS_REDUCER,
  GROUP_DETALLES_CARDS_TIPOS,
  TARJETA_TIPOS
} from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import { useEventos } from '@/hooks/useEventos'
import EspacioDetalleCard from '@components/cards/EspacioDetalleCard'
import GroupDetallesCards from '@components/GroupDetallesCards'
import OthersCards from '@components/OthersCards'
import { EspacioActionContext } from '@context/EspacioActionContext'
import { EventoActionContext } from '@context/EventoActionContext'
import Loading from '@pages/Loading'
import { useCallback, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EspacioDetalle() {
  const espacioId = useLoaderData()
  const { espacios: otrosEspacios, loading: otrosLoading } = useEspacios(
    ESPACIOS_REDUCER.RANDOM_SIN_ESPACIO,
    4,
    espacioId
  )
  const {
    eventos,
    loading: eventosLoading,
    addEvento
  } = useEventos(EVENTOS_REDUCER.BY_ESPACIO, espacioId)
  const [puntosInteres, setPuntosInteres] = useState([])

  const onPuntosInteres = useCallback((nuevosPuntos) => {
    setPuntosInteres(nuevosPuntos)
  }, [])

  if (otrosLoading || eventosLoading) return <Loading />

  const handleAddEvento = async (evento) => {
    await addEvento(evento)
  }

  return (
    <Container className="p-0">
      <Row>
        <Col md={4} className="order-sm-2 order-md-1">
          <OthersCards
            otros={otrosEspacios}
            tipo={TARJETA_TIPOS.ESPACIOS}
          ></OthersCards>
        </Col>

        <Col md={8} className="order-sm-1 order-md-2">
          <EventoActionContext.Provider
            value={{
              onAdd: handleAddEvento
            }}
          >
            <EspacioActionContext.Provider
              value={{
                onPuntosInteres: onPuntosInteres
              }}
            >
              <EspacioDetalleCard idEspacio={espacioId} />
            </EspacioActionContext.Provider>
          </EventoActionContext.Provider>
          {puntosInteres.length > 0 && (
            <div className="mt-4">
              <GroupDetallesCards
                items={puntosInteres}
                type={GROUP_DETALLES_CARDS_TIPOS.PUNTOS_INTERES}
              />
            </div>
          )}
          {eventos.length > 0 && (
            <div className="mt-4">
              <GroupDetallesCards
                items={eventos}
                type={GROUP_DETALLES_CARDS_TIPOS.EVENTOS}
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}
