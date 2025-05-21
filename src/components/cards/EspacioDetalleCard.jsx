import {
  AUTH_ROLES,
  ESPACIOS_REDUCER,
  ESTADOS,
  TARJETA_TIPOS
} from '@/configs/constant'
import { TOAST_MESSAGES } from '@/configs/notifications'
import { useEspacios } from '@/hooks/useEspacios'
import { useToast } from '@/hooks/useToast'
import { decimalToDMS, isMio, statusEspacio } from '@/utils/espacioHelper'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EspacioModal from '@components/modals/EspacioModal'
import EventoModal from '@components/modals/EventoModal'
import MyToast from '@components/toast/MyToast'
import { AuthContext } from '@context/AuthContext'
import { useEspacioActions } from '@context/EspacioActionContext'
import { useEventoActions } from '@context/EventoActionContext'
import Loading from '@pages/Loading'
import { useContext, useEffect, useState } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'

export default function EspacioDetalleCard({ idEspacio }) {
  const { user } = useContext(AuthContext)
  const { toasts, hideToast, showToast } = useToast()
  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showEventoModal, setShowEventoModal] = useState(false)
  const { espacios, updateEspacio, updateEspacioStatus, loading } = useEspacios(
    ESPACIOS_REDUCER.BY_ID,
    idEspacio
  )
  const { onAdd } = useEventoActions()
  const { onPuntosInteres } = useEspacioActions()

  const espacio = espacios[0]

  useEffect(() => {
    if (espacio?.puntosInteres) {
      onPuntosInteres(espacio.puntosInteres)
    }
  }, [espacio?.puntosInteres])

  if (loading) return <Loading />
  const status = statusEspacio(espacio)
  const isUser = user.roles.includes(AUTH_ROLES.GESTOR_EVENTOS)
  const esMio = isMio(espacio, user)

  const handleEditEspacio = async (espacioData) => {
    try {
      await updateEspacio(idEspacio, espacioData)
      setShowEspacioModal(false)
      showToast(TOAST_MESSAGES.SPACE.UPDATED)
    } catch {
      showToast(TOAST_MESSAGES.SPACE.UPDATED_ERROR)
    }
  }

  const handleConfirmation = async () => {
    try {
      await updateEspacioStatus(
        idEspacio,
        status === ESTADOS.ACTIVO
          ? ESTADOS.CERRADO_TEMPORALMENTE
          : ESTADOS.ACTIVO
      )
      setShowConfirmationModal(false)
      showToast(TOAST_MESSAGES.SPACE.STATUS_UPDATED)
    } catch {
      showToast(TOAST_MESSAGES.SPACE.STATUS_UPDATED_ERROR)
    }
  }

  const handleAddEvento = async (eventoData) => {
    try {
      onAdd(eventoData)
      setShowEventoModal(false)
      showToast(TOAST_MESSAGES.EVENT.CREATED)
    } catch {
      showToast(TOAST_MESSAGES.EVENT.CREATED_ERROR)
    }
  }

  return (
    <Card className="bg-secondary bg-opacity-25 border border-primary">
      <MyToast toasts={toasts} hideToast={hideToast} />
      <EspacioModal
        show={showEspacioModal}
        onHide={() => setShowEspacioModal(false)}
        callback={handleEditEspacio}
        espacio={espacio}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        callback={handleConfirmation}
        title={espacio.nombre}
        status={status}
        tipo={TARJETA_TIPOS.ESPACIOS}
      />
      <EventoModal
        show={showEventoModal}
        onHide={() => setShowEventoModal(false)}
        callback={handleAddEvento}
        espacio={espacio}
      />

      <Card.Body className="d-flex flex-column gap-2">
        <Row className="align-items-center">
          <Col className="d-flex justify-content-between align-items-center">
            <Card.Title as="h1" className="mb-0">
              {espacio.nombre}
            </Card.Title>
            <Badge
              bg={status === 'ACTIVO' ? 'success' : 'danger'}
              text={status === 'ACTIVO' ? 'success' : 'danger'}
              className="fs-6 fw-medium bg-opacity-25 px-3 py-2 rounded-pill"
            >
              {status}
            </Badge>
          </Col>
        </Row>

        <Card.Subtitle className="mb-3 text-muted fs-5">
          {espacio.propietario}
        </Card.Subtitle>

        <Card.Text className="fs-6">{espacio.descripcion}</Card.Text>

        <div className="fs-6 text-muted d-flex flex-column gap-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
            <span>
              <strong>Ubicación:</strong> {espacio.direccion}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-people-fill me-2 text-primary"></i>
            <span>
              <strong>Capacidad:</strong> {espacio.capacidad} personas
            </span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-map me-2 text-primary"></i>
            <span>
              <strong>Coordenadas:</strong>{' '}
              <a
                href={`https://www.google.com/maps?q=${espacio.latitud},${espacio.longitud}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                {decimalToDMS(espacio.latitud)}{' '}
                {decimalToDMS(espacio.longitud, true)}
              </a>
            </span>
          </div>
        </div>

        {(esMio || isUser) && (
          <div className="d-flex justify-content-end gap-2">
            {esMio && (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setShowEspacioModal(true)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className={`btn ${
                    status === ESTADOS.ACTIVO
                      ? 'btn-outline-danger'
                      : 'btn-outline-success'
                  } `}
                  onClick={() => {
                    setShowConfirmationModal(true)
                  }}
                >
                  {status === ESTADOS.ACTIVO ? 'Desactivar' : 'Activar'}
                </button>
              </>
            )}
            {isUser && status === ESTADOS.ACTIVO && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowEventoModal(true)}
              >
                Crear evento
              </button>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
