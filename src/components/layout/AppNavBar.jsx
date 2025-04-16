import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import logo from '/logo.png';

function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, logout } = useAuth();

  const roles = usuario?.roles?.split(',') || [];
  const nombre = usuario?.nombre || '';

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center" href="/">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          Eventy
        </Navbar.Brand>

        {location.pathname !== '/login' && (
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
              <Dropdown.Toggle variant="outline-light" className="d-flex align-items-center">
                <FaUserCircle size={24} className="me-2" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="p-3">
                <Dropdown.ItemText>
                  <div className="text-muted mb-2"><strong>Nombre:</strong> {nombre}</div>
                  <div className="text-muted"><strong>Roles:</strong></div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {roles.map((r, i) => (
                      <span key={i} className="badge bg-secondary">{r}</span>
                    ))}
                  </div>
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
