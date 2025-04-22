import EspacioCard from '@components/cards/EspacioCard'
import EventoCard from '@components/cards/EventoCard'
import UserInfoCard from '@components/UserInfoCard'
import { AuthContext } from '@context/AuthProvider'
import { useContext } from 'react'
import { useLoaderData } from 'react-router'

export default function Home() {
  const { user } = useContext(AuthContext)
  const eventos = useLoaderData()[1]._embedded.eventoResumenList
  const espacios = useLoaderData()[0].espacio.map(
    (espacio) => espacio.espacioDTO
  )

  return (
    <div
      className="d-grid py-5 gap-5 ms-5 me-4"
      style={{ gridTemplateColumns: '1fr 320px' }}
    >
      <div className="d-flex flex-column gap-5 mx-5">
        <header className="text-end">
          <h1 className="text-primary fw-bold">
            Bienvenido de nuevo,{' '}
            <span className="text-muted">{user.nombreUsuario}</span>
          </h1>
          <p className="text-muted fs-5">
            Aquí tienes un resumen de tu actividad
          </p>
        </header>

        <section className="d-flex flex-column gap-4">
          <h2 className="text-primary fw-bold fs-3 mb-2">
            <i className="bi bi-houses-fill" /> Espacios físicos disponibles
          </h2>

          <div className="grid-auto-cards">
            {espacios.slice(0, 4).map((espacio) => (
              <div key={espacio.id}>
                <EspacioCard espacio={espacio} />
              </div>
            ))}
          </div>

          <div className="text-end">
            <a href="/espacios" className="btn btn-outline-primary">
              Ver todos los espacios
            </a>
          </div>
        </section>

        <section className="d-flex flex-column gap-4">
          <h2 className="text-primary fw-bold fs-3 mb-2">
            <i class="bi bi-calendar-event-fill" /> Próximos eventos
          </h2>

          <div className="grid-auto-cards">
            {eventos.slice(0, 4).map((evento) => (
              <div key={evento.id}>
                <EventoCard evento={evento} />
              </div>
            ))}
          </div>

          <div className="text-end">
            <a href="/eventos" className="btn btn-outline-primary">
              Ver todos los eventos
            </a>
          </div>
        </section>
      </div>

      <UserInfoCard user={user} />
    </div>
  )
}
