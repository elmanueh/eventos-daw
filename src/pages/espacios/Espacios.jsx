import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EspacioCard from "../../components/cards/EspacioCard";
import Paginacion from "../../components/ui/Paginacion";
import { espaciosEstaticos } from "../../data/estaticos";

const Espacios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  
  const totalPages = Math.ceil(espaciosEstaticos.length / pageSize);

  const getCurrentPageEspacios = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return espaciosEstaticos.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-5 text-center">Espacios Físicos</h1>

      {getCurrentPageEspacios().length === 0 ? (
        <p className="text-center">No hay espacios disponibles.</p>
      ) : (
        <Row className="g-4">
          {getCurrentPageEspacios().map((espacio) => (
            <Col key={espacio.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <EspacioCard espacio={espacio} />
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
