import { estado, routes } from '@/configs/constant'
import {
  handleCambiarEstadoEspacio,
  handleEditEspacio
} from '@/utils/operations'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import { useState } from 'react'
import './card.css'

export default function EspacioCard({ espacio, visible }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const status =
    espacio.estado === estado.ACTIVO ? estado.ACTIVO : estado.CERRADO

  return (
    <div>
      <ConfirmationModal
        show={showConfirmation}
        callback={() =>
          handleCambiarEstadoEspacio(espacio, status, setShowConfirmation)
        }
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
            onClick={handleEditEspacio}
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
