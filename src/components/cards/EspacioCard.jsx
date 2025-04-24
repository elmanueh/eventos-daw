import { estado, routes, urls } from '@/configs/constant'
import { fetchPut } from '@/utils/fetchPut'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import { useState } from 'react'
import './card.css'

export default function EspacioCard({ espacio, visible }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const status =
    espacio.estado === estado.ACTIVO ? estado.ACTIVO : estado.CERRADO

  const handleEdit = async () => {
    // TODO: Implementar la lógica para editar el espacio
  }

  const handleEstado = async () => {
    const estadoNuevo =
      status === estado.ACTIVO ? estado.CERRADO_TEMPORALMENTE : estado.ACTIVO

    try {
      await fetchPut(urls.MODIFICAR_ESTADO_ESPACIO(espacio.id), estadoNuevo)
      setShowConfirmation(false)
    } catch (error) {
      console.error('Error al desactivar el evento:', error)
    }
  }

  return (
    <div>
      <ConfirmationModal
        show={showConfirmation}
        callback={handleEstado}
        onHide={() => setShowConfirmation(false)}
        title={espacio.nombre}
        status={status}
      />
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
              onClick={() => setShowConfirmation(true)}
            >
              Desactivar
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => setShowConfirmation(true)}
            >
              Activar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
