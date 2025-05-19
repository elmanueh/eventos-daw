import { ESTADOS, NAV_ROUTES } from '@/configs/constant'
import './card.css'

export default function EspacioCard({ espacio, visible }) {
  const status =
    espacio.estado === ESTADOS.ACTIVO ? ESTADOS.ACTIVO : ESTADOS.CERRADO

  return (
    <div>
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
          <button type="button" className="btn btn-outline-primary">
            Editar
          </button>
          {status === ESTADOS.ACTIVO ? (
            <button type="button" className="btn btn-outline-danger">
              Desactivar
            </button>
          ) : (
            <button type="button" className="btn btn-outline-success">
              Activar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
