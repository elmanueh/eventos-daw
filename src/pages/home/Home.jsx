import {
  ESPACIOS_REDUCER,
  EVENTOS_REDUCER,
  NAV_ROUTES,
  TARJETA_TIPOS
} from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import { useEventos } from '@/hooks/useEventos'
import GroupCards from '@components/groups/GroupCards'
import Loading from '@components/Loading'
import { AuthContext } from '@context/AuthContext'
import { useContext, useId } from 'react'
import { Link } from 'react-router'

export default function Home() {
  const { user } = useContext(AuthContext)
  const { espacios, loading: loadingEspacios } = useEspacios(
    ESPACIOS_REDUCER.RANDOM,
    6
  )
  const { eventos, loading: loadingEventos } = useEventos(
    EVENTOS_REDUCER.RANDOM,
    6
  )

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
        <>
          {loadingEspacios && <Loading />}
          {!loadingEspacios && espacios.length === 0 && (
            <h2 className="text-center text-muted">
              No se han encontrado espacios disponibles por ahora.
            </h2>
          )}

          {!loadingEspacios && espacios.length > 0 && (
            <>
              <GroupCards items={espacios} type={TARJETA_TIPOS.ESPACIOS} />
              <div className="text-end">
                <Link
                  to={NAV_ROUTES.ESPACIOS}
                  className="btn btn-outline-primary"
                >
                  Ver todos los espacios
                </Link>
              </div>
            </>
          )}
        </>
      </section>

      <section className="d-flex flex-column gap-4 mt-5" id={idGroupEventos}>
        <h2 className="text-primary fw-bold fs-3 mb-2">
          <i className="bi bi-calendar-event-fill" /> Próximos eventos
        </h2>
        {loadingEventos && <Loading />}
        {!loadingEventos && eventos.length === 0 && (
          <h2 className="text-center text-muted">
            Todavía no hay eventos, pero ¡estate atento!
          </h2>
        )}
        {!loadingEventos && eventos.length > 0 && (
          <>
            <GroupCards items={eventos} type={TARJETA_TIPOS.EVENTOS} />
            <div className="text-end">
              <Link to={NAV_ROUTES.EVENTOS} className="btn btn-outline-primary">
                Ver todos los eventos
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
