import { API_URLS, ESTADOS } from '@/configs/constant'
import { fetchPut } from '@/utils/fetchPut'

export const handleCrearEspacio = async () => {
  // TODO: Implementar la lógica para crear un espacio
  console.log('Creando espacio...')
}

export const handleEditEspacio = async () => {
  // TODO: Implementar la lógica para editar el espacio
  console.log('Editando espacio...')
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

export const handleCrearEvento = async () => {
  // TODO: Implementar la lógica para crear un evento
  console.log('Creando evento...')
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

export const handleResevar = async () => {
  // TODO: Implementar la lógica para reservar
  console.log('Reservando...')
}
