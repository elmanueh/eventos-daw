import { NAV_ROUTES } from '@/configs/constant'
import { getReservaStatus } from '@/utils/reservaHelper'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { Link } from 'react-router'
import './card.css'

export default function ReservaCard({ reserva }) {
  const status = getReservaStatus(reserva)

  return (
    <div className="my-card no-hover">
      <div className="my-card-header">
        {reserva.evento && (
          <h2 title={reserva.evento.nombre} className="text-primary">
            <a
              href={NAV_ROUTES.EVENTOS_DET(reserva.evento.id)}
              className="text-decoration-none"
            >
              {reserva.evento.nombre}
            </a>
          </h2>
        )}
        <span className={`my-card-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      {!reserva.cancelada && reserva.espacio.nombre && (
        <div className="my-card-info">
          <span>
            <i className="bi bi-pin-map-fill my-card-espacio" />
            <Link
              to={NAV_ROUTES.ESPACIOS_DET(reserva.espacio.id)}
              className="text-decoration-none"
            >
              {reserva.espacio.nombre}
            </Link>
          </span>
        </div>
      )}
      <div className="my-card-info">
        {!reserva.cancelada && reserva.evento.nombre && (
          <div className="my-card-info next">
            <span>
              <i className="bi bi-calendar my-card-date" />
              {format(new Date(reserva.evento.fechaInicio), "dd'/'MM'/'yyyy", {
                locale: es
              })}
            </span>
            <span>
              <i className="bi bi-clock-fill my-card-time" />
              {format(new Date(reserva.evento.fechaInicio), 'HH:mm', {
                locale: es
              })}
            </span>
          </div>
        )}
        <span>
          <i className="bi bi-people-fill my-card-capacity" />
          {reserva.plazasReservadas} plazas
        </span>
      </div>
    </div>
  )
}
