import { TARJETA_TIPOS } from '@/configs/constant'
import EspacioCard from '@components/cards/EspacioCard'
import EventoCard from '@components/cards/EventoCard'
import ReservaCard from '@components/cards/ReservaCard'
import { Pagination } from '@components/pagination/Pagination'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

export default function GroupCards({ objetos, tipo, visible, noPaginator }) {
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
          <p>No hay {tipo} disponibles.</p>
        </div>
      ) : (
        <>
          {tipo === TARJETA_TIPOS.RESERVAS ? (
            <div className="d-flex flex-column gap-4">
              {getCurrentPageEspacios().map((objeto) => {
                return <ReservaCard key={objeto.id} reserva={objeto} />
              })}
            </div>
          ) : (
            <Row className="g-4">
              {getCurrentPageEspacios().map((objeto) => (
                <Col key={objeto.id} sm={12} md={6} xl={4} xxl={3}>
                  {(() => {
                    switch (tipo) {
                      case TARJETA_TIPOS.ESPACIOS:
                        return (
                          <EspacioCard espacio={objeto} visible={visible} />
                        )
                      case TARJETA_TIPOS.EVENTOS:
                        return <EventoCard evento={objeto} visible={visible} />
                    }
                  })()}
                </Col>
              ))}
            </Row>
          )}

          {noPaginator ? (
            <div className="text-end">
              <a href={`/${tipo}`} className="btn btn-outline-primary">
                Ver todos los {tipo}
              </a>
            </div>
          ) : (
            <Pagination
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
