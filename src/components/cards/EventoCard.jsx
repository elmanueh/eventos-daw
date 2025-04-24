import { estado, routes, urls } from '@/configs/constant'
import { fetchPut } from '@/utils/fetchPut'
import './card.css'

export default function EventoCard({ evento, visible, onActualizar }) {
  const status = evento.cancelado ? estado.CERRADO : estado.ACTIVO

  const handleEdit = () => {
    // TODO: Implementar la lógica para editar el evento
  }

  const handleDesactivar = async () => {
    // TODO: Implementar la lógica para desactivar el evento
    try {
      await fetchPut(urls.CANCELAR_EVENTO(evento.id))
      const eventoActualizado = { ...evento, cancelado: true }
      onActualizar?.(eventoActualizado)
    } catch (error) {
      console.error('Error al desactivar el evento:', error)
    }
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
            onClick={handleEdit}
          >
            Editar
          </button>
          {!evento.cancelado && (
            <button
              type="button"
              className="btn btn-outline-danger"
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
