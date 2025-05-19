import { API_URLS, ESTADOS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const handleCambiarEstadoEspacio = async (
  espacio,
  status,
  setShowConfirmation,
  addToast
) => {
  const estadoNuevo =
    status === ESTADOS.ACTIVO ? ESTADOS.CERRADO_TEMPORALMENTE : ESTADOS.ACTIVO

  console.log('Cambiando estado del espacio a ', estadoNuevo)

  try {
    await HttpService.put(
      API_URLS.ESPACIOS_CAMBIAR_ESTADO(espacio.id),
      estadoNuevo
    )
    setShowConfirmation(false)
    const mensaje =
      estadoNuevo === ESTADOS.ACTIVO
        ? {
            titulo: 'Espacio activado',
            descripcion: 'El espacio ha sido activado con éxito.'
          }
        : {
            titulo: 'Espacio cerrado temporalmente',
            descripcion: 'El espacio ha sido cerrado temporalmente con éxito.'
          }

    addToast(mensaje.titulo, mensaje.descripcion, true, 'success')
  } catch (error) {
    setShowConfirmation(false)
    addToast(
      estadoNuevo === ESTADOS.ACTIVO
        ? 'Error al activar espacio'
        : 'Error al cerrar espacio',
      error.message
    )
  }
}

const handleCrearEvento = async (evento, setShowEventoModal, addToast) => {
  console.log('Creando evento...', evento)

  try {
    await HttpService.post(API_URLS.EVENTOS_CREAR, evento)
    setShowEventoModal(false)
    addToast(
      'Evento creado',
      'Tu evento se ha creado con éxito.',
      true,
      'success'
    )
  } catch (error) {
    addToast('Error al crear evento', error.message)
  }
}

const handleEditEvento = async (
  id,
  modificados,
  setShowEventoModal,
  addToast
) => {
  console.log('Editando evento...', modificados)

  try {
    await HttpService.patch(API_URLS.EVENTOS_MODIFICAR(id), modificados)
    setShowEventoModal(false)
    addToast(
      'Evento modificado',
      'Tu evento se ha modificado con éxito.',
      true,
      'success'
    )
  } catch (error) {
    addToast('Error al modificar evento', error.message)
  }
}

const handleDesactivarEvento = async (id, setShowConfirmation, addToast) => {
  console.log('Desactivando evento...')

  try {
    await HttpService.put(API_URLS.EVENTOS_CANCELAR(id))
    setShowConfirmation(false)
    addToast(
      'Evento cancelado',
      'Tu evento se ha cancelado con éxito.',
      true,
      'success'
    )
  } catch (error) {
    setShowConfirmation(false)
    addToast('Error al cancelar evento', error.message)
  }
}

const handleCrearEspacio = async () => {}

export {
  handleCambiarEstadoEspacio,
  handleCrearEspacio,
  handleCrearEvento,
  handleDesactivarEvento,
  handleEditEvento
}
