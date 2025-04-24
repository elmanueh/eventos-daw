import { routes, urls } from '@/configs/constant'
import { fetchGet } from '@/utils/fetchGet'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './card.css'

export default function ReservaCard({ reserva }) {
  const [info, setInfo] = useState({
    evento: null,
    espacio: null
  })
  const status = reserva.cancelada ? 'CERRADO' : 'ACTIVO'

  useEffect(() => {
    const getInfo = async () => {
      try {
        const reservaDTO = await fetchGet(urls.RESERVAS_DET(reserva.id))

        const evento = await fetchGet(urls.EVENTOS_DET(reservaDTO.evento))

        let espacio = null

        if (!reserva.cancelada) {
          espacio = await fetchGet(urls.ESPACIOS_DET(evento.espacioFisico))
        }

        setInfo({
          evento: evento,
          espacio: espacio
        })
      } catch (error) {
        console.error('Error fetching información de la reserva:', error)
      }
    }

    getInfo()
  }, [reserva.id])

  return (
    <div className="my-card no-hover">
      <div className="my-card-header">
        {info.evento && (
          <Link
            to={routes.EVENTOS(info.evento.idEvento)}
            className="text-decoration-none"
          >
            <h2 title={info.evento.nombre} className="m-0">
              {info.evento.nombre}
            </h2>
          </Link>
        )}
        <span className={`my-card-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="my-card-info next">
        <span>
          <i className="bi bi-people-fill my-card-capacity" />
          {reserva.plazasReservadas} personas
        </span>

        {!reserva.cancelada && info.espacio && (
          <span>
            <i className="bi bi-pin-map-fill my-card-espacio" />
            <Link
              to={routes.ESPACIOS(info.espacio.id)}
              className="text-decoration-none"
            >
              {info.espacio.nombre}
            </Link>
          </span>
        )}

        {!reserva.cancelada && info.evento && (
          <span>
            <i className="bi bi-calendar my-card-date" />
            {format(new Date(info.evento.fechaInicio), "dd'/'MM'/'yyyy", {
              locale: es
            })}
          </span>
        )}

        {!reserva.cancelada && info.evento && (
          <span>
            <i className="bi bi-clock-fill my-card-time" />
            {format(new Date(info.evento.fechaInicio), 'HH:mm', {
              locale: es
            })}
          </span>
        )}
      </div>
    </div>
  )
}
