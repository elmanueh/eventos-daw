import { ESPACIOS_REDUCER } from '@/configs/constant'
import { ServicioEspacios } from '@/services/espaciosService'
import { AuthContext } from '@context/AuthContext'
import { useCallback, useContext, useEffect, useReducer } from 'react'

const initialState = {
  espacios: [],
  loading: true,
  error: null
}

function espaciosReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, espacios: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export function useEspacios(type, value = 0) {
  const { user } = useContext(AuthContext)
  const [state, dispatch] = useReducer(espaciosReducer, initialState)

  const fetchEspacios = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })

    try {
      let espacios
      switch (type) {
        case ESPACIOS_REDUCER.ALL:
          espacios = await ServicioEspacios.getEspacios()
          break
        case ESPACIOS_REDUCER.BY_ID:
          espacios = await ServicioEspacios.getEspacioById(value)
          espacios.puntosInteres = espacios.puntosInteres.sort(
            (a, b) => a.distancia - b.distancia
          )
          break

        case ESPACIOS_REDUCER.BY_PROPIETARIO:
          espacios = await ServicioEspacios.getEspaciosByPropietario(
            user.username
          )
          break
        case ESPACIOS_REDUCER.FIRST:
          espacios = await ServicioEspacios.getEspaciosFirst(value)
          break
        case ESPACIOS_REDUCER.RANDOM:
          espacios = await ServicioEspacios.getEspaciosRandom(value)
          break
        default:
          throw new Error('Tipo de espacios no válido')
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: espacios })
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message })
    }
  }, [type, user?.username, value])

  useEffect(() => {
    fetchEspacios()
  }, [fetchEspacios])

  return {
    espacios: state.espacios,
    loading: state.loading,
    error: state.error,
    refetch: fetchEspacios
  }
}
