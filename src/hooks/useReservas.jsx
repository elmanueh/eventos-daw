import { ServicioReservas } from '@/services/reservasService'
import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useState } from 'react'

export function useReservas() {
  const { user } = useContext(AuthContext)
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchReservas = async () => {
    try {
      const reservas = await ServicioReservas.getReservasByUsuario(user.id)
      setReservas(reservas)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReservas()
  }, [])

  return {
    reservas,
    loading,
    error,
    refetch: fetchReservas
  }
}
