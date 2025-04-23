import { routes } from '@/configs/constant'
import './card.css'

export default function EspacioCard({ espacio, visible }) {
  const status = espacio.estado === 'ACTIVO' ? 'ACTIVO' : 'CERRADO'

  const handleEdit = () => {
    // Implementar la lógica para editar el espacio
  }

  const handleDesactivar = () => {
    // Implementar la lógica para desactivar el espacio
  }

  const handleActivar = () => {
    // Implementar la lógica para activar el espacio
  }

  return (
    <div>
      <div
        className="my-card"
        onClick={() => (window.location.href = routes.ESPACIOS(espacio.id))}
      >
        <div className="my-card-header">
          <h2 title={espacio.nombre}>{espacio.nombre}</h2>
          <span className={`my-card-status ${status.toLowerCase()}`}>
            {status}
          </span>
        </div>

        <p className="my-card-description">{espacio.descripcion}</p>

        <div className="my-card-capacity">
          <span>
            <i className="bi bi-people-fill" /> {espacio.capacidad} personas
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
          {status === 'ACTIVO' ? (
            <button
              type="button"
              class="btn btn-outline-danger"
              onClick={handleDesactivar}
            >
              Desactivar
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-outline-success"
              onClick={handleActivar}
            >
              Activar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
