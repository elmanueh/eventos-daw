import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const EventoCard = ({ evento }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/eventos/${evento.id}`)
  }

  return (
    <Card
      key={evento.id}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontSize: '1.2rem' }}>
          {evento.nombre.length > 20
            ? evento.nombre.substring(0, 20) + '...'
            : evento.nombre}
        </Card.Title>

        <Card.Text className="text-muted fs-6">
          {evento.descripcion.length > 60
            ? evento.descripcion.substring(0, 60) + '...'
            : evento.descripcion}
        </Card.Text>

        {evento.cancelado ? (
          <span
            className="badge bg-danger mb-2"
            style={{
              fontSize: '0.85rem',
              padding: '0.2rem 0.6rem',
              textTransform: 'uppercase'
            }}
          >
            Cancelado
          </span>
        ) : (
          <span
            className="badge bg-success mb-2"
            style={{
              fontSize: '0.85rem',
              padding: '0.2rem 0.6rem',
              textTransform: 'uppercase'
            }}
          >
            Activo
          </span>
        )}

        <div className="small text-muted" style={{ marginTop: '1rem' }}>
          <div>
            <span>📍</span>
            <span className="ms-3">{evento.ocupacion.espacioFisico}</span>
          </div>
          <div>
            <span>📅</span>
            <span className="ms-2">Fecha: {evento.ocupacion.fechaInicio}</span>
          </div>
          <div>
            <span>👥</span>
            <span className="ms-2">Plazas: {evento.numPlazas}</span>
          </div>
          <div>
            <span>🏷️</span>
            <span className="ms-2">Categoría: {evento.categoria}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default EventoCard
