import {
  ESPACIOS_REDUCER,
  EVENTOS_REDUCER,
  GROUP_DETALLES_CARDS_TIPOS,
  TARJETA_TIPOS
} from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import { useEventos } from '@/hooks/useEventos'
import { statusEspacio } from '@/utils/espacioHelper'
import {
  handleCambiarEstadoEspacio,
  handleCrearEvento,
  handleEditEspacio
} from '@/utils/operations'
import EspacioDetalleCard from '@components/cards/EspacioDetalleCard'
import GroupDetallesCards from '@components/GroupDetallesCards'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EspacioModal from '@components/modals/EspacioModal'
import EventoModal from '@components/modals/EventoModal'
import OthersCards from '@components/OthersCards'
import MyToast, { useToast } from '@components/toast/MyToast'
import Loading from '@pages/Loading'
import { useId, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function EspacioDetalle() {
  const espacioId = useLoaderData()
  const {
    espacios: espacio,
    loading,
    error
  } = useEspacios(ESPACIOS_REDUCER.BY_ID, espacioId)
  const { espacios: otrosEspacios, loading: otrosLoading } = useEspacios(
    ESPACIOS_REDUCER.RANDOM_SIN_ESPACIO,
    4,
    espacioId
  )
  const { eventos, loading: eventosLoading } = useEventos(
    EVENTOS_REDUCER.BY_ESPACIO,
    espacioId
  )

  const idGroupPuntosInteres = useId()
  const idGroupEventos = useId()

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showEventoModal, setShowEventoModal] = useState(false)
  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const { addToast, toasts, removeToast } = useToast()

  if (loading || otrosLoading || eventosLoading) return <Loading />

  const status = statusEspacio(espacio)

  return (
    <Container className="p-0">
      <MyToast toasts={toasts} removeToast={removeToast} />

      <EspacioModal
        show={showEspacioModal}
        callback={(modificados) =>
          handleEditEspacio(
            espacio.id,
            modificados,
            setShowEspacioModal,
            addToast
          )
        }
        onHide={() => setShowEspacioModal(false)}
        espacio={espacio}
      />
      <EventoModal
        show={showEventoModal}
        callback={(evento) =>
          handleCrearEvento(evento, setShowEventoModal, addToast)
        }
        onHide={() => setShowEventoModal(false)}
        espacioFisico={espacio}
      />
      <ConfirmationModal
        show={showConfirmation}
        callback={() =>
          handleCambiarEstadoEspacio(
            espacio,
            status,
            setShowConfirmation,
            addToast
          )
        }
        onHide={() => setShowConfirmation(false)}
        title={espacio.nombre}
        status={status}
        tipo={TARJETA_TIPOS.ESPACIOS}
      />
      <Row>
        <Col md={4} className="order-sm-2 order-md-1">
          <OthersCards
            otros={otrosEspacios}
            tipo={TARJETA_TIPOS.ESPACIOS}
          ></OthersCards>
        </Col>

        <Col md={8} className="order-sm-1 order-md-2">
          {error ? (
            <h2 className="text-center">Espacio Físico no encontrado</h2>
          ) : (
            <>
              <EspacioDetalleCard espacio={espacio} />
              <div className="mt-4">
                <GroupDetallesCards
                  objetos={espacio.puntosInteres}
                  tipo={GROUP_DETALLES_CARDS_TIPOS.PUNTOS_INTERES}
                  id={idGroupPuntosInteres}
                />
              </div>
              <div className="mt-4">
                <GroupDetallesCards
                  objetos={eventos}
                  tipo={GROUP_DETALLES_CARDS_TIPOS.EVENTOS}
                  id={idGroupEventos}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}
