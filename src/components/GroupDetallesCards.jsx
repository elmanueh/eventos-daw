import {
  GROUP_DETALLES_CARDS_SIZE,
  GROUP_DETALLES_CARDS_TIPOS
} from '@/configs/constant'
import EventoCard from '@components/cards/EventoCard'
import Pagination from '@components/pagination/Pagination'
import { useCallback, useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

export default function GroupDetallesCards({ items, type }) {
  const [itemsShowed, setItemsShowed] = useState([])
  const pageSize = GROUP_DETALLES_CARDS_SIZE
  const title =
    type === GROUP_DETALLES_CARDS_TIPOS.EVENTOS
      ? 'Próximos eventos'
      : type === GROUP_DETALLES_CARDS_TIPOS.RESERVAS
      ? 'Reservas realizadas'
      : type === GROUP_DETALLES_CARDS_TIPOS.PUNTOS_INTERES
      ? 'Puntos de interés cercanos'
      : ''

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
    <>
      <Card className="mb-4 border border-primary">
        <Card.Header
          as="h3"
          className="bg-secondary bg-opacity-25 text-primary"
        >
          {title}
        </Card.Header>
        <ListGroup variant="flush">
          {type === GROUP_DETALLES_CARDS_TIPOS.EVENTOS &&
            itemsShowed.map((objeto, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className="border-top border-primary py-3"
                >
                  <EventoCard evento={objeto} />
                </ListGroup.Item>
              )
            })}
          {type === GROUP_DETALLES_CARDS_TIPOS.RESERVAS &&
            itemsShowed.map((objeto, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className="border-top border-primary d-flex justify-content-between align-items-center py-3"
                >
                  <div className="d-flex flex-column">
                    <span className="fw-bold">Reserva #{index + 1}</span>
                    <span className="text-muted">
                      Usuario: {objeto.idUsuario}
                    </span>
                  </div>
                  <span className="badge bg-primary bg-opacity-25 text-primary rounded-pill px-3 py-2">
                    {objeto.plazasReservadas} plazas
                  </span>
                </ListGroup.Item>
              )
            })}
          {type === GROUP_DETALLES_CARDS_TIPOS.PUNTOS_INTERES &&
            itemsShowed.map((objeto, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className="border-top border-primary py-3"
                >
                  <div>
                    <div className="d-flex align-items-center gap-3">
                      <h4 className="mb-0">
                        <a
                          href={objeto.url}
                          target="_blank"
                          className="text-decoration-none text-light"
                        >
                          {objeto.nombre}
                        </a>
                      </h4>
                      <span className="badge bg-primary bg-opacity-25 text-primary rounded-pill px-2 py-1">
                        {objeto.distancia} m
                      </span>
                    </div>
                    <p className="text-muted mt-1 m-0">{objeto.descripcion}</p>
                  </div>
                </ListGroup.Item>
              )
            })}
        </ListGroup>
      </Card>

      <Pagination
        numItems={items.length}
        pageSize={pageSize}
        callback={handlePaginatorChange}
      />
    </>
  )
}
