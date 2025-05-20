import { ESTADOS, NAV_ROUTES, TARJETA_TIPOS } from '@/configs/constant'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EspacioModal from '@components/modals/EspacioModal'
import { useEspacioActions } from '@context/EspacioActionContext'
import { useState } from 'react'
import './card.css'

export default function EspacioCard({ espacio, actions }) {
  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const { onUpdate, onUpdateState } = useEspacioActions()
  const status =
    espacio.estado === ESTADOS.ACTIVO ? ESTADOS.ACTIVO : ESTADOS.CERRADO

  const handleEditEspacio = async (espacioData) => {
    setShowEspacioModal(false)
    onUpdate(espacio.id, espacioData)
  }

  const handleConfirmation = async () => {
    setShowConfirmationModal(false)
    const newStatus =
      espacio.estado === ESTADOS.ACTIVO
        ? ESTADOS.CERRADO_TEMPORALMENTE
        : ESTADOS.ACTIVO
    onUpdateState(espacio.id, newStatus)
  }

  return (
    <div>
      <EspacioModal
        show={showEspacioModal}
        onHide={() => setShowEspacioModal(false)}
        callback={handleEditEspacio}
        espacio={espacio}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        callback={handleConfirmation}
        title={espacio.nombre}
        status={status}
        tipo={TARJETA_TIPOS.ESPACIOS}
      />

      <div
        className="my-card"
        onClick={() =>
          (window.location.href = NAV_ROUTES.ESPACIOS_DET(espacio.id))
        }
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
      {actions && (
        <div className="my-card-buttons">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setShowEspacioModal(true)}
          >
            Editar
          </button>

          <button
            type="button"
            className={`btn btn-outline-${
              status === ESTADOS.ACTIVO ? 'danger' : 'success'
            }`}
            onClick={() => {
              setShowConfirmationModal(true)
            }}
          >
            {status === ESTADOS.ACTIVO ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      )}
    </div>
  )
}
