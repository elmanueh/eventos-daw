import { RESERVAS_REDUCER } from '@/configs/constant'
import { ServicioReservas } from '@/services/reservasService'
import { AuthContext } from '@context/AuthContext'
import { useCallback, useContext, useEffect, useReducer } from 'react'

const initialState = {
  reservas: [],
  loading: true,
  error: null
}

function reservasReducer(state, action) {
  switch (action.type) {
    case 'ACTION_START':
      return { ...state, loading: true, error: null }
    case 'ACTION_ERROR':
      return { ...state, loading: false, reservas: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'RESERVA_SUCCESS':
      return {
        ...state,
        reservas: [...state.reservas, action.payload]
      }
    default:
      return state
  }
}

export function useReservas(type, value = 0) {
  const { user } = useContext(AuthContext)
  const [state, dispatch] = useReducer(reservasReducer, initialState)

  const fetchReservas = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })

    try {
      let reservas
      switch (type) {
        case RESERVAS_REDUCER.BY_USUARIO:
          reservas = await ServicioReservas.getReservasByIdUsuario(user.id)
          break
        case RESERVAS_REDUCER.BY_EVENTO:
          reservas = await ServicioReservas.getReservasByEvento(value)
          break
        default:
          throw new Error('Tipo de reservas no válido')
      }
      dispatch({ type: 'FETCH_SUCCESS', payload: reservas })
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message })
    }
  }, [type, user?.id, value])

  const reservar = async (reserva) => {
    dispatch({ type: 'ACTION_START' })
    try {
      const reservaCreada = await ServicioReservas.addReserva(reserva)
      dispatch({ type: 'RESERVA_SUCCESS', payload: reservaCreada })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
    }
  }

  useEffect(() => {
    fetchReservas()
  }, [fetchReservas])

  return {
    reservas: state.reservas,
    loading: state.loading,
    error: state.error,
    reservar
  }
}
