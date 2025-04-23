import EspacioCard from '@components/cards/EspacioCard'
import EventoCard from '@components/cards/EventoCard'
import ReservaCard from '@components/cards/ReservaCard'
import Paginacion from '@components/Paginacion'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

export default function GroupCards({
  objetos,
  tipoTarjeta,
  visible,
  noPaginator
}) {
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 8
  const totalPages = Math.ceil(objetos.length / pageSize)

  const getCurrentPageEspacios = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return objetos.slice(startIndex, endIndex)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="d-flex flex-column gap-4">
      {getCurrentPageEspacios().length === 0 ? (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay {tipoTarjeta} disponibles.</p>
        </div>
      ) : (
        <>
          <Row className="g-4">
            {getCurrentPageEspacios().map((objeto) => (
              <Col key={objeto.id} sm={12} md={6} xl={4} xxl={3}>
                {(() => {
                  switch (tipoTarjeta) {
                    case 'espacios':
                      return <EspacioCard espacio={objeto} visible={visible} />
                    case 'eventos':
                      return <EventoCard evento={objeto} visible={visible} />
                    case 'reservas':
                      return <ReservaCard reserva={objeto} />
                    default:
                      return null
                  }
                })()}
              </Col>
            ))}
          </Row>

          {noPaginator ? (
            <div className="text-end">
              <a href={`/${tipoTarjeta}`} className="btn btn-outline-primary">
                Ver todos los {tipoTarjeta}
              </a>
            </div>
          ) : (
            <Paginacion
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </section>
  )
}
