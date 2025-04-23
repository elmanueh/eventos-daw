import { roles, routes } from '@/configs/constant'

export default function UserInfoCard({ user }) {
  return (
    <div className="bg-dark rounded p-4 d-flex flex-column text-center align-items-center gap-3 border border-secondary align-self-start">
      <img
        src="https://cdn-icons-png.freepik.com/256/5084/5084713.png"
        alt="Foto de perfil"
        className="rounded-circle shadow-sm"
        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
      />
      <h5 className="text-center fw-semibold mb-0">{user.username}</h5>
      {user.proximaReserva ? (
        <div className="bg-light p-3 rounded w-100 mt-3 border">
          <h6 className="text-center text-primary fw-bold mb-2">
            Próxima Reserva
          </h6>
          <p className="mb-1">
            <strong>📍 Espacio:</strong> {user.proximaReserva.espacio}
          </p>
          <p className="mb-1">
            <strong>📅 Fecha:</strong> {user.proximaReserva.fecha}
          </p>
          <p className="mb-0">
            <strong>⏰ Hora:</strong> {user.proximaReserva.hora}
          </p>
        </div>
      ) : (
        <p className="text-center text-muted mt-3">
          No tienes ninguna reserva próxima.
        </p>
      )}
      <div className="d-flex flex-column w-100 gap-2 mt-4">
        {user.roles.includes(roles.GESTOR_EVENTOS) && (
          <>
            <a href={routes.MIS_ESPACIOS} className="btn btn-primary w-100">
              <i className="bi bi-house-gear-fill" /> Mis espacios
            </a>
            <a
              href={routes.MIS_EVENTOS}
              className="btn btn-outline-secondary w-100"
            >
              <i className="bi bi-calendar-event" /> Mis eventos
            </a>
          </>
        )}
        <a href={routes.MIS_RESERVAS} className="btn btn-info w-100">
          <i className="bi bi-book-half" /> Mis reservas
        </a>
      </div>
    </div>
  )
}
