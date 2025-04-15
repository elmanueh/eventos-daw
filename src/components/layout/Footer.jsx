import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <p>&copy; 2025 Eventy. Todos los derechos reservados.</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <p>
              Creado por: <strong>ElManueh</strong> y <strong>Julisco23</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
