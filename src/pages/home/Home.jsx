import { tipoTarjeta } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { AuthContext } from '@context/AuthProvider'
import { useContext } from 'react'
import { useLoaderData } from 'react-router'

export default function Home() {
  const { user } = useContext(AuthContext)
  const eventos = useLoaderData()[1]._embedded.eventoResumenList.slice(0, 8)
  const espacios = useLoaderData()[0]
    .espacio.map((espacio) => espacio.espacioDTO)
    .slice(0, 8)

  return (
    <div className="d-flex flex-lg-col flex-column py-5 gap-5 ms-5 me-4">
      <header className="text-end">
        <h1 className="text-primary fw-bold">
          Bienvenido de nuevo,{' '}
          <span className="text-muted">{user.username}</span>
        </h1>
        <p className="text-muted fs-5">
          Aquí tienes un resumen de tu actividad
        </p>
      </header>

      <section className="d-flex flex-column gap-4 mt-5">
        <h2 className="text-primary fw-bold fs-3 mb-2">
          <i className="bi bi-houses-fill" /> Espacios físicos disponibles
        </h2>

        <GroupCards
          objetos={espacios}
          tipoTarjeta={tipoTarjeta.ESPACIOS}
          noPaginator={true}
        ></GroupCards>
      </section>

      <section className="d-flex flex-column gap-4 mt-5">
        <h2 className="text-primary fw-bold fs-3 mb-2">
          <i className="bi bi-calendar-event-fill" /> Próximos eventos
        </h2>

        <GroupCards
          objetos={eventos}
          tipoTarjeta={tipoTarjeta.EVENTOS}
          noPaginator={true}
        ></GroupCards>
      </section>
    </div>
  )
}
