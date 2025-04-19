import { Card } from "react-bootstrap"
import { useNavigate } from "react-router"

const EspacioCard = ({ espacio }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/espacios/${espacio.id}`)
  }

  return (
    <Card
      className="h-100 shadow-sm rounded-4"
      style={{
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"
        e.currentTarget.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.1)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontSize: "1.2rem" }}>
          {espacio.nombre.length > 20
            ? espacio.nombre.substring(0, 20) + "..."
            : espacio.nombre}
        </Card.Title>

        <Card.Text className="text-muted fs-6">
          {espacio.descripcion.length > 60
            ? espacio.descripcion.substring(0, 60) + "..."
            : espacio.descripcion}
        </Card.Text>

        {espacio.estado && (
          <span
            className={`badge ${
              espacio.estado === "ACTIVO" ? "bg-success" : "bg-secondary"
            } mb-2`}
            style={{
              fontSize: "0.85rem",
              padding: "0.2rem 0.6rem",
              textTransform: "uppercase"
            }}
          >
            {espacio.estado}
          </span>
        )}

        <div className="small text-muted" style={{ marginTop: "1rem" }}>
          <div>
            <span>📍</span>
            <span className="ms-3">{espacio.direccion}</span>
          </div>
          <div>
            <span>👥</span>
            <span className="ms-2">Capacidad: {espacio.capacidad}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default EspacioCard
