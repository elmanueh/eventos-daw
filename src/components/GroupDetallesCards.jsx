import {
  GROUP_DETALLES_CARDS_SIZE,
  GROUP_DETALLES_CARDS_TIPOS
} from '@/configs/constant'
import EventoCard from '@components/cards/EventoCard'
import { Pagination } from '@components/pagination/Pagination'
import { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

export default function GroupDetallesCards({ objetos, tipo }) {
  if (!objetos || objetos.length === 0) return <></>

  const [currentPage, setCurrentPage] = useState(1)

  const isPuntosInteres = tipo === GROUP_DETALLES_CARDS_TIPOS.PUNTOS_INTERES
  const isReservas = tipo === GROUP_DETALLES_CARDS_TIPOS.RESERVAS
  const isEventos = tipo === GROUP_DETALLES_CARDS_TIPOS.EVENTOS

  const pageSize = GROUP_DETALLES_CARDS_SIZE
  const totalPages = objetos ? Math.ceil(objetos.length / pageSize) : 0
  const indexOfFirstItem = (currentPage - 1) * pageSize

  const getCurrentPage = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize

    if (isPuntosInteres)
      return objetos
        .sort((a, b) => a.distancia - b.distancia)
        .slice(startIndex, endIndex)

    if (isEventos)
      return objetos
        .filter(
          (e) => new Date(e.fechaInicio) >= new Date().setHours(0, 0, 0, 0)
        )
        .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
        .slice(startIndex, endIndex)

    return objetos.slice(startIndex, endIndex)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)

    const el = document.getElementById('objetos')
    if (el) {
      const offset = 80
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Card className="mb-4 border border-primary">
        <Card.Header
          as="h3"
          className="bg-secondary bg-opacity-25 text-primary"
          id="objetos"
        >
          {isPuntosInteres && 'Puntos de interés cercanos'}
          {isReservas && 'Reservas realizadas'}
          {isEventos && 'Próximos eventos'}
        </Card.Header>
        <ListGroup variant="flush">
          {getCurrentPage().map((objeto, index) => {
            if (isPuntosInteres) {
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
            } else if (isReservas) {
              return (
                <ListGroup.Item
                  key={index}
                  className="border-top border-primary d-flex justify-content-between align-items-center py-3"
                >
                  <div className="d-flex flex-column">
                    <span className="fw-bold">
                      Reserva #{index + 1 + indexOfFirstItem}
                    </span>
                    <span className="text-muted">
                      Usuario: {objeto.idUsuario}
                    </span>
                  </div>
                  <span className="badge bg-primary bg-opacity-25 text-primary rounded-pill px-3 py-2">
                    {objeto.plazasReservadas} plazas
                  </span>
                </ListGroup.Item>
              )
            } else if (isEventos) {
              if (index % 2 !== 0) return null

              return (
                <ListGroup.Item
                  key={index}
                  className="border-top border-primary d-flex justify-content-between align-items-center py-3"
                >
                  <div className="d-flex w-100 gap-3">
                    <div className="flex-fill">
                      <EventoCard evento={objeto} />
                    </div>

                    {getCurrentPage()[index + 1] && (
                      <div className="flex-fill">
                        <EventoCard evento={getCurrentPage()[index + 1]} />
                      </div>
                    )}
                  </div>
                </ListGroup.Item>
              )
            }
          })}
        </ListGroup>
      </Card>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
