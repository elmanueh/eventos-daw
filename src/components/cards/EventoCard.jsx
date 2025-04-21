import { routes } from '@/configs/constant'
import './card.css'

export default function EventoCard({ evento }) {
  const status = evento.cancelado ? 'CERRADO' : 'ACTIVO'

  return (
    <div
      className="my-card"
      onClick={() => (window.location.href = routes.EVENTOS(evento.id))}
    >
      <div className="my-card-header">
        <h2>{evento.nombre}</h2>
        <span className={`my-card-status ${status.toLocaleLowerCase()}`}>
          {status}
        </span>
      </div>

      <p className="card-description">{evento.descripcion}</p>

      <div className="my-card-capacity">
        <span>
          <i class="bi bi-people-fill" /> {evento.numPlazas} personas
        </span>
      </div>
    </div>
  )
}
