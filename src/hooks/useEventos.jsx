import { EVENTOS_REDUCER } from '@/configs/constant'
import { ServicioEventos } from '@/services/eventosService'
import { AuthContext } from '@context/AuthContext'
import { useCallback, useContext, useEffect, useReducer } from 'react'

const initialState = {
  eventos: [],
  loading: true,
  error: null
}

function eventosReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, eventos: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export function useEventos(type, value = 0, value2 = 0) {
  const { user } = useContext(AuthContext)
  const [state, dispatch] = useReducer(eventosReducer, initialState)

  const fetchEventos = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })

    try {
      let eventos
      switch (type) {
        case EVENTOS_REDUCER.ALL:
          eventos = await ServicioEventos.getEventos()
          break
        case EVENTOS_REDUCER.BY_ID:
          eventos = await ServicioEventos.getEventoById(value)
          break
        case EVENTOS_REDUCER.BY_GESTOR:
          eventos = await ServicioEventos.getEventosByGestor(user.username)
          break
        case EVENTOS_REDUCER.FIRST:
          eventos = await ServicioEventos.getEventosFirst(value)
          break
        case EVENTOS_REDUCER.RANDOM:
          eventos = await ServicioEventos.getEventosRandom(value)
          break
        case EVENTOS_REDUCER.RANDOM_SIN_EVENTO:
          eventos = await ServicioEventos.getEventosRandomSinEvento(
            value,
            value2
          )
          break
        case EVENTOS_REDUCER.BY_ESPACIO:
          eventos = await ServicioEventos.getEventosByEspacio(value)
          break
        default:
          throw new Error('Tipo de eventos no válido')
      }
      dispatch({ type: 'FETCH_SUCCESS', payload: eventos })
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message })
    }
  }, [type, user?.username, value])

  useEffect(() => {
    fetchEventos()
  }, [fetchEventos])

  return {
    eventos: state.eventos,
    loading: state.loading,
    error: state.error,
    refetch: fetchEventos
  }
}
