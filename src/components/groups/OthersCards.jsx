import { TARJETA_TIPOS } from '@/configs/constant'
import EspacioCard from '@components/cards/EspacioCard'
import EventoCard from '@components/cards/EventoCard'
import { Card } from 'react-bootstrap'

export default function OthersCards({ otros, tipo }) {
  return (
    <Card className="border border-primary">
      <Card.Header as="h3" className="bg-secondary bg-opacity-25 text-primary">
        Otros {tipo}
      </Card.Header>
      <Card.Body className="border-top border-primary">
        {otros.length > 0 ? (
          otros.map((objeto) => (
            <div key={objeto.id} className="py-2">
              {(() => {
                switch (tipo) {
                  case TARJETA_TIPOS.ESPACIOS:
                    return <EspacioCard espacio={objeto} />
                  case TARJETA_TIPOS.EVENTOS:
                    return <EventoCard evento={objeto} />
                }
              })()}
            </div>
          ))
        ) : (
          <p className="text-muted">No hay otros {tipo} disponibles</p>
        )}
      </Card.Body>
    </Card>
  )
}
