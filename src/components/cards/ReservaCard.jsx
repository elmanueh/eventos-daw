import './card.css'

export default function ReservaCard({ reserva }) {
  const status = reserva.cancelada ? 'CERRADO' : 'ACTIVO'

  console.log(reserva)
  return (
    <div className="my-card">
      <div className="my-card-header">
        <h2 title="Nombre">Nombre</h2>
        <span className={`my-card-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="my-card-capacity">
        <span>
          <i className="bi bi-people-fill" /> {reserva.plazasReservadas}{' '}
          personas
        </span>
      </div>
    </div>
  )
}
