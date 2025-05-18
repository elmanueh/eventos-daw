import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const getEventos = async () => {
  const eventos = await getEventosFirst()
  return eventos
}

const getEventoById = async (id) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_DETALLE(id))
    return response
  } catch {
    throw new Error('Error al obtener el evento por ID')
  }
}

const getEventosByGestor = async (gestor) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_GESTOR(gestor))
    const eventos = await Promise.all(
      response._embedded.eventoResumenList.map((e) => getEventoById(e.id))
    )
    return eventos
  } catch {
    throw new Error('Error al obtener los eventos por gestor')
  }
}

const getEventosFirst = async (number = 2000) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_LISTAR(number))
    const eventos = await Promise.all(
      response._embedded.eventoResumenList.map((e) => getEventoById(e.id))
    )
    return eventos
  } catch {
    throw new Error('Error al obtener los eventos')
  }
}

const getEventosRandom = async (number) => {
  try {
    const eventos = await getEventosFirst()
    return eventos.sort(() => Math.random() - 0.5).slice(0, number)
  } catch {
    throw new Error('Error al obtener los eventos aleatorios')
  }
}

export const ServicioEventos = {
  getEventos,
  getEventoById,
  getEventosByGestor,
  getEventosFirst,
  getEventosRandom
}
