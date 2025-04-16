import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EventoCard from "../../components/cards/EventoCard";
import Paginacion from "../../components/ui/Paginacion";
import { eventosEstaticos } from "../../data/estaticos";

const Espacios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const [eventosActivos, setMisEspacios] = useState(() => 
    eventosEstaticos.filter(evento => evento.cancelado === false)
  );

  const totalPages = Math.ceil(eventosActivos.length / pageSize);

  const getCurrentPageEventos = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return eventosActivos.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-5 text-center">Eventos disponibles</h1>

      {getCurrentPageEventos().length === 0 ? (
        <p className="text-center">No hay eventos disponibles.</p>
      ) : (
        <Row className="g-4">
          {getCurrentPageEventos().map((evento) => (
            <Col key={evento.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <EventoCard evento={evento} />
            </Col>
          ))}
        </Row>
      )}

      <Paginacion
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default Espacios;
