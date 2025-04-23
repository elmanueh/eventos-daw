import EspacioCard from '@components/cards/EspacioCard'
import Paginacion from '@components/Paginacion'
import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEspacios() {
  const espacios = useLoaderData().espacio.map((espacio) => espacio.espacioDTO)

  const [currentPageActivos, setCurrentPageActivos] = useState(1)
  const [currentPageCerrados, setCurrentPageCerrados] = useState(1)
  const [pageSize] = useState(8)

  const espaciosActivos = espacios.filter(
    (espacio) => espacio.estado === 'ACTIVO'
  )
  const espaciosCerrados = espacios.filter(
    (espacio) => espacio.estado === 'CERRADO_TEMPORALMENTE'
  )

  const totalPagesActivos = Math.ceil(espaciosActivos.length / pageSize)
  const totalPagesCerrados = Math.ceil(espaciosCerrados.length / pageSize)

  const getPaginatedActivos = () => {
    const start = (currentPageActivos - 1) * pageSize
    return espaciosActivos.slice(start, start + pageSize)
  }

  const getPaginatedCerrados = () => {
    const start = (currentPageCerrados - 1) * pageSize
    return espaciosCerrados.slice(start, start + pageSize)
  }

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Espacios</h1>

      <Button variant="primary" className="ms-auto">
        Crear Espacio
      </Button>

      <h3>Activos</h3>
      {getPaginatedActivos().length > 0 ? (
        <>
          <Row>
            {getPaginatedActivos().map((espacio) => (
              <Col
                key={espacio.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                className="mb-4"
              >
                <div>
                  <EspacioCard espacio={espacio} />
                  <Button variant="warning" className="mt-2">
                    Editar
                  </Button>
                  <Button variant="danger" className="mt-2 ms-2">
                    Cerrar Temporalmente
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          <Paginacion
            currentPage={currentPageActivos}
            totalPages={totalPagesActivos}
            onPageChange={(page) => setCurrentPageActivos(page)}
          />
        </>
      ) : (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay espacios activos.</p>
        </div>
      )}

      <h3>Cerrados Temporalmente</h3>
      {getPaginatedCerrados().length > 0 ? (
        <>
          <Row>
            {getPaginatedCerrados().map((espacio) => (
              <Col
                key={espacio.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                className="mb-4"
              >
                <div>
                  <EspacioCard espacio={espacio} />
                  <Button variant="warning" className="mt-2">
                    Editar
                  </Button>
                  <Button variant="success" className="mt-2 ms-2">
                    Activar
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          <Paginacion
            currentPage={currentPageCerrados}
            totalPages={totalPagesCerrados}
            onPageChange={(page) => setCurrentPageCerrados(page)}
          />
        </>
      ) : (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay espacios cerrados temporalmente.</p>
        </div>
      )}
    </Container>
  )
}
