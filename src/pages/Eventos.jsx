import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import EventoCard from '../components/EventoCard';
import { eventosEstaticos } from "../data/estaticos";

const Eventos = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Todos los Eventos</h2>

      <Row className="g-4">
        {eventosEstaticos.map((evento) => (
          <Col key={evento.id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <EventoCard evento={evento} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Eventos;
