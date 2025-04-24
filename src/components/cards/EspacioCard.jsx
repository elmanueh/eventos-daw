import { estado, routes, urls } from '@/configs/constant'
import { fetchPut } from '@/utils/fetchPut'
import './card.css'

export default function EspacioCard({ espacio, visible, onActualizar }) {
  const status =
    espacio.estado === estado.ACTIVO ? estado.ACTIVO : estado.CERRADO

  const handleEdit = () => {
    // TODO: Implementar la lógica para editar el espacio
  }

  const handleDesactivar = async () => {
    // TODO: Implementar la lógica para desactivar el espacio
    try {
      await fetchPut(
        urls.MODIFICAR_ESPACIO(espacio.id),
        estado.CERRADO_TEMPORALMENTE
      )

      const espacioActualizado = {
        ...espacio,
        estado: estado.CERRADO_TEMPORALMENTE
      }
      onActualizar?.(espacioActualizado)
    } catch (error) {
      console.error('Error al desactivar el evento:', error)
    }
  }

  const handleActivar = async () => {
    // TODO: Implementar la lógica para activar el espacio
    try {
      await fetchPut(urls.MODIFICAR_ESPACIO(espacio.id), estado.ACTIVO)

      const espacioActualizado = { ...espacio, estado: estado.ACTIVO }
      onActualizar?.(espacioActualizado)
    } catch (error) {
      console.error('Error al desactivar el evento:', error)
    }
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

        <div className="my-card-info">
          <span>
            <i className="bi bi-people-fill my-card-capacity" />
            {espacio.capacidad} personas
          </span>
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
          {status === estado.ACTIVO ? (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDesactivar}
            >
              Desactivar
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success"
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
