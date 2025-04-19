import { roles, routes } from '@/configs/constant'
import { useAuth } from '@context/AuthProvider'
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import logo from '/logo.png'

export default function AppNavbar() {
  const navigate = useNavigate()

  const { usuario, logout } = useAuth()
  const rolesUsuario = usuario?.roles?.split(',') || []
  const nombre = usuario?.nombre || ''

  const handleLogout = () => {
    logout()
    navigate(routes.LOGIN)
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center" href="/">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          Eventy
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center gap-2">
          {rolesUsuario.includes(roles.USUARIO) && (
            <Button
              variant="outline-light"
              onClick={() => navigate(routes.RESERVAS)}
            >
              Mis Reservas
            </Button>
          )}

          {rolesUsuario.includes(roles.GESTOR_EVENTOS) && (
            <Button
              variant="outline-light"
              onClick={() => navigate(routes.EVENTOS)}
            >
              Mis Eventos
            </Button>
          )}

          {rolesUsuario.includes(roles.PROPIETARIO_ESPACIOS) && (
            <Button
              variant="outline-light"
              onClick={() => navigate(routes.ESPACIOS)}
            >
              Mis Espacios
            </Button>
          )}

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline-light"
              className="d-flex align-items-center"
            >
              <FaUserCircle size={24} className="me-2" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-3">
              <Dropdown.ItemText>
                <div className="text-muted mb-2">
                  <strong>Nombre:</strong> {nombre}
                </div>
                <div className="text-muted">
                  <strong>Roles:</strong>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {rolesUsuario.map((r, i) => (
                    <span key={i} className="badge bg-secondary">
                      {r}
                    </span>
                  ))}
                </div>
              </Dropdown.ItemText>
            </Dropdown.Menu>
          </Dropdown>

          <Button variant="danger" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Nav>
      </Container>
    </Navbar>
  )
}
