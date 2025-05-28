import { AUTH_ROLES, NAV_ROUTES } from '@/configs/constant'
import UserInfoCard from '@components/layout/UserInfoCard'
import { AuthContext } from '@context/AuthContext'
import { useContext } from 'react'
import { Link } from 'react-router'

export default function UserCard({ callbackCloseOffCanvas }) {
  const { user } = useContext(AuthContext)

  return (
    <aside className="bg-dark rounded p-4 d-flex flex-column text-center align-items-center gap-3 border border-secondary align-self-start">
      <img
        src={user.avatarUrl || 'https://i.pravatar.cc/120'}
        alt="Foto de perfil"
        className="rounded-circle shadow-sm"
        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
      />
      <h5 className="text-center fw-semibold mb-0">{user.username}</h5>
      <UserInfoCard />
      <div className="d-flex flex-column w-100 gap-2 mt-4">
        {user.roles.includes(AUTH_ROLES.GESTOR_EVENTOS) && (
          <>
            <Link
              to={NAV_ROUTES.MIS_ESPACIOS}
              className="btn btn-primary w-100"
              onClick={callbackCloseOffCanvas}
            >
              <i className="bi bi-house-gear-fill" /> Mis espacios
            </Link>
            <Link
              to={NAV_ROUTES.MIS_EVENTOS}
              className="btn btn-outline-secondary w-100"
              onClick={callbackCloseOffCanvas}
            >
              <i className="bi bi-calendar-event" /> Mis eventos
            </Link>
          </>
        )}
        <Link
          to={NAV_ROUTES.MIS_RESERVAS}
          className="btn btn-info w-100"
          onClick={callbackCloseOffCanvas}
        >
          <i className="bi bi-book-half" /> Mis reservas
        </Link>
      </div>
    </aside>
  )
}
