import { routes } from '@/configs/constant'
import './card.css'

export default function EspacioCard({ espacio }) {
  const status = espacio.estado === 'ACTIVO' ? 'ACTIVO' : 'CERRADO'

  return (
    <div
      className="my-card"
      onClick={() => (window.location.href = routes.ESPACIOS(espacio.id))}
    >
      <div className="my-card-header">
        <h2>{espacio.nombre}</h2>
        <span className={`my-card-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="my-card-capacity">
        <span>
          <i class="bi bi-people-fill" /> {espacio.capacidad} personas
        </span>
      </div>
    </div>
  )
}
