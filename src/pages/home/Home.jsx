import EspacioCard from '@components/cards/EspacioCard'
import EventoCard from '@components/cards/EventoCard'
import { Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function Home() {
  const espacios = useLoaderData()[0].espacio
  const eventos = useLoaderData()[1]._embedded.eventoResumenList

  return (
    <Container className="py-4 d-flex flex-column gap-4">
      <h1 className="text-center">Bienvenido</h1>

      <section className="d-flex flex-column gap-4">
        <h2>Espacios físicos</h2>

        <div className="row g-4">
          {espacios
            .filter((espacio) => espacio.espacioDTO.estado === 'ACTIVO')
            .slice(0, 4)
            .map((espacio) => (
              <div
                key={espacio.espacioDTO.id}
                className="col-12 col-md-6 col-lg-4 col-xl-3"
              >
                <EspacioCard espacio={espacio.espacioDTO} />
              </div>
            ))}
        </div>

        <div className="text-end">
          <a href="/espacios" className="btn btn-outline-primary">
            Ver más
          </a>
        </div>
      </section>

      <section className="d-flex flex-column gap-4">
        <h2>Eventos próximos</h2>

        <div className="row g-4">
          {eventos.slice(0, 4).map((evento) => (
            <div key={evento.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <EventoCard evento={evento} />
            </div>
          ))}
        </div>

        <div className="text-end">
          <a href="/eventos" className="btn btn-outline-primary">
            Ver más
          </a>
        </div>
      </section>
    </Container>
  )
}
