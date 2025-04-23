import { fetchLoader } from '@/app/fetchLoader'
import { urls } from '@/configs/constant'
import { useEffect, useState } from 'react'
import './card.css'

export default function ReservaCard({ reserva }) {
  const [eventoNombre, setEventoNombre] = useState('')
  const status = reserva.cancelada ? 'CERRADO' : 'ACTIVO'

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const data = await fetchLoader(urls.RESERVAS_DET(reserva.id))

        const data2 = await fetchLoader(urls.EVENTOS_DET(data.evento))

        setEventoNombre(data2.nombre)
      } catch (error) {
        console.error('Error al cargar el evento de la reserva:', error)
        alert('Error al cargar el evento de la reserva.')
      }
    }

    fetchEvento()
  }, [reserva.id])

  return (
    <div className="my-card">
      <div className="my-card-header">
        <h2 title={eventoNombre}>{eventoNombre}</h2>
        <span className={`my-card-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="my-card-info">
        <span>
          <i className="bi bi-people-fill my-card-capacity" />
          {reserva.plazasReservadas} personas
        </span>
      </div>
    </div>
  )
}
