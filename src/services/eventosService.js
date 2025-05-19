import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const getEventos = async () => {
  const eventos = await getEventosFirst()
  return eventos
}

const getEventoById = async (id) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_DETALLE(id))
    response.espacioFisico = await HttpService.get(
      API_URLS.ESPACIOS_DETALLE(response.espacioFisico)
    )
    return response
  } catch {
    throw new Error('Error al obtener el evento por ID')
  }
}

const getEventosByGestor = async (gestor) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_GESTOR(gestor))
    return response._embedded.eventoResumenList
  } catch {
    throw new Error('Error al obtener los eventos por gestor')
  }
}

const getEventosFirst = async (number = 2000) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_LISTAR(number))
    return response._embedded.eventoResumenList
  } catch {
    throw new Error('Error al obtener los eventos')
  }
}

const getEventosRandom = async (number) => {
  try {
    const response = await getEventosFirst()
    return response.sort(() => Math.random() - 0.5).slice(0, number)
  } catch {
    throw new Error('Error al obtener los eventos aleatorios')
  }
}

const getEventosRandomSinEvento = async (number, eventoActual) => {
  try {
    const response = await getEventosRandom(number + 1)
    return response.filter((evento) => evento.id !== eventoActual).slice(0, number)
  } catch {
    throw new Error('Error al obtener los eventos aleatorios por espacio')
  }
}

const getEventosByEspacio = async (espacio) => {
  try {
    const response = await getEventosFirst()
    return response
      .filter((evento) => evento.espacioFisico === espacio)
      .filter((e) => new Date(e.fechaInicio) >= new Date())
      .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
  } catch {
    throw new Error('Error al obtener los eventos por espacio')
  }
}

export const ServicioEventos = {
  getEventos,
  getEventoById,
  getEventosByGestor,
  getEventosFirst,
  getEventosRandom,
  getEventosRandomSinEvento,
  getEventosByEspacio,
}
