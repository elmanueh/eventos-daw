import { estado, routes, tipoTarjeta, urls } from '@/configs/constant'
import { fetchGet } from '@/utils/fetchGet'
import { handleDesactivarEvento, handleEditEvento } from '@/utils/operations'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import OthersCards from '@components/OthersCards'
import { AuthContext } from '@context/AuthContext'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useContext, useEffect, useState } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

const EventoDetalle = () => {
  const { user } = useContext(AuthContext)
  const evento = useLoaderData()[0]

  const [showConfirmation, setShowConfirmation] = useState(false)
  const status = evento.cancelado ? estado.CERRADO : estado.ACTIVO

  const otrosEventos = useLoaderData()[1]
    ._embedded.eventoResumenList.filter((e) => e.id !== evento.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  const [espacio, setEspacio] = useState(null)

  useEffect(() => {
    if (!evento.espacioFisico) return

    async function fetchEspacio() {
      try {
        const data = await fetchGet(urls.ESPACIOS_DET(evento.espacioFisico))

        setEspacio(data)
      } catch (error) {
        console.error('Error al cargar los espacios filtrados:', error)
        alert('Error al cargar los espacios filtrados.')
      }
    }

    fetchEspacio()
  }, [evento.espacioFisico])

  const handleNavigate = () => {
    window.location.href = routes.ESPACIOS(espacio.id)
  }

  return (
    <Container className="py-5">
      <ConfirmationModal
        show={showConfirmation}
        callback={() =>
          handleDesactivarEvento(evento.idEvento, setShowConfirmation)
        }
        onHide={() => setShowConfirmation(false)}
        title={evento.nombre}
        status={status}
        tipo={tipoTarjeta.EVENTOS}
      />
      <Row>
        <Col md={4}>
          <OthersCards
            otros={otrosEventos}
            tipo={tipoTarjeta.EVENTOS}
          ></OthersCards>
        </Col>

        <Col md={8}>
          {!evento ? (
            <h2 className="text-center">Evento no encontrado</h2>
          ) : (
            <Card className="mb-4 bg-secondary bg-opacity-25 border border-primary">
              <Card.Body className="d-flex flex-column gap-2">
                <Row className="align-items-center">
                  <Col className="d-flex justify-content-between align-items-center">
                    <Card.Title as="h1" className="mb-0">
                      {evento.nombre}
                    </Card.Title>
                    <Badge
                      bg={evento.cancelado ? 'danger' : 'success'}
                      text={evento.cancelado ? 'danger' : 'success'}
                      className="fs-6 bg-opacity-25 px-3 py-2 rounded-pill"
                    >
                      {status}
                    </Badge>
                  </Col>
                </Row>

                <Card.Subtitle className="mb-3 text-muted fs-5">
                  {evento.organizador}
                </Card.Subtitle>

                <Card.Text className="fs-6">{evento.descripcion}</Card.Text>

                <div className="fs-6 text-muted d-flex flex-column gap-3">
                  {!evento.cancelado && (
                    <>
                      <div>
                        <i className="bi bi-calendar-event-fill me-2 text-primary"></i>
                        <span>
                          <strong>Inicio:</strong>{' '}
                          {format(
                            new Date(evento.fechaInicio),
                            "dd'/'MM'/'yyyy 'a las' HH:mm",
                            { locale: es }
                          )}
                        </span>
                      </div>
                      <div>
                        <i className="bi bi-calendar-event-fill me-2 text-primary"></i>
                        <span>
                          <strong>Finalización:</strong>{' '}
                          {format(
                            new Date(evento.fechaFin),
                            "dd'/'MM'/'yyyy 'a las' HH:mm",
                            { locale: es }
                          )}
                        </span>
                      </div>
                      <div>
                        <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                        <span>
                          <strong>Espacio:</strong>{' '}
                          {espacio ? (
                            <a
                              onClick={handleNavigate}
                              style={{ cursor: 'pointer' }}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              {espacio.nombre}
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </span>
                      </div>
                    </>
                  )}

                  <div>
                    <i className="bi bi-person-fill me-2 text-primary"></i>
                    <span>
                      <strong>Plazas:</strong> {evento.numPlazas} personas
                    </span>
                  </div>
                  <div>
                    <i className="bi bi-tags-fill me-2 text-primary"></i>
                    <span>
                      <strong>Categoría:</strong>{' '}
                      <span className="badge bg-primary bg-opacity-25 text-primary rounded-pill px-2 py-1">
                        {evento.categoria}
                      </span>
                    </span>
                  </div>
                </div>

                {evento.organizador == user.username && (
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => handleEditEvento}
                    >
                      Editar
                    </button>
                    {!evento.cancelado && (
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => setShowConfirmation(true)}
                      >
                        Desactivar
                      </button>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default EventoDetalle
