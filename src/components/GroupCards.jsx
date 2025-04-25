import { TARJETA_TIPOS } from '@/configs/constant'
import EspacioCard from '@components/cards/EspacioCard'
import EventoCard from '@components/cards/EventoCard'
import ReservaCard from '@components/cards/ReservaCard'
import { Pagination } from '@components/pagination/Pagination'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

export default function GroupCards({ objetos, tipo, visible, noPaginator }) {
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 6
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
          <Row className="g-4">
            {getCurrentPageEspacios().map((objeto) => {
              switch (tipo) {
                case TARJETA_TIPOS.RESERVAS:
                  return (
                    <Col key={objeto.id} xl={12} xxl={6}>
                      <ReservaCard reserva={objeto} />
                    </Col>
                  )
                case TARJETA_TIPOS.ESPACIOS:
                  return (
                    <Col key={objeto.id} sm={12} md={6} xl={6} xxl={4}>
                      <EspacioCard espacio={objeto} visible={visible} />
                    </Col>
                  )
                case TARJETA_TIPOS.EVENTOS:
                  return (
                    <Col key={objeto.id} sm={12} md={6} xl={6} xxl={4}>
                      <EventoCard evento={objeto} visible={visible} />
                    </Col>
                  )
              }
            })}
          </Row>

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
