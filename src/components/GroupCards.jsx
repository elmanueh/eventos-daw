import { GROUP_CARDS_SIZE, TARJETA_TIPOS } from '@/configs/constant'
import EspacioCard from '@components/cards/EspacioCard'
import EventoCard from '@components/cards/EventoCard'
import ReservaCard from '@components/cards/ReservaCard'
import Pagination from '@components/pagination/Pagination'
import { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

export default function GroupCards({ items, type, paginator, actions }) {
  const [itemsShowed, setItemsShowed] = useState([])
  const pageSize = GROUP_CARDS_SIZE

  const handlePaginatorChange = useCallback(
    (page) => {
      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      setItemsShowed(items.slice(startIndex, endIndex))
    },
    [items, pageSize]
  )

  useEffect(() => {
    if (items?.length > 0) {
      handlePaginatorChange(1)
    }
  }, [items, pageSize, handlePaginatorChange])

  return (
    <section className="d-flex flex-column gap-4 w-100">
      {itemsShowed.length === 0 ? (
        <div style={{ marginBottom: '100px' }}>
          <p>No hay {type} disponibles para mostrar.</p>
        </div>
      ) : (
        <>
          <Row className="g-4">
            {itemsShowed.map((objeto) => {
              switch (type) {
                case TARJETA_TIPOS.RESERVAS:
                  return (
                    <Col key={objeto.id} xl={12} xxl={6}>
                      <ReservaCard reserva={objeto} />
                    </Col>
                  )
                case TARJETA_TIPOS.ESPACIOS:
                  return (
                    <Col key={objeto.id} sm={12} md={6} xl={6} xxl={4}>
                      <EspacioCard espacio={objeto} actions={actions} />
                    </Col>
                  )
                case TARJETA_TIPOS.EVENTOS:
                  return (
                    <Col key={objeto.id} sm={12} md={6} xl={6} xxl={4}>
                      <EventoCard evento={objeto} actions={actions} />
                    </Col>
                  )
              }
            })}
          </Row>

          {paginator && (
            <Pagination
              numItems={items.length}
              pageSize={pageSize}
              callback={handlePaginatorChange}
            />
          )}
        </>
      )}
    </section>
  )
}
