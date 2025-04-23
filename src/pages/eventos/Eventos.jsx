import { urls } from '@/configs/constant'
import EventoCard from '@components/cards/EventoCard'
import Paginacion from '@components/Paginacion'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

const Eventos = () => {
  const loaderData = useLoaderData()
  const [eventos, setEventos] = useState(loaderData._embedded.eventoResumenList)

  const [isEventosLoaded, setIsEventosLoaded] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(8)
  const totalPages = Math.ceil(eventos.length / pageSize)

  const getCurrentPageEventos = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return eventos.slice(startIndex, endIndex)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const [mesAnio, setMesAnio] = useState('')

  const updateEventos = async () => {
    if (isEventosLoaded) {
      console.log('Eventos ya cargados')
      return
    }

    try {
      const response = await fetch(urls.EVENTOS, {
        method: 'GET',
        credentials: 'include'
      })

      if (!response.ok) {
        console.error('Error al cargar los datos:', response)
        throw new Error('Error al cargar los datos')
      }

      const data = await response.json()
      setEventos(data._embedded.eventoResumenList)

      setCurrentPage(1)
      setIsEventosLoaded(true)

      setMesAnio('')
    } catch (error) {
      console.error('Error de conexión o servidor:', error)
      throw new Error('Error de conexión o servidor')
    }
  }

  const loadEventos = async (e) => {
    e.preventDefault()

    if (mesAnio === '') {
      console.log('Mes y año no seleccionados')
      return
    }

    console.log('Mes y año seleccionados:', mesAnio)
    console.log('Mes:', mesAnio.split('-')[1])
    console.log('Año:', mesAnio.split('-')[0])

    try {
      const response = await fetch(
        urls.EVENTOS_FILTRADOS(mesAnio.split('-')[1], mesAnio.split('-')[0]),
        {
          method: 'GET',
          credentials: 'include'
        }
      )

      if (!response.ok) {
        console.error('Error al cargar los datos:', response)
        throw new Error('Error al cargar los datos')
      }

      const data = await response.json()
      console.log(data)
      setEventos(data._embedded?.eventoResumenList || [])

      setCurrentPage(1)
      setIsEventosLoaded(false)
    } catch (error) {
      console.error('Error de conexión o servidor:', error)
      throw new Error('Error de conexión o servidor')
    }
  }

  return (
    <div className="d-flex flex-column py-5 gap-5 ms-5 me-4">
      <header className="text-center">
        <h1 className="text-primary fw-bold">Eventos</h1>
      </header>

      <section>
        <Form onSubmit={loadEventos}>
          <Row className="justify-content-start align-items-end g-3">
            <Col xs="auto">
              <Form.Label htmlFor="mesAnio" className="mb-1">
                Mes y Año
              </Form.Label>
              <Form.Control
                type="month"
                className="text-primary border-primary"
                id="mesAnio"
                name="mesAnio"
                value={mesAnio}
                onChange={(e) => setMesAnio(e.target.value)}
              />
            </Col>

            {/* Botón */}
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Buscar eventos
              </Button>
            </Col>

            {/* Botón */}
            <Col xs="auto">
              <Button variant="outline-primary" onClick={updateEventos}>
                Quitar filtros
              </Button>
            </Col>
          </Row>
        </Form>
      </section>

      <section className="d-flex flex-column gap-4 mt-5">
        {getCurrentPageEventos().length === 0 ? (
          <div style={{ marginBottom: '100px' }}>
            <p>No hay eventos disponibles.</p>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {getCurrentPageEventos().map((evento) => (
                <Col key={evento.id} sm={12} md={6} xl={4} xxl={3}>
                  <EventoCard evento={evento} />
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
      </section>
    </div>
  )
}

export default Eventos
