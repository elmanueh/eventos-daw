// pages/Espacios.jsx
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import EspacioCard from '../components/EspacioCard';
import { espaciosEstaticos } from "../data/estaticos";

const Espacios = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Todos los Espacios Físicos</h2>

      <Row className="g-4">
        {espaciosEstaticos.map((espacio) => (
          <Col key={espacio.id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <EspacioCard espacio={espacio} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Espacios;
