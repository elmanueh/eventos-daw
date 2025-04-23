import { routes } from '@/configs/constant'
import UserInfoCard from '@components/UserInfoCard'
import { AuthContext } from '@context/AuthProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import logo from '/logo.png'

export default function Header() {
  const { logout, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(routes.LOGIN)
  }

  return (
    <>
      <nav className="navbar bg-dark sticky-top">
        <div className="container-fluid">
          <a
            className="navbar-brand d-flex align-items-center"
            href={routes.HOME}
          >
            <img
              src={logo}
              alt="Logo"
              width="50"
              height="50"
              className="ms-4"
            />
            <span className="ms-3 text-primary fw-semibold">Eventy</span>
          </a>

          <div className="d-xl-none me-3">
            <button
              className="btn btn-outline-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <i className="bi bi-person-circle fs-4" />
            </button>
          </div>

          <div className="d-none d-xl-block me-3">
            <button className="btn btn-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title text-primary fw-bold"
            id="offcanvasWithBothOptionsLabel"
          >
            Tu perfil
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <UserInfoCard user={user} />
          <button className="btn btn-danger mt-4 w-100" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  )
}
