import EspacioCard from '@components/cards/EspacioCard'
import Paginacion from '@components/Paginacion'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function Espacios() {
  const espacios = useLoaderData().espacio
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8
  const totalPages = Math.ceil(espacios.length / pageSize)

  const getCurrentPageEspacios = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return espacios.slice(startIndex, endIndex)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <Container className="py-4">
      <h1 className="mb-5 text-center">Espacios Físicos</h1>

      {getCurrentPageEspacios().length === 0 ? (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay espacios disponibles.</p>
        </div>
      ) : (
        <>
          <Row className="g-4">
            {getCurrentPageEspacios().map((espacio) => (
              <Col
                key={espacio.espacioDTO.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
              >
                <EspacioCard espacio={espacio.espacioDTO} />
              </Col>
            ))}
          </Row>

          <Paginacion
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  )
}
