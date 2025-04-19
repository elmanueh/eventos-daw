import { Card } from 'react-bootstrap'

const ReservaCard = ({ reserva }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ fontSize: '1.2rem' }}>
          {reserva.evento.nombre.length > 20
            ? reserva.evento.nombre.substring(0, 20) + '...'
            : reserva.evento.nombre}
        </Card.Title>

        <Card.Text className="text-muted fs-6 mb-2">
          {reserva.cancelada ? (
            <span
              className="badge bg-danger"
              style={{
                fontSize: '0.85rem',
                padding: '0.2rem 0.6rem',
                textTransform: 'uppercase'
              }}
            >
              Cancelada
            </span>
          ) : (
            <span
              className="badge bg-success"
              style={{
                fontSize: '0.85rem',
                padding: '0.2rem 0.6rem',
                textTransform: 'uppercase'
              }}
            >
              Activa
            </span>
          )}
        </Card.Text>

        <div className="small text-muted">
          <div>
            <span>👥</span>
            <span className="ms-2">Plazas: {reserva.plazasReservadas}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ReservaCard
