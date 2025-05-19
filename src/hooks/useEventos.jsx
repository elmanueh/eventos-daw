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

export function useEventos(type, value = 0, value2) {
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
          const cantidad = value2 ? value + 1 : value
          eventos = await ServicioEventos.getEventosRandom(value)
          value2 && (eventos = eventos.filter((evento) => evento.id !== value2))
          eventos = eventos.slice(0, value)
          break
        case EVENTOS_REDUCER.BY_ESPACIO:
          eventos = await ServicioEventos.getEventos()
          eventos = eventos
            .filter((evento) => evento.espacioFisico === value)
            .filter((e) => new Date(e.fechaInicio) >= new Date())
            .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
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
