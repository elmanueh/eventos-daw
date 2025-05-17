import { ESTADOS, NAV_ROUTES, TARJETA_TIPOS } from '@/configs/constant'
import { getEstadoEvento } from '@/utils/eventoHelper'
import { handleDesactivarEvento, handleEditEvento } from '@/utils/operations'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EventoModal from '@components/modals/EventoModal'
import MyToast, { useToast } from '@components/toast/MyToast'
import { useState } from 'react'
import './card.css'

export default function EventoCard({ evento, visible }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showEventoModal, setShowEventoModal] = useState(false)

  const [eventoDet, setEventoDet] = useState(null)

  const status = getEstadoEvento(evento)

  const { addToast, toasts, removeToast } = useToast()

  return (
    <div>
      <MyToast toasts={toasts} removeToast={removeToast} />

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
        callback={() =>
          handleDesactivarEvento(evento.id, setShowConfirmation, addToast)
        }
        onHide={() => setShowConfirmation(false)}
        title={evento.nombre}
        status={status}
        tipo={TARJETA_TIPOS.EVENTOS}
      />
      <div
        className="my-card"
        onClick={() =>
          (window.location.href = NAV_ROUTES.EVENTOS_DET(evento.idEvento))
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

        <div className="my-card-info">
          <span className="my-card-info-truncate">
            <i className="bi bi-people-fill my-card-capacity" />
            {evento.numPlazasDisponibles} plazas disponibles
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
