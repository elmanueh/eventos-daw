import { ServicioEventos } from '@/services/eventosService'
import { useEffect, useState } from 'react'

export function useEventos(username) {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEventos = async () => {
    try {
      const eventos = await ServicioEventos.getEventos()
      setEventos(eventos)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchEventosByGestor = async () => {
    try {
      const eventos = await ServicioEventos.getEventosByGestor(username)
      setEventos(eventos)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const createEvento = async (evento) => {
    try {
      await ServicioEventos.createEvento(evento)
      setEventos((prevEventos) => [...prevEventos, evento])
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if (username) {
      fetchEventosByGestor()
    } else {
      fetchEventos()
    }
  }, [])

  return {
    eventos,
    loading,
    error,
    refetch: fetchEventos,
    createEvento
  }
}
