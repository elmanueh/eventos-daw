import { TARJETA_TIPOS } from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import { useEventos } from '@/hooks/useEventos'
import GroupCards from '@components/GroupCards'
import { AuthContext } from '@context/AuthContext'
import { useContext, useId } from 'react'

export default function Home() {
  const { user } = useContext(AuthContext)
  const { eventos } = useEventos()
  const { espacios } = useEspacios()
  const idGroupEspacios = useId()
  const idGroupEventos = useId()

  return (
    <div className="d-flex flex-lg-col flex-column gap-5">
      <header className="text-end">
        <h1 className="text-primary fw-bold">
          Bienvenido de nuevo,{' '}
          <span className="text-muted">{user && user.username}</span>
        </h1>
        <p className="text-muted fs-5">
          Aquí tienes un resumen de tu actividad
        </p>
      </header>

      <section className="d-flex flex-column gap-4 mt-5">
        <h2 className="text-primary fw-bold fs-3 mb-2" id={idGroupEspacios}>
          <i className="bi bi-houses-fill" /> Espacios físicos disponibles
        </h2>
        {espacios.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center gap-3">
            <i className="bi bi-house-door-fill fs-1 text-primary" />
            <h2 className="text-muted">No hay espacios disponibles</h2>
          </div>
        ) : (
          <GroupCards
            objetos={espacios}
            tipo={TARJETA_TIPOS.ESPACIOS}
            noPaginator={true}
            id={idGroupEspacios}
          ></GroupCards>
        )}
      </section>

      <section className="d-flex flex-column gap-4 mt-5" id={idGroupEventos}>
        <h2 className="text-primary fw-bold fs-3 mb-2">
          <i className="bi bi-calendar-event-fill" /> Próximos eventos
        </h2>
        {eventos.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center gap-3">
            <i className="bi bi-calendar-x-fill fs-1 text-primary" />
            <h2 className="text-muted">No hay eventos disponibles</h2>
          </div>
        ) : (
          <GroupCards
            objetos={eventos}
            tipo={TARJETA_TIPOS.EVENTOS}
            noPaginator={true}
            id={idGroupEventos}
          ></GroupCards>
        )}
      </section>
    </div>
  )
}
