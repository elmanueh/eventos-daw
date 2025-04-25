import { API_URLS, TARJETA_TIPOS } from '@/configs/constant'
import { hideMessageError, showMessageError } from '@/utils/error'
import { fetchGet } from '@/utils/fetchGet'
import GroupCards from '@components/GroupCards'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function Espacios() {
  const loaderData = useLoaderData()
  const [espacios, setEspacios] = useState(
    loaderData.espacio?.map((espacio) => espacio.espacioDTO) || []
  )

  const [isEspaciosLoaded, setIsEspaciosLoaded] = useState(true)

  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [capacidad, setCapacidad] = useState('')

  const updateEspacios = async () => {
    if (isEspaciosLoaded) {
      setFechaInicio('')
      setFechaFin('')
      setCapacidad('')
      return hideMessageError()
    }

    try {
      const data = await fetchGet(API_URLS.ESPACIOS_LISTAR)
      setEspacios(data.espacio?.map((espacio) => espacio.espacioDTO) || [])

      setIsEspaciosLoaded(true)

      hideMessageError()

      setFechaInicio('')
      setFechaFin('')
      setCapacidad('')
      console.log(fechaInicio)
    } catch (error) {
      console.error('Error al cargar los espacios:', error)
      showMessageError('Error al cargar los espacios.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (fechaInicio === '')
      return showMessageError('La fecha de inicio es obligatoria.')

    if (fechaFin === '')
      return showMessageError('La fecha de fin es obligatoria.')

    if (capacidad === '')
      return showMessageError('La capacidad es obligatoria.')

    const fechaInicioISO = new Date(fechaInicio).toISOString().slice(0, -1)
    const fechaFinISO = new Date(fechaFin).toISOString().slice(0, -1)

    try {
      const data = await fetchGet(
        API_URLS.ESPACIOS_FILTRADOS(
          fechaInicioISO,
          fechaFinISO,
          parseInt(capacidad)
        )
      )

      setEspacios(data.espacio?.map((espacio) => espacio.espacioDTO) || [])
      hideMessageError()

      setIsEspaciosLoaded(false)
    } catch (error) {
      console.error('Error al cargar los espacios filtrados:', error)
      showMessageError('Error al cargar los espacios filtrados.')
    }
  }

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <header className="text-center">
        <h1 className="text-primary fw-bold" id="titulo1-groupCards">
          Espacios Físicos
        </h1>
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
                id="capacidad"
                name="capacidad"
                min="1"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                placeholder="0"
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

      <section>
        <div
          id="errorMessage"
          className="alert alert-danger d-inline-block d-none"
        />
      </section>

      <GroupCards
        objetos={espacios}
        tipo={TARJETA_TIPOS.ESPACIOS}
        id={'titulo1-groupCards'}
      ></GroupCards>
    </div>
  )
}
