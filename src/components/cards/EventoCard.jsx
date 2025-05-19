import { ESTADOS, NAV_ROUTES, TARJETA_TIPOS } from '@/configs/constant'
import { statusEvento } from '@/utils/eventoHelper'
import { handleEditEvento } from '@/utils/operations'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EventoModal from '@components/modals/EventoModal'
import { useState } from 'react'
import './card.css'

export default function EventoCard({ evento, visible, action, addToast }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showEventoModal, setShowEventoModal] = useState(false)

  const [eventoDet, setEventoDet] = useState(null)

  const status = statusEvento(evento)

  return (
    <div>
      <EventoModal
        show={showEventoModal}
        callback={(modificados) =>
          handleEditEvento(evento.id, modificados, setShowEventoModal, addToast)
        }
        onHide={() => setShowEventoModal(false)}
        evento={eventoDet}
      />
      <ConfirmationModal
        show={showConfirmation}
        callback={() => {
          action.toggleEstado(evento.id, setShowConfirmation, addToast)
        }}
        onHide={() => setShowConfirmation(false)}
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
      {visible && status == ESTADOS.ACTIVO && (
        <div className="my-card-buttons">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={async () => {
              setEventoDet(evento)
              setShowEventoModal(true)
            }}
          >
            Editar
          </button>
          {!evento.cancelado && (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => setShowConfirmation(true)}
            >
              Desactivar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
