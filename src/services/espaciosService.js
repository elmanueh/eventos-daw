import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const getEspacios = async () => {
  const espacios = await getEspaciosFirst()
  return espacios
}

const getEspacioById = async (id) => {
  try {
    const response = await HttpService.get(API_URLS.ESPACIOS_DETALLE(id))
    return response
  } catch {
    throw new Error('Error al obtener el espacio por ID')
  }
}

const getEspaciosByPropietario = async (propietario) => {
  try {
    const response = await HttpService.get(
      API_URLS.ESPACIOS_PROPIETARIO(propietario)
    )
    const espacios = await Promise.all(
      response.espacio.map((e) => getEspacioById(e.espacioDTO.id))
    )
    return espacios
  } catch {
    throw new Error('Error al obtener los espacios por propietario')
  }
}

const getEspaciosFirst = async (number = 2000) => {
  try {
    const response = await HttpService.get(API_URLS.ESPACIOS_LISTAR)
    const espacios = await Promise.all(
      response.espacio
        .slice(0, number)
        .map((e) => HttpService.get(API_URLS.ESPACIOS_DETALLE(e.espacioDTO.id)))
    )
    return espacios
  } catch {
    throw new Error('Error al obtener los espacios')
  }
}

const getEspaciosRandom = async (number) => {
  try {
    const espacios = await getEspaciosFirst()
    return espacios.sort(() => Math.random() - 0.5).slice(0, number)
  } catch {
    throw new Error('Error al obtener los espacios aleatorios')
  }
}

export const ServicioEspacios = {
  getEspacios,
  getEspacioById,
  getEspaciosByPropietario,
  getEspaciosFirst,
  getEspaciosRandom
}
