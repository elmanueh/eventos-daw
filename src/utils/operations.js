import { estado, urls } from "@/configs/constant";
import { fetchPut } from "@/utils/fetchPut";

export const handleEditEspacio = async () => {
  // TODO: Implementar la lógica para editar el espacio
  console.log('Editando espacio...');
}

export const handleCambiarEstadoEspacio = async (espacio, status, setShowConfirmation) => {
  const estadoNuevo = 
    status === estado.ACTIVO ? estado.CERRADO_TEMPORALMENTE : estado.ACTIVO

  console.log('Cambiando estado del espacio a', estadoNuevo)

  try {
    await fetchPut(urls.MODIFICAR_ESTADO_ESPACIO(espacio.id), estadoNuevo)
    setShowConfirmation(false)
  } catch (error) {
    console.error('Error al desactivar el evento:', error)
  }
}

export const handleEditEvento = async () => {
  // TODO: Implementar la lógica para editar el evento
  console.log('Editando evento...')
}

export const handleDesactivarEvento = async (id, setShowConfirmation) => {
  console.log('Desactivando evento...')
  try {
      await fetchPut(urls.CANCELAR_EVENTO(id))
      setShowConfirmation(false)
    } catch (error) {
      console.error('Error al desactivar el evento:', error)
    }
}