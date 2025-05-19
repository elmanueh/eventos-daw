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
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
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

  const reservar = useCallback(
    async (reserva, setShowReservaModal, addToast) => {
      try {
        await ServicioReservas.addReserva(reserva)
        setShowReservaModal(false)
        addToast(
          'Reserva realizada',
          'Tu reserva se ha realizado correctamente.',
          true,
          'success'
        )
        dispatch({ type: 'RESERVA_SUCCESS', payload: reserva })
      } catch (error) {
        addToast('Error al reservar', error.message)
      }
    },
    []
  )

  useEffect(() => {
    fetchReservas()
  }, [fetchReservas])

  return {
    reservas: state.reservas,
    loading: state.loading,
    error: state.error,
    refetch: fetchReservas,
    reservar
  }
}
