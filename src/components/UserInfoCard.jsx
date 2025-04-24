import { roles, routes, urls } from '@/configs/constant'
import { fetchGet } from '@/utils/fetchGet'
import { AuthContext } from '@context/AuthContext'
import format from 'date-fns/format'
import es from 'date-fns/locale/es'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'

export default function UserInfoCard() {
  const { user } = useContext(AuthContext)
  const [info, setInfo] = useState({
    evento: null,
    espacio: null
  })

  useEffect(() => {
    const getInfo = async () => {
      try {
        const reservasDto = await fetchGet(urls.RESERVAS_PRIVADAS(user.id))
        const reservas = await Promise.all(
          reservasDto._embedded.reservaResumenList
            .filter((reserva) => !reserva.cancelada)
            .map((reserva) => fetchGet(urls.RESERVAS_DET(reserva.id)))
        )
        if (reservas.length === 0) return null

        const eventos = await Promise.all(
          reservas.map((reserva) => fetchGet(urls.EVENTOS_DET(reserva.evento)))
        )
        const evento = eventos.sort((a, b) => {
          const fechaA = new Date(a.fechaInicio)
          const fechaB = new Date(b.fechaInicio)
          return fechaA - fechaB
        })[0]
        const espacio = await fetchGet(urls.ESPACIOS_DET(evento.espacioFisico))

        setInfo({
          evento: evento,
          espacio: espacio
        })
      } catch (error) {
        console.error('Error fetching reservas:', error)
      }
    }
    getInfo()
  }, [user])

  return (
    <aside className="bg-dark rounded p-4 d-flex flex-column text-center align-items-center gap-3 border border-secondary align-self-start">
      <img
        src="https://cdn-icons-png.freepik.com/256/5084/5084713.png"
        alt="Foto de perfil"
        className="rounded-circle shadow-sm"
        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
      />
      <h5 className="text-center fw-semibold mb-0">{user.username}</h5>
      {info.evento ? (
        <div className="ps-3 py-2 rounded w-100 mt-3 border border-secondary text-start">
          <h6 className="text-center text-primary fw-bold mt-2 mb-3 fs-5">
            Próxima Reserva
          </h6>
          <ul className="list-unstyled d-flex flex-column gap-1 mb-3">
            <li>
              <i className="bi bi-star-fill text-primary" />
              <strong> Evento: </strong>
              <Link
                to={routes.EVENTOS(info.evento.idEvento)}
                className="text-decoration-none"
              >
                {info.evento.nombre}
              </Link>
            </li>

            <li>
              <i className="bi bi-pin-map-fill text-primary" />
              <strong> Lugar: </strong>
              <Link
                to={routes.ESPACIOS(info.espacio.id)}
                className="text-decoration-none"
              >
                {info.espacio.nombre}
              </Link>
            </li>
            <li>
              <i className="bi bi-clock-fill text-primary " />
              <strong> Fecha: </strong>
              {format(
                new Date(info.evento.fechaInicio),
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
      <div className="d-flex flex-column w-100 gap-2 mt-4">
        {user.roles.includes(roles.GESTOR_EVENTOS) && (
          <>
            <Link to={routes.MIS_ESPACIOS} className="btn btn-primary w-100">
              <i className="bi bi-house-gear-fill" /> Mis espacios
            </Link>
            <Link
              to={routes.MIS_EVENTOS}
              className="btn btn-outline-secondary w-100"
            >
              <i className="bi bi-calendar-event" /> Mis eventos
            </Link>
          </>
        )}
        <Link to={routes.MIS_RESERVAS} className="btn btn-info w-100">
          <i className="bi bi-book-half" /> Mis reservas
        </Link>
      </div>
    </aside>
  )
}
