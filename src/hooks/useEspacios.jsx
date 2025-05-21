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
    case 'ACTION_START':
      return { ...state, loading: true, error: null }
    case 'ACTION_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, espacios: action.payload }
    case 'ADD_SUCCESS':
      return {
        ...state,
        espacios: [...state.espacios, action.payload],
        loading: false
      }
    case 'UPDATE_SUCCESS':
    case 'STATUS_SUCCESS':
      return {
        ...state,
        espacios: state.espacios.map((espacio) =>
          espacio.id === action.payload.id ? action.payload : espacio
        ),
        loading: false
      }
    default:
      return state
  }
}

export function useEspacios(type, value = 0, value2 = 0) {
  const { user, logout } = useContext(AuthContext)

  const [state, dispatch] = useReducer(espaciosReducer, initialState)

  const fetchEspacios = useCallback(async () => {
    dispatch({ type: 'ACTION_START' })

    try {
      let espacios
      switch (type) {
        case ESPACIOS_REDUCER.ALL:
          espacios = await ServicioEspacios.getEspacios()
          break
        case ESPACIOS_REDUCER.BY_ID:
          espacios = await ServicioEspacios.getEspacioById(value)
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
        case ESPACIOS_REDUCER.RANDOM_SIN_ESPACIO:
          espacios = await ServicioEspacios.getEspaciosRandomSinEspacio(
            value,
            value2
          )
          break
        default:
          throw new Error('Tipo de espacios no válido')
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: espacios })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
      if (
        error.message === 'No autorizado. Por favor, inicia sesión nuevamente.'
      ) {
        return logout()
      }
    }
  }, [type, user?.username, value, value2])

  const addEspacio = async (espacio) => {
    dispatch({ type: 'ACTION_START' })
    try {
      const [nuevoEspacio] = await ServicioEspacios.addEspacio(espacio)
      dispatch({ type: 'ADD_SUCCESS', payload: nuevoEspacio })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
      if (
        error.message === 'No autorizado. Por favor, inicia sesión nuevamente.'
      ) {
        return logout()
      }
      throw error
    }
  }

  const updateEspacio = async (id, espacio) => {
    dispatch({ type: 'ACTION_START' })
    try {
      const [nuevoEspacio] = await ServicioEspacios.updateEspacio(id, espacio)
      dispatch({ type: 'UPDATE_SUCCESS', payload: nuevoEspacio })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
      if (
        error.message === 'No autorizado. Por favor, inicia sesión nuevamente.'
      ) {
        return logout()
      }
      throw error
    }
  }

  const updateEspacioStatus = async (id, status) => {
    dispatch({ type: 'ACTION_START' })
    try {
      const [nuevoEspacio] = await ServicioEspacios.updateEspacioStatus(
        id,
        status
      )
      dispatch({ type: 'STATUS_SUCCESS', payload: nuevoEspacio })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
      if (
        error.message === 'No autorizado. Por favor, inicia sesión nuevamente.'
      ) {
        return logout()
      }
      throw error
    }
  }

  useEffect(() => {
    fetchEspacios()
  }, [fetchEspacios])

  return {
    espacios: state.espacios,
    loading: state.loading,
    error: state.error,
    addEspacio,
    updateEspacio,
    updateEspacioStatus
  }
}
