import { NAV_ROUTES, RESERVAS_REDUCER } from '@/configs/constant'
import { useReservas } from '@/hooks/useReservas'
import { obtenerReservaReciente } from '@/utils/reservaHelper'
import format from 'date-fns/format'
import es from 'date-fns/locale/es'
import { Link } from 'react-router'

export default function UserInfoCard() {
  const { reservas, loading: loadingReservas } = useReservas(
    RESERVAS_REDUCER.BY_USUARIO
  )

  if (loadingReservas) return

  const reservaReciente = obtenerReservaReciente(reservas)

  if (!reservaReciente) return

  return (
    <>
      {reservaReciente.evento ? (
        <div className="px-3 py-2 rounded w-100 mt-3 border border-secondary text-start">
          <h6 className="text-center text-primary fw-bold mt-2 mb-3 fs-5">
            Próxima Reserva
          </h6>
          <ul className="list-unstyled d-flex flex-column gap-1 mb-3">
            <li>
              <i className="bi bi-star-fill text-primary" />
              <strong> Evento: </strong>
              <Link
                to={NAV_ROUTES.EVENTOS_DET(reservaReciente.evento.id)}
                className="text-decoration-none"
              >
                {reservaReciente.evento.nombre}
              </Link>
            </li>

            <li>
              <i className="bi bi-pin-map-fill text-primary" />
              <strong> Lugar: </strong>
              <Link
                to={NAV_ROUTES.ESPACIOS_DET(
                  reservaReciente.evento.espacioFisico.id
                )}
                className="text-decoration-none"
              >
                {reservaReciente.evento.espacioFisico.nombre}
              </Link>
            </li>
            <li>
              <i className="bi bi-clock-fill text-primary " />
              <strong> Fecha: </strong>
              {format(
                new Date(reservaReciente.evento.fechaInicio),
                "dd'/'MM'/'yyyy 'a las' HH:mm",
                { locale: es }
              )}
            </li>
          </ul>
        </div>
      ) : (
        <p className="text-center text-muted mt-3">
          No tienes ninguna reserva próxima.
        </p>
      )}
    </>
  )
}
