import { API_URLS, ESTADOS } from '@/configs/constant'
import { fetchPatch } from '@/utils/fetchPatch'
import { fetchPost } from '@/utils/fetchPost'
import { fetchPut } from '@/utils/fetchPut'

export const handleCrearEspacio = async (espacio, setShowEspacioModal) => {
  console.log('Creando espacio...')

  try {
    await fetchPost(API_URLS.ESPACIOS_CREAR, espacio)
    setShowEspacioModal(false)
    window.location.reload()
  } catch (error) {
    console.error('Error al crear el espacio:', error)
  }
}

export const handleEditEspacio = async (id, modificados, setShowEspacioModal) => {
  console.log('Editando espacio...', modificados)

  try {
    await fetchPatch(API_URLS.ESPACIOS_MODIFICAR(id), modificados)
    setShowEspacioModal(false)
    window.location.reload()
  } catch (error) {
    console.error('Error al crear el espacio:', error)
  }
}

export const handleCambiarEstadoEspacio = async (
  espacio,
  status,
  setShowConfirmation
) => {
  const estadoNuevo =
    status === ESTADOS.ACTIVO ? ESTADOS.CERRADO_TEMPORALMENTE : ESTADOS.ACTIVO

  console.log('Cambiando estado del espacio a', estadoNuevo)

  try {
    await fetchPut(API_URLS.ESPACIOS_CAMBIAR_ESTADO(espacio.id), estadoNuevo)
    setShowConfirmation(false)
    window.location.reload()
  } catch (error) {
    console.error('Error al desactivar el evento:', error)
  }
}

export const handleCrearEvento = async (evento, setShowEventoModal) => {
  console.log('Creando evento...', evento)

  try {
    await fetchPost(API_URLS.EVENTOS_CREAR, evento)
    setShowEventoModal(false)
    window.location.reload()
  } catch (error) {
    console.error('Error al crear el evento:', error)
  }
}

export const handleEditEvento = async () => {
  // TODO: Implementar la lógica para editar el evento
  console.log('Editando evento...')
}

export const handleDesactivarEvento = async (id, setShowConfirmation) => {
  console.log('Desactivando evento...')
  try {
    await fetchPut(API_URLS.EVENTOS_CANCELAR(id))
    setShowConfirmation(false)
    window.location.reload()
  } catch (error) {
    console.error('Error al desactivar el evento:', error)
  }
}

export const handleResevar = async (reserva, setShowReservaModal) => {
  console.log('Reservando...')

  try {
    await fetchPost(API_URLS.RESERVAS_CREAR, reserva)
    setShowReservaModal(false)
    window.location.reload()
  } catch (error) {
    console.error('Error al reservar:', error)
  }
}
