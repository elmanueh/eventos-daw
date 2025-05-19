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
import Loading from '@pages/Loading'
import { useId } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EspacioDetalle() {
  const espacioId = useLoaderData()
  const { espacios: otrosEspacios, loading: otrosLoading } = useEspacios(
    ESPACIOS_REDUCER.RANDOM_SIN_ESPACIO,
    4,
    espacioId
  )
  const { eventos, loading: eventosLoading } = useEventos(
    EVENTOS_REDUCER.BY_ESPACIO,
    espacioId
  )

  //const idGroupPuntosInteres = useId()
  const idGroupEventos = useId()

  if (otrosLoading || eventosLoading) return <Loading />

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
          <EspacioDetalleCard idEspacio={espacioId} />
          {/*<div className="mt-4">
                <GroupDetallesCards
                  objetos={espacio.puntosInteres}
                  tipo={GROUP_DETALLES_CARDS_TIPOS.PUNTOS_INTERES}
                  id={idGroupPuntosInteres}
                />
              </div>*/}
          <div className="mt-4">
            <GroupDetallesCards
              objetos={eventos}
              tipo={GROUP_DETALLES_CARDS_TIPOS.EVENTOS}
              id={idGroupEventos}
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
