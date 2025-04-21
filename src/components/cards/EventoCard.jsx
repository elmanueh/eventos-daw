import './Card.css'

const EventoCard = ({ evento }) => {
  const status = evento.cancelado ? 'CERRADO' : 'ACTIVO'
  const descripcion = evento.descripcion.split(' ').slice(0, 60).join(' ')

  return (
    <div
      className="espacio-card"
      onClick={() => (window.location.href = `/eventos/${evento.id}`)}
    >
      <div className="card-header">
        <h3 className="card-title">{evento.nombre}</h3>
        <span className={`status-badge ${status.toLocaleLowerCase()}`}>
          {status}
        </span>
      </div>

      <p className="card-description">{descripcion}</p>

      <div className="capacity-info">
        <span>👥</span>
        <span>{evento.numPlazas} personas</span>
      </div>
    </div>
  )
}

export default EventoCard
