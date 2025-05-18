import { ServicioEspacios } from '@/services/espaciosService'
import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect, useState } from 'react'

export function useEspacios(isPropietario) {
  const { user } = useContext(AuthContext)
  const [espacios, setEspacios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEspacios = async () => {
    try {
      const espacios = await ServicioEspacios.getEspacios()
      setEspacios(espacios)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchEspaciosByPropietario = async () => {
    try {
      const espacios = await ServicioEspacios.getEspaciosByPropietario(
        user.username
      )
      setEspacios(espacios)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const createEspacio = async (espacio) => {
    try {
      await ServicioEspacios.createEspacio(espacio)
      setEspacios((prevEspacios) => [...prevEspacios, espacio])
    } catch (error) {
      setError(error.message)
    }
  }

  const updateEspacio = async (id, espacio) => {
    try {
      await ServicioEspacios.updateEspacio(id, espacio)
      setEspacios() // TODO: hacer
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if (isPropietario) {
      fetchEspaciosByPropietario()
    } else {
      fetchEspacios()
    }
  }, [isPropietario, user?.username])

  return {
    espacios,
    loading,
    error,
    refetch: fetchEspacios,
    createEspacio,
    updateEspacio
  }
}
