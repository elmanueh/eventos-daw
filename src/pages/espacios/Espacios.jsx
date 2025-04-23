import { urls } from '@/configs/constant'
import EspacioCard from '@components/cards/EspacioCard'
import Paginacion from '@components/Paginacion'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function Espacios() {
  const loaderData = useLoaderData()
  const [espacios, setEspacios] = useState(loaderData.espacio)

  const [isEspaciosLoaded, setIsEspaciosLoaded] = useState(true)
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

  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [capacidad, setCapacidad] = useState('')

  const updateEspacios = async () => {
    if (isEspaciosLoaded) {
      console.log('Espacios ya cargados')
      return
    }

    try {
      const response = await fetch(urls.ESPACIOS, {
        method: 'GET',
        credentials: 'include'
      })

      if (!response.ok) {
        console.error('Error al cargar los datos:', response)
        throw new Error('Error al cargar los datos')
      }

      const data = await response.json()
      setEspacios(data.espacio)

      setCurrentPage(1)
      setIsEspaciosLoaded(true)

      setFechaInicio('')
      setFechaFin('')
      setCapacidad('')
    } catch (error) {
      console.error('Error de conexión o servidor:', error)
      throw new Error('Error de conexión o servidor')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (fechaInicio === '' || fechaFin === '' || capacidad === '') {
      alert('Por favor, completa todos los campos')
      return
    }

    const fechaInicioISO = new Date(fechaInicio).toISOString().slice(0, -1)
    const fechaFinISO = new Date(fechaFin).toISOString().slice(0, -1)

    try {
      const response = await fetch(
        urls.ESPACIOS_FILTRADOS(
          fechaInicioISO,
          fechaFinISO,
          parseInt(capacidad)
        ),
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
      setEspacios(data.espacio)
      setCurrentPage(1)
      setIsEspaciosLoaded(false)
    } catch (error) {
      console.error('Error de conexión o servidor:', error)
      throw new Error('Error de conexión o servidor')
    }
  }

  return (
    <div className="d-flex flex-column py-5 gap-5 ms-5 me-4">
      <header className="text-center">
        <h1 className="text-primary fw-bold">Espacios Físicos</h1>
      </header>

      <section>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-start align-items-end g-3">
            {/* Fecha de inicio */}
            <Col xs="auto">
              <Form.Label htmlFor="fechaInicio" className="mb-1">
                Fecha de inicio
              </Form.Label>
              <Form.Control
                type="datetime-local"
                className="text-primary border-primary"
                id="fechaInicio"
                name="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                min={new Date().toISOString()}
                max={fechaFin}
              />
            </Col>

            {/* Fecha de fin */}
            <Col xs="auto">
              <Form.Label htmlFor="fechaFin" className="mb-1">
                Fecha de finalización
              </Form.Label>
              <Form.Control
                type="datetime-local"
                className="text-primary border-primary"
                id="fechaFin"
                name="fechaFin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                min={fechaInicio}
              />
            </Col>

            {/* Capacidad */}
            <Col xs="auto">
              <Form.Label htmlFor="capacidad" className="mb-1">
                Capacidad
              </Form.Label>
              <Form.Control
                type="number"
                className="text-primary border-primary"
                id="capacidad"
                name="capacidad"
                min="1"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
              />
            </Col>

            {/* Botón */}
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Buscar espacios
              </Button>
            </Col>

            {/* Botón */}
            <Col xs="auto">
              <Button variant="outline-primary" onClick={updateEspacios}>
                Quitar filtros
              </Button>
            </Col>
          </Row>
        </Form>
      </section>

      <section className="d-flex flex-column gap-4">
        {getCurrentPageEspacios().length === 0 ? (
          <div style={{ marginBottom: '100px' }}>
            <p>No hay espacios disponibles.</p>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {getCurrentPageEspacios().map((espacio) => (
                <Col key={espacio.espacioDTO.id} sm={12} md={6} xl={4} xxl={3}>
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
      </section>
    </div>
  )
}
