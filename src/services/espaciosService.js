import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const createEspacio = async (espacio) => {
  const response = await HttpService.post(API_URLS.ESPACIOS_CREAR, espacio)
  if (!response.ok) {
    throw new Error('Error al crear el espacio')
  }
  const data = await response.json()
  return data
}

const getEspacios = async () => {
  try {
    const response = await HttpService.get(API_URLS.ESPACIOS_LISTAR)
    const espacios = await Promise.all(
      response.espacio.map((e) =>
        HttpService.get(API_URLS.ESPACIOS_DETALLE(e.espacioDTO.id))
      )
    )
    return espacios
  } catch {
    throw new Error('Error al obtener los espacios')
  }
}

const getEspaciosById = async (id) => {
  const response = await HttpService.get(API_URLS.ESPACIOS_DETALLE(id))
  if (!response.ok) {
    throw new Error('Error al obtener el espacio por ID' + id)
  }
  const data = await response.json()
  return data
}

const updateEspacio = async (id, espacio) => {
  const response = await HttpService.put(
    API_URLS.ESPACIOS_MODIFICAR(id),
    espacio
  )
  if (!response.ok) {
    throw new Error('Error al actualizar el espacio')
  }
  const data = await response.json()
  return data
}

export const ServicioEspacios = {
  createEspacio,
  getEspacios,
  getEspaciosById,
  updateEspacio
}
