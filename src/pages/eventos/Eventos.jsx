import { API_URLS, TARJETA_TIPOS } from '@/configs/constant'
import { hideMessageError, showMessageError } from '@/utils/error'
import { fetchGet } from '@/utils/fetchGet'
import GroupCards from '@components/GroupCards'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

const Eventos = () => {
  const loaderData = useLoaderData()
  const [eventos, setEventos] = useState(loaderData._embedded.eventoResumenList)

  const [isEventosLoaded, setIsEventosLoaded] = useState(true)

  const [mesAnio, setMesAnio] = useState('')

  const updateEventos = async () => {
    if (isEventosLoaded) {
      setMesAnio('')
      return hideMessageError()
    }

    try {
      const data = await fetchGet(API_URLS.EVENTOS_LISTAR)
      setEventos(data._embedded?.eventoResumenList || [])

      hideMessageError()

      setIsEventosLoaded(true)
      setMesAnio('')
    } catch (error) {
      console.error('Error al cargar los espacios filtrados:', error)
      showMessageError('Error al cargar los espacios filtrados.')
    }
  }

  const loadEventos = async (e) => {
    e.preventDefault()

    if (mesAnio === '') {
      return showMessageError('El mes y año son obligatorios.')
    }

    try {
      const data = await fetchGet(
        API_URLS.EVENTOS_FILTRADOS(mesAnio.split('-')[1], mesAnio.split('-')[0])
      )
      setEventos(data._embedded?.eventoResumenList || [])
      hideMessageError()

      setIsEventosLoaded(false)
    } catch (error) {
      console.error('Error al cargar los espacios filtrados:', error)
      showMessageError('Error al cargar los espacios filtrados.')
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
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

      <section className="mt-3">
        <div
          id="errorMessage"
          className="alert alert-danger d-inline-block d-none"
        />
      </section>

      <GroupCards objetos={eventos} tipo={TARJETA_TIPOS.EVENTOS}></GroupCards>
    </div>
  )
}

export default Eventos
