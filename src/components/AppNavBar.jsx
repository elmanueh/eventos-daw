import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '/logo.png';

function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  // Ocultar el navbar si estás en login
  if (location.pathname === '/login') return null;

  useEffect(() => {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUsuario(parsedUser);
      } catch (err) {
        console.error('Error al parsear usuario', err);
        localStorage.removeItem('usuario');
      }
    }
  }, []);

  const handleLogin = () => navigate('/login');

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  // Detectar roles
  const roles = usuario?.rolesUsuario?.split(',') || [];

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo de la Web"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Brand href="#">Eventy</Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center gap-2">
          {roles.includes('USUARIO') && (
            <Button variant="outline-light" onClick={() => navigate('/mis-eventos')}>
              Mis Eventos
            </Button>
          )}

          {roles.includes('GESTOR_EVENTOS') && (
            <Button variant="outline-light" onClick={() => navigate('/gestor-eventos')}>
                Gestor de Eventos
            </Button>
          )}

          {roles.includes('PROPIETARIO_ESPACIOS') && (
            <Button variant="outline-light" onClick={() => navigate('/propietario-espacios')}>
                Propietario de Espacios
            </Button>
          )}

          {usuario ? (
            <Button variant="danger" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          ) : (
            <Button variant="primary" onClick={handleLogin}>
              Iniciar sesión
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
