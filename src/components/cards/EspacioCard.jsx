import {
  API_URLS,
  ESTADOS,
  NAV_ROUTES,
  TARJETA_TIPOS
} from '@/configs/constant'
import { fetchGet } from '@/utils/fetchGet'
import {
  handleCambiarEstadoEspacio,
  handleEditEspacio
} from '@/utils/operations'
import ConfirmationModal from '@components/modals/ConfirmationModal'
import EspacioModal from '@components/modals/EspacioModal'
import MyToast, { useToast } from '@components/toast/MyToast'
import { useState } from 'react'
import './card.css'

export default function EspacioCard({ espacio, visible }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showEspacioModal, setShowEspacioModal] = useState(false)

  const [espacioDet, setEspacioDet] = useState(null)

  const status =
    espacio.estado === ESTADOS.ACTIVO ? ESTADOS.ACTIVO : ESTADOS.CERRADO

  const { addToast, toasts, removeToast } = useToast()

  return (
    <div>
      <MyToast toasts={toasts} removeToast={removeToast} />

      <EspacioModal
        show={showEspacioModal}
        callback={(modificados) =>
          handleEditEspacio(
            espacio.id,
            modificados,
            setShowEspacioModal,
            addToast
          )
        }
        onHide={() => setShowEspacioModal(false)}
        espacio={espacioDet}
      />
      <ConfirmationModal
        show={showConfirmation}
        callback={() =>
          handleCambiarEstadoEspacio(
            espacio,
            status,
            setShowConfirmation,
            addToast
          )
        }
        onHide={() => setShowConfirmation(false)}
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
            onClick={async () => {
              const data = await fetchGet(API_URLS.ESPACIOS_DETALLE(espacio.id))
              setEspacioDet(data)
              setShowEspacioModal(true)
            }}
          >
            Editar
          </button>
          {status === ESTADOS.ACTIVO ? (
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
