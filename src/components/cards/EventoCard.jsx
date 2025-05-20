import { ESTADOS, NAV_ROUTES, TARJETA_TIPOS } from '@/configs/constant'
import { statusEvento } from '@/utils/eventoHelper'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EventoModal from '@components/modals/EventoModal'
import { useEventoActions } from '@context/EventoActionContext'
import { useState } from 'react'
import './card.css'

export default function EventoCard({ evento, actions }) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showEventoModal, setShowEventoModal] = useState(false)
  const { onUpdate, onUpdateState } = useEventoActions()
  const status = statusEvento(evento)

  const handleEditEvento = async (eventoData) => {
    setShowEventoModal(false)
    onUpdate(evento.id, eventoData)
  }

  const handleConfirmation = async () => {
    setShowConfirmationModal(false)
    onUpdateState(evento.id)
  }

  return (
    <div>
      <EventoModal
        show={showEventoModal}
        onHide={() => setShowEventoModal(false)}
        callback={handleEditEvento}
        evento={evento}
        espacio={evento.espacioFisico}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        callback={handleConfirmation}
        title={evento.nombre}
        status={status}
        tipo={TARJETA_TIPOS.EVENTOS}
      />
      <div
        className="my-card"
        onClick={() =>
          (window.location.href = NAV_ROUTES.EVENTOS_DET(evento.id))
        }
      >
        <div className="my-card-header">
          <h2 title={evento.nombre}>{evento.nombre}</h2>
          <span
            className={`my-card-status ${status
              .toLowerCase()
              .replace(' ', '-')}`}
          >
            {status}
          </span>
        </div>

        <p className="my-card-description">{evento.descripcion}</p>

        {!evento.cancelado ? (
          <div className="my-card-info">
            <span className="my-card-info-truncate">
              <i className="bi bi-people-fill my-card-capacity" />
              {evento.numPlazasDisponibles} plazas disponibles
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
        ) : (
          <div className="my-card-info">
            <span className="my-card-info-truncate">
              <i className="bi bi-people-fill my-card-capacity" />
              {evento.numPlazas} plazas
            </span>
          </div>
        )}
      </div>
      {actions && status == ESTADOS.ACTIVO && (
        <div className="my-card-buttons">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setShowEventoModal(true)}
          >
            Editar
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setShowConfirmationModal(true)}
          >
            Desactivar
          </button>
        </div>
      )}
    </div>
  )
}
