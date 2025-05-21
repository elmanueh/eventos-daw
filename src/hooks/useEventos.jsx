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
    case 'ACTION_START':
      return { ...state, loading: true, error: null }
    case 'ACTION_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, eventos: action.payload }
    case 'ADD_SUCCESS':
      return {
        ...state,
        eventos: [...state.eventos, action.payload],
        loading: false
      }
    case 'STATUS_ESTADO':
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        eventos: state.eventos.map((evento) =>
          evento.id === action.payload.id ? action.payload : evento
        ),
        loading: false
      }
    default:
      return state
  }
}

export function useEventos(type, value = 0, value2 = 0) {
  const { user } = useContext(AuthContext)
  const [state, dispatch] = useReducer(eventosReducer, initialState)

  const fetchEventos = useCallback(async () => {
    dispatch({ type: 'ACTION_START' })

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
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
    }
  }, [type, user?.username, value])

  const addEvento = async (evento) => {
    dispatch({ type: 'ACTION_START' })
    try {
      const [nuevoEvento] = await ServicioEventos.addEvento(evento)
      dispatch({ type: 'ADD_SUCCESS', payload: nuevoEvento })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
      throw error
    }
  }

  const updateEvento = async (id, evento) => {
    dispatch({ type: 'ACTION_START' })
    try {
      const [nuevoEvento] = await ServicioEventos.updateEvento(id, evento)
      dispatch({ type: 'UPDATE_SUCCESS', payload: nuevoEvento })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
      throw error
    }
  }

  const updateEventoStatus = async (id) => {
    dispatch({ type: 'ACTION_START' })
    try {
      const [nuevoEvento] = await ServicioEventos.updateEventoStatus(id)
      dispatch({ type: 'STATUS_ESTADO', payload: nuevoEvento })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
      throw error
    }
  }

  useEffect(() => {
    fetchEventos()
  }, [fetchEventos])

  return {
    eventos: state.eventos,
    loading: state.loading,
    error: state.error,
    refetch: fetchEventos,
    addEvento,
    updateEvento,
    updateEventoStatus
  }
}
