import { API_URLS, NAV_ROUTES } from '@/configs/constant'
import { fetchGet } from '@/utils/fetchGet'
import { getReservaStatus } from '@/utils/reservaHelper'
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

  const status = getReservaStatus(reserva)

  useEffect(() => {
    const getInfo = async () => {
      try {
        const reservaDTO = await fetchGet(API_URLS.RESERVAS_DETALLE(reserva.id))

        const evento = await fetchGet(
          API_URLS.EVENTOS_DETALLE(reservaDTO.evento)
        )

        let espacio = null

        if (!reserva.cancelada) {
          espacio = await fetchGet(
            API_URLS.ESPACIOS_DETALLE(evento.espacioFisico)
          )
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
          <h2 title={info.evento.nombre} className="text-primary">
            <a
              href={NAV_ROUTES.EVENTOS_DET(info.evento.idEvento)}
              className="text-decoration-none"
            >
              {info.evento.nombre}
            </a>
          </h2>
        )}
        <span className={`my-card-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      {!reserva.cancelada && info.espacio && (
        <div className="my-card-info">
          <span>
            <i className="bi bi-pin-map-fill my-card-espacio" />
            <Link
              to={NAV_ROUTES.ESPACIOS_DET(info.espacio.id)}
              className="text-decoration-none"
            >
              {info.espacio.nombre}
            </Link>
          </span>
        </div>
      )}
      <div className="my-card-info">
        {!reserva.cancelada && info.evento && (
          <div className="my-card-info next">
            <span>
              <i className="bi bi-calendar my-card-date" />
              {format(new Date(info.evento.fechaInicio), "dd'/'MM'/'yyyy", {
                locale: es
              })}
            </span>
            <span>
              <i className="bi bi-clock-fill my-card-time" />
              {format(new Date(info.evento.fechaInicio), 'HH:mm', {
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
