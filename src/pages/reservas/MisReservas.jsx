import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import ReservaCard from '../../components/cards/ReservaCard';
import { reservasEstaticas } from '../../data/estaticos';

const MisReservas = () => {
  const usuario = localStorage.getItem('nombre');
  const [reservas, setReservas] = useState(
    reservasEstaticas.filter(res => res.idUsuario === usuario)
  );

  const [showModal, setShowModal] = useState(false);
  const [nuevaReserva, setNuevaReserva] = useState({
    id: '',
    idUsuario: usuario,
    plazasReservadas: 1,
    cancelada: false,
    evento: { nombre: '' }
  });

  const handleOpenModal = () => {
    setNuevaReserva({
      id: '',
      idUsuario: usuario,
      plazasReservadas: 1,
      cancelada: false,
      evento: { nombre: '' }
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowModal(false);
  };

  const reservasActivas = reservas.filter(r => !r.cancelada);
  const reservasCanceladas = reservas.filter(r => r.cancelada);

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Reservas</h1>

      <Button variant="primary" onClick={handleOpenModal} className="ms-auto">
        Crear Reserva
      </Button>

      <h4>Activas</h4>
      <Row className="pb-3">
        {reservasActivas.length > 0 ? (
          reservasActivas.map(reserva => (
            <Col key={reserva.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ReservaCard reserva={reserva} />
            </Col>
          ))
        ) : (
          <p>No hay reservas activas.</p>
        )}
      </Row>

      <h4>Canceladas</h4>
      <Row className="pb-5">
        {reservasCanceladas.length > 0 ? (
          reservasCanceladas.map(reserva => (
            <Col key={reserva.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ReservaCard reserva={reserva} />
            </Col>
          ))
        ) : (
          <p>No hay reservas canceladas.</p>
        )}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombreEvento">
              <Form.Label>Nombre del Evento</Form.Label>
              <Form.Control
                type="text"
                value={nuevaReserva.evento.nombre}
                onChange={(e) =>
                  setNuevaReserva({
                    ...nuevaReserva,
                    evento: { nombre: e.target.value }
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="plazas" className="mt-3">
              <Form.Label>Plazas Reservadas</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={nuevaReserva.plazasReservadas}
                onChange={(e) =>
                  setNuevaReserva({
                    ...nuevaReserva,
                    plazasReservadas: parseInt(e.target.value)
                  })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Crear Reserva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MisReservas;
