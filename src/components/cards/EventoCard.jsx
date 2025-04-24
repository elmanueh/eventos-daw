import { estado, routes } from '@/configs/constant'
import { handleDesactivarEvento, handleEditEvento } from '@/utils/operations'
import './card.css'

export default function EventoCard({ evento, visible }) {
  const status = evento.cancelado ? estado.CERRADO : estado.ACTIVO

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
          {!evento.cancelado && (
            <span>
              <i className="bi bi-calendar my-card-date" />
              {new Date(evento.fechaInicio).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </span>
          )}
        </div>
      </div>
      {visible && (
        <div className="my-card-buttons">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleEditEvento}
          >
            Editar
          </button>
          {!evento.cancelado && (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => handleDesactivarEvento(evento.id)}
            >
              Desactivar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
