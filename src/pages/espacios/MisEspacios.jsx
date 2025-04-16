import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import EspacioCard from '../../components/cards/EspacioCard';
import Paginacion from '../../components/ui/Paginacion';
import { espaciosEstaticos } from "../../data/estaticos";
import { useAuth } from '../../context/AuthProvider';

const MisEspacios = () => {
  const { usuario } = useAuth();

  const [misEspacios, setMisEspacios] = useState(() => 
    espaciosEstaticos.filter(espacio => espacio.propietario === usuario.nombre)
  );

  const [currentPageActivos, setCurrentPageActivos] = useState(1);
  const [currentPageCerrados, setCurrentPageCerrados] = useState(1);
  const [pageSize] = useState(8);
  
  const [showModal, setShowModal] = useState(false);
  const [nuevoEspacio, setNuevoEspacio] = useState({
    id: '',
    nombre: '',
    propietario: usuario.nombre,
    capacidad: 0,
    direccion: '',
    longitud: 0,
    latitud: 0,
    descripcion: ''
  });
  
  const [editando, setEditando] = useState(false);

  const handleChangeEstado = (id) => {
    const updatedEspacios = misEspacios.map(espacio => {
      if (espacio.id === id) {
        return { 
          ...espacio, 
          estado: espacio.estado === 'ACTIVO' ? 'CERRADO_TEMPORALMENTE' : 'ACTIVO' 
        };
      }
      return espacio;
    });
    setMisEspacios(updatedEspacios);
  };

  const handleAddEspacio = () => {
    setShowModal(true);
    setNuevoEspacio({
      id: '',
      nombre: '',
      propietario: usuario.nombre,
      capacidad: 0,
      direccion: '',
      longitud: 0,
      latitud: 0,
      descripcion: ''
    });
    setEditando(false);
  };

  const handleEditEspacio = (espacio) => {
    setShowModal(true);
    setNuevoEspacio(espacio);
    setEditando(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      setMisEspacios(misEspacios.map(espacio => espacio.id === nuevoEspacio.id ? nuevoEspacio : espacio));
    } else {
      setMisEspacios([...misEspacios, { ...nuevoEspacio, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const espaciosActivos = misEspacios.filter(espacio => espacio.estado === 'ACTIVO');
  const espaciosCerrados = misEspacios.filter(espacio => espacio.estado === 'CERRADO_TEMPORALMENTE');

  const totalPagesActivos = Math.ceil(espaciosActivos.length / pageSize);
  const totalPagesCerrados = Math.ceil(espaciosCerrados.length / pageSize);

  const getPaginatedActivos = () => {
    const start = (currentPageActivos - 1) * pageSize;
    return espaciosActivos.slice(start, start + pageSize);
  };

  const getPaginatedCerrados = () => {
    const start = (currentPageCerrados - 1) * pageSize;
    return espaciosCerrados.slice(start, start + pageSize);
  };

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Espacios</h1>

      <Button variant="primary" onClick={handleAddEspacio} className="ms-auto">
        Crear Espacio
      </Button>

      <h3>Activos</h3>
      <Row>
        {getPaginatedActivos().length > 0 ? (
          getPaginatedActivos().map((espacio) => (
            <Col key={espacio.id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
              <div>
                <EspacioCard espacio={espacio} />
                <Button variant="warning" onClick={() => handleEditEspacio(espacio)} className="mt-2">Editar</Button>
                <Button variant="danger" onClick={() => handleChangeEstado(espacio.id)} className="mt-2 ms-2">
                  Cerrar Temporalmente
                </Button>
              </div>
            </Col>
          ))
        ) : (
          <p>No hay espacios activos.</p>
        )}
      </Row>

      <Paginacion
        currentPage={currentPageActivos}
        totalPages={totalPagesActivos}
        onPageChange={(page) => setCurrentPageActivos(page)}
      />

      <h3>Cerrados Temporalmente</h3>
      <Row>
        {getPaginatedCerrados().length > 0 ? (
          getPaginatedCerrados().map((espacio) => (
            <Col key={espacio.id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
              <div>
                <EspacioCard espacio={espacio} />
                <Button variant="warning" onClick={() => handleEditEspacio(espacio)} className="mt-2">Editar</Button>
                <Button variant="success" onClick={() => handleChangeEstado(espacio.id)} className="mt-2 ms-2">
                  Activar
                </Button>
              </div>
            </Col>
          ))
        ) : (
          <p>No hay espacios cerrados temporalmente.</p>
        )}
      </Row>

      <Paginacion
        currentPage={currentPageCerrados}
        totalPages={totalPagesCerrados}
        onPageChange={(page) => setCurrentPageCerrados(page)}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? 'Editar Espacio' : 'Añadir Nuevo Espacio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre del Espacio</Form.Label>
              <Form.Control
                type="text"
                value={nuevoEspacio.nombre}
                onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, nombre: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="capacidad" className="mt-3">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                type="number"
                value={nuevoEspacio.capacidad}
                onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, capacidad: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="descripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={nuevoEspacio.descripcion}
                onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, descripcion: e.target.value })}
                rows={3}
                required
              />
            </Form.Group>

            {!editando && (
              <>
                <Form.Group controlId="direccion" className="mt-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    value={nuevoEspacio.direccion}
                    onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, direccion: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="longitud" className="mt-3">
                  <Form.Label>Longitud</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    value={nuevoEspacio.longitud}
                    onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, longitud: parseFloat(e.target.value) })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="latitud" className="mt-3">
                  <Form.Label>Latitud</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    value={nuevoEspacio.latitud}
                    onChange={(e) => setNuevoEspacio({ ...nuevoEspacio, latitud: parseFloat(e.target.value) })}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit" className="mt-3">
              {editando ? 'Actualizar Espacio' : 'Añadir Espacio'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MisEspacios;
