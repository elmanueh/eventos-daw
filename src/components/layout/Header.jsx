import { NAV_ROUTES } from '@/configs/constant'
import UserCard from '@components/layout/UserCard'
import { AuthContext } from '@context/AuthContext'
import { useContext, useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import logo from '/logo.png'

export default function Header() {
  const [show, setShow] = useState(false)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLogout = () => {
    logout()
    navigate(NAV_ROUTES.LOGIN)
  }

  return (
    <>
      <nav className="navbar bg-dark sticky-top">
        <div className="container-fluid p-0">
          <a
            className="navbar-brand d-flex align-items-center"
            href={NAV_ROUTES.HOME}
          >
            <img src={logo} alt="Logo" width="50" height="50" />
            <span className="ms-3 text-primary fw-semibold">Eventy</span>
          </a>

          <div className="d-xl-none">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleShow}
            >
              <i className="bi bi-person-circle fs-4" />
            </button>
          </div>

          <div className="d-none d-xl-block">
            <button className="btn btn-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-primary fw-bold">
            Tu perfil
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserCard callbackCloseOffCanvas={handleClose} />
          <button className="btn btn-danger mt-4 w-100" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
