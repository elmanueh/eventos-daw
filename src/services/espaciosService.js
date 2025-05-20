import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const getEspacios = async () => {
  const espacios = await getEspaciosFirst()
  return espacios
}

const getEspacioById = async (id) => {
  try {
    const response = await HttpService.get(API_URLS.ESPACIOS_DETALLE(id))
    response.puntosInteres = response.puntosInteres?.sort(
      (a, b) => a.distancia - b.distancia
    )
    return [response]
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
    return espacios.flat()
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

const getEspaciosRandomSinEspacio = async (number, espacioActual) => {
  try {
    const espacios = await getEspaciosRandom(number + 1)
    return espacios
      .filter((espacio) => espacio.id !== espacioActual)
      .slice(0, number)
  } catch {
    throw new Error('Error al obtener los espacios aleatorios')
  }
}

const addEspacio = async (espacio) => {
  try {
    const response = await HttpService.post(API_URLS.ESPACIOS_CREAR, espacio)
    return await getEspacioById(response.headers.get('location').split('/').pop())
  } catch {
    throw new Error('Error al crear el espacio')
  }
}

const updateEspacio = async (id, espacio) => {
  try {
    await HttpService.patch(API_URLS.ESPACIOS_MODIFICAR(id), espacio)
    return await getEspacioById(id)
  } catch {
    throw new Error('Error al modificar el espacio')
  }
}

const updateEspacioStatus = async (id, status) => {
  try {
    await HttpService.put(API_URLS.ESPACIOS_CAMBIAR_ESTADO(id), status)
    return await getEspacioById(id)
  } catch {
    throw new Error('Error al modificar el estado del espacio')
  }
}

export const ServicioEspacios = {
  getEspacios,
  getEspacioById,
  getEspaciosByPropietario,
  getEspaciosFirst,
  getEspaciosRandom,
  getEspaciosRandomSinEspacio,
  addEspacio,
  updateEspacio,
  updateEspacioStatus
}
