import { roles, routes } from '@/configs/constant'
import { AuthContext } from '@context/AuthProvider'
import { useContext } from 'react'
import { FaBars, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import './AppNavbar.css'
import logo from '/logo.png'

export default function AppNavbar() {
  const navigate = useNavigate()

  const { user, logout } = useContext(AuthContext)
  const rolesUsuario = user?.rolesUsuario?.split(',') || []
  const nombre = user?.nombreUsuario || ''

  const handleLogout = () => {
    logout()
    navigate(routes.LOGIN)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          Eventy
        </a>

        {/* Menú colapsable para pantallas pequeñas */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto d-flex gap-2 me-2 navbar-nav">
            {rolesUsuario.includes(roles.USUARIO) && (
              <button
                className="btn btn-outline-light"
                onClick={() => navigate(routes.RESERVAS)}
              >
                Mis Reservas
              </button>
            )}

            {rolesUsuario.includes(roles.GESTOR_EVENTOS) && (
              <button
                className="btn btn-outline-light"
                onClick={() => navigate(routes.EVENTOS)}
              >
                Mis Eventos
              </button>
            )}

            {rolesUsuario.includes(roles.PROPIETARIO_ESPACIOS) && (
              <button
                className="btn btn-outline-light"
                onClick={() => navigate(routes.ESPACIOS)}
              >
                Mis Espacios
              </button>
            )}
          </div>
        </div>

        {/* Dropdown y Cerrar sesión siempre visibles */}
        <div className="d-flex gap-2 ms-auto">
          {/* Dropdown para el usuario */}
          <div className="dropdown">
            <button
              className="btn btn-outline-light d-flex align-items-center dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle size={24} className="me-2" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li className="text-muted mb-2">
                <strong>Nombre:</strong> {nombre}
              </li>
              <li className="text-muted">
                <strong>Roles:</strong>
              </li>
              <li className="d-flex flex-wrap gap-2 mt-2">
                {rolesUsuario.map((r, i) => (
                  <span key={i} className="badge bg-secondary">
                    {r}
                  </span>
                ))}
              </li>
            </ul>
          </div>

          {/* Botón de Cerrar sesión */}
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        {/* Botón de menú desplegable en pantallas pequeñas */}
        <button
          className="btn btn-outline-light d-flex align-items-center d-lg-none ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars size={24} />
        </button>
      </div>
    </nav>
  )
}
