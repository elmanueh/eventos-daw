import { AUTH_ROLES, ESTADOS } from '@/configs/constant'
import { decimalToDMS, isMio, statusEspacio } from '@/utils/espacioHelper'
import { AuthContext } from '@context/AuthContext'
import { useContext } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'

export default function EspacioDetalleCard({ espacio }) {
  const { user } = useContext(AuthContext)

  const status = statusEspacio(espacio)
  const isUser = user.roles.includes(AUTH_ROLES.GESTOR_EVENTOS)
  const esMio = isMio(espacio, user)

  return (
    <Card className="bg-secondary bg-opacity-25 border border-primary">
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
                  //onClick={() => setShowEspacioModal(true)}
                >
                  Editar
                </button>
                {status === ESTADOS.ACTIVO ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      //setShowConfirmation(true)
                    }}
                  >
                    Desactivar
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => {
                      //setShowConfirmation(true)
                    }}
                  >
                    Activar
                  </button>
                )}
              </>
            )}
            {isUser && status === ESTADOS.ACTIVO && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                //onClick={() => setShowEventoModal(true)}
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
