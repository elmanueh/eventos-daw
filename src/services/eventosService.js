import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const createEvento = async (evento) => {
  const response = await HttpService.post(API_URLS.EVENTOS_CREAR, evento)

  if (!response.ok) {
    throw new Error('Error al crear el evento')
  }

  const data = await response.json()
  return data
}

const getEventos = async () => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_LISTAR)
    const eventos = await Promise.all(
      response._embedded.eventoResumenList.map((e) =>
        HttpService.get(API_URLS.EVENTOS_DETALLE(e.id))
      )
    )
    return eventos
  } catch {
    throw new Error('Error al obtener los eventos')
  }
}

const getEventosById = async (id) => {
  const response = await HttpService.get(API_URLS.EVENTOS_DETALLE(id))

  if (!response.ok) {
    throw new Error('Error al obtener el evento por ID' + id)
  }

  const data = await response.json()
  return data
}

const getEventosByGestor = async (gestor) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_GESTOR(gestor))
    return response._embedded.eventoResumenList
  } catch {
    throw new Error('Error al obtener los eventos por gestor')
  }
}

export const ServicioEventos = {
  createEvento,
  getEventos,
  getEventosById,
  getEventosByGestor
}
