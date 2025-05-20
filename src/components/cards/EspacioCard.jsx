import { ESTADOS, NAV_ROUTES, TARJETA_TIPOS } from '@/configs/constant'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EspacioModal from '@components/modals/EspacioModal'
import { useState } from 'react'
import './card.css'

export default function EspacioCard({ espacio, visible, action, addToast }) {
  const status =
    espacio.estado === ESTADOS.ACTIVO ? ESTADOS.ACTIVO : ESTADOS.CERRADO
  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const handleEditEspacio = async (espacioData) => {
    try {
      action.updateEspacio(espacio.id, espacioData)
      setShowEspacioModal(false)
      addToast(
        'Espacio editado',
        'El espacio ha sido editado correctamente',
        'success'
      )
    } catch {
      addToast('Error', `No se pudo editar el espacio`, 'error')
    }
  }

  const handleConfirmation = async () => {
    try {
      action.updateEspacioStatus(
        espacio.id,
        status === ESTADOS.ACTIVO
          ? ESTADOS.CERRADO_TEMPORALMENTE
          : ESTADOS.ACTIVO
      )
      setShowConfirmationModal(false)
      addToast(
        'Estado actualizado',
        `El espacio ha sido ${
          status === ESTADOS.ACTIVO ? 'desactivado' : 'activado'
        } correctamente`,
        'success'
      )
    } catch {
      addToast(
        'Error',
        `No se pudo ${
          status === ESTADOS.ACTIVO ? 'desactivar' : 'activar'
        } el espacio`,
        'error'
      )
    }
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
      {visible && (
        <div className="my-card-buttons">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setShowEspacioModal(true)}
          >
            Editar
          </button>
          {status === ESTADOS.ACTIVO ? (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                setShowConfirmationModal(true)
              }}
            >
              Desactivar
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => {
                setShowConfirmationModal(true)
              }}
            >
              Activar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
