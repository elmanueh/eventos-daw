import { tipoTarjeta, urls } from '@/configs/constant'
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
      console.log('Eventos ya cargados')
      return
    }

    try {
      const data = await fetchGet(urls.EVENTOS)
      setEventos(data._embedded?.eventoResumenList || [])

      setIsEventosLoaded(true)
      setMesAnio('')
    } catch (error) {
      console.error('Error al cargar los espacios filtrados:', error)
      alert('Error al cargar los espacios filtrados.')
    }
  }

  const loadEventos = async (e) => {
    e.preventDefault()

    if (mesAnio === '') {
      console.log('Mes y año no seleccionados')
      return
    }

    try {
      const data = await fetchGet(
        urls.EVENTOS_FILTRADOS(mesAnio.split('-')[1], mesAnio.split('-')[0])
      )
      setEventos(data._embedded?.eventoResumenList || [])

      setIsEventosLoaded(false)
    } catch (error) {
      console.error('Error al cargar los espacios filtrados:', error)
      alert('Error al cargar los espacios filtrados.')
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

      {/* TODO: Al actualizar eventos, debe cambiar el paginator page a 1*/}
      <GroupCards
        objetos={eventos}
        tipoTarjeta={tipoTarjeta.EVENTOS}
      ></GroupCards>
    </div>
  )
}

export default Eventos
