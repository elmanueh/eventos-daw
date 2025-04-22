import { routes } from '@/configs/constant'
import { AuthContext } from '@context/AuthProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import logo from '/logo.png'

export default function Header() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(routes.LOGIN)
  }

  return (
    <nav className="navbar bg-dark sticky-top">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex align-items-center"
          href={routes.HOME}
        >
          <img src={logo} alt="Logo" width="50" height="50" className="ms-4" />
          <span className="ms-3 text-primary fw-semibold">Eventy</span>
        </a>

        <div className="me-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
