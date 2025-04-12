import { useEffect, useState } from 'react';
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '/logo.png';

function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const roles = localStorage.getItem('rol');
    const nombre = localStorage.getItem('nombre');

    setUsuario({ roles, nombre });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nombre');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');

    navigate('/login');
  };

  // Detectar roles
  const roles = usuario?.roles?.split(',') || [];
  const nombre = usuario?.nombre || 'NADA';

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo de la Web"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          Eventy
        </Navbar.Brand>

        {location.pathname === '/login' 
        ? null 
        : (
          <Nav className="ms-auto d-flex align-items-center gap-2">

            {roles.includes('USUARIO') && (
              <Button variant="outline-light" onClick={() => navigate('/mis-reservas')}>
                Mis Reservas
              </Button>
            )}

            {roles.includes('GESTOR_EVENTOS') && (
              <Button variant="outline-light" onClick={() => navigate('/mis-eventos')}>
                  Mis Eventos
              </Button>
            )}

            {roles.includes('PROPIETARIO_ESPACIOS') && (
              <Button variant="outline-light" onClick={() => navigate('/mis-espacios')}>
                  Mis Espacios
              </Button>
            )} 

            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="dropdown-profile" className="d-flex align-items-center">
                <FaUserCircle size={24} className="me-2" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-3" style={{ minWidth: '200px' }}>
                <Dropdown.ItemText>
                  <div className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                  <strong>Nombre: </strong>
                    {nombre}
                  </div>

                  <div className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                    <strong>Roles:</strong>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {roles.map((role, index) => (
                        <span key={index} className="badge bg-secondary">{role}</span>
                      ))}
                    </div>
                  </div>
                </Dropdown.ItemText>

                <Dropdown.Divider />

                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  <strong>Cerrar sesión</strong>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 

            <Button variant="danger" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
