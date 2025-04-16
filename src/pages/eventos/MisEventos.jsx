import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import EventoCard from '../../components/cards/EventoCard';
import Paginacion from '../../components/ui/Paginacion';
import { espaciosEstaticos, eventosEstaticos } from '../../data/estaticos';
import { useAuth } from '../../context/AuthProvider';

const MisEventos = () => {
  const { usuario } = useAuth();

  const [misEventos, setMisEventos] = useState(() =>
    eventosEstaticos.filter(evento => evento.organizador === usuario.nombre)
  );

  const [currentPageActivos, setCurrentPageActivos] = useState(1);
  const [currentPageCerrados, setCurrentPageCerrados] = useState(1);
  const [pageSize] = useState(8);

  const [showModal, setShowModal] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    organizador: usuario.nombre,
    categoria: '',
    numPlazas: 1,
    fechaInicio: '',
    fechaFin: '',
    espacioFisico: '',
    cancelado: false
  });

  const [editando, setEditando] = useState(false);

  const handleChangeEstado = (id) => {
    const actualizados = misEventos.map(evento =>
      evento.id === id
        ? { ...evento, cancelado: !evento.cancelado }
        : evento
    );
    setMisEventos(actualizados);
  };

  const handleAddEvento = () => {
    setShowModal(true);
    setNuevoEvento({
      id: '',
      nombre: '',
      descripcion: '',
      organizador: usuario.nombre,
      categoria: '',
      numPlazas: 1,
      fechaInicio: '',
      fechaFin: '',
      espacioFisico: '',
      cancelado: false
    });
    setEditando(false);
  };

  const handleEditEvento = (evento) => {
    setShowModal(true);
    setNuevoEvento(evento);
    setEditando(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    if (editando) {
      setMisEventos(misEventos.map(evento => evento.id === nuevoEvento.id ? nuevoEvento : evento));
    } else {
      setMisEventos([...misEventos, { ...nuevoEvento, id: Date.now().toString() }]);
    }
    */
    setShowModal(false);
  };

  const eventosActivos = misEventos.filter(e => e.cancelado === false);
  const eventosCancelados = misEventos.filter(e => e.cancelado === true);

  const totalPagesActivos = Math.ceil(eventosActivos.length / pageSize);
  const totalPagesCerrados = Math.ceil(eventosCancelados.length / pageSize);

  const getPaginatedActivos = () => {
    const start = (currentPageActivos - 1) * pageSize;
    return eventosActivos.slice(start, start + pageSize);
  };

  const getPaginatedCerrados = () => {
    const start = (currentPageCerrados - 1) * pageSize;
    return eventosCancelados.slice(start, start + pageSize);
  };

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Eventos</h1>

      <Button variant="primary" onClick={handleAddEvento} className="ms-auto">
        Crear Evento
      </Button>

      <h3>Activos</h3>
      <Row>
        {getPaginatedActivos().length > 0 ? (
          getPaginatedActivos().map(evento => (
            <Col key={evento.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <EventoCard evento={evento} />
              <Button variant="warning" onClick={() => handleEditEvento(evento)} className="mt-2">Editar</Button>
              <Button variant="danger" onClick={() => handleChangeEstado(evento.id)} className="mt-2 ms-2">
                Cancelar
              </Button>
            </Col>
          ))
        ) : (
          <p>No hay eventos activos.</p>
        )}
      </Row>

      <Paginacion
        currentPage={currentPageActivos}
        totalPages={totalPagesActivos}
        onPageChange={(page) => setCurrentPageActivos(page)}
      />

      <h3>Cancelados</h3>
      <Row>
        {getPaginatedCerrados().length > 0 ? (
          getPaginatedCerrados().map(evento => (
            <Col key={evento.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <EventoCard evento={evento} />
              <Button variant="warning" onClick={() => handleEditEvento(evento)} className="mt-2">Editar</Button>
            </Col>
          ))
        ) : (
          <p>No hay eventos cancelados.</p>
        )}
      </Row>

      <Paginacion
        currentPage={currentPageCerrados}
        totalPages={totalPagesCerrados}
        onPageChange={(page) => setCurrentPageCerrados(page)}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? 'Editar Evento' : 'Crear Nuevo Evento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {!editando && (
                <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    value={nuevoEvento.nombre}
                    onChange={(e) => setNuevoEvento({ ...nuevoEvento, nombre: e.target.value })}
                    required
                />
                </Form.Group>
            )}

            <Form.Group controlId="descripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={nuevoEvento.descripcion}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })}
                required
              />
            </Form.Group>

            {!editando && (
                <Form.Group controlId="categoria" className="mt-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                    value={nuevoEvento.categoria}
                    onChange={(e) => setNuevoEvento({ ...nuevoEvento, categoria: e.target.value })}
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="ACADEMICOS">Académicos</option>
                    <option value="CULTURALES">Culturales</option>
                    <option value="ENTRETENIMIENTO">Entretenimiento</option>
                    <option value="DEPORTES">Deportes</option>
                    <option value="OTROS">Otros</option>
                </Form.Select>
                </Form.Group>
            )}

            <Form.Group controlId="numPlazas" className="mt-3">
              <Form.Label>Número de Plazas</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={nuevoEvento.numPlazas}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, numPlazas: parseInt(e.target.value) })}
                required
              />
            </Form.Group>

            <Form.Group controlId="fechaInicio" className="mt-3">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="datetime-local"
                value={nuevoEvento.fechaInicio}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, fechaInicio: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="fechaFin" className="mt-3">
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control
                type="datetime-local"
                value={nuevoEvento.fechaFin}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, fechaFin: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="espacioFisico" className="mt-3">
              <Form.Label>Espacio Físico</Form.Label>
              <Form.Select
                value={nuevoEvento.espacioFisico}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, espacioFisico: e.target.value })}
                required
              >
                <option value="">Selecciona un espacio</option>
                {espaciosEstaticos.map((espacio) => (
                  <option key={espacio.id} value={espacio.id}>
                    {espacio.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {editando ? 'Actualizar Evento' : 'Crear Evento'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MisEventos;
