import './Card.css'

function EspacioCard({ espacio }) {
  const status = espacio.estado === 'ACTIVO' ? 'ACTIVO' : 'CERRADO'
  const descripcion = espacio.descripcion.split(' ').slice(0, 60).join(' ')

  return (
    <div
      className="espacio-card"
      onClick={() => (window.location.href = `/espacios/${espacio.id}`)}
    >
      <div className="card-header">
        <h3 className="card-title">{espacio.nombre}</h3>
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      </div>

      <p className="card-description">{descripcion}</p>

      <div className="capacity-info">
        <span>👥</span>
        <span>{espacio.capacidad} personas</span>
      </div>
    </div>
  )
}

export default EspacioCard
