import { routes } from '@/configs/constant'
import './card.css'

export default function EventoCard({ evento, visible }) {
  const status = evento.cancelado ? 'CERRADO' : 'ACTIVO'

  const handleEdit = () => {
    // Implementar la lógica para editar el espacio
  }

  const handleDesactivar = () => {
    // Implementar la lógica para desactivar el espacio
  }

  return (
    <div>
      <div
        className="my-card"
        onClick={() => (window.location.href = routes.EVENTOS(evento.id))}
      >
        <div className="my-card-header">
          <h2 title={evento.nombre}>{evento.nombre}</h2>
          <span className={`my-card-status ${status.toLocaleLowerCase()}`}>
            {status}
          </span>
        </div>

        <p className="my-card-description">{evento.descripcion}</p>

        <div className="my-card-info">
          <span>
            <i className="bi bi-people-fill my-card-capacity" />
            {evento.numPlazas} personas
          </span>

          <span>
            <i className="bi bi-calendar my-card-date" />
            {new Date(evento.fechaInicio).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })}
          </span>
        </div>
      </div>
      {visible && (
        <div className="my-card-buttons">
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={handleEdit}
          >
            Editar
          </button>
          {status === 'ACTIVO' && (
            <button
              type="button"
              class="btn btn-outline-danger"
              onClick={handleDesactivar}
            >
              Desactivar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
