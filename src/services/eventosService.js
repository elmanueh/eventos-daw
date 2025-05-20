import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const getEventos = async () => {
  const eventos = await getEventosFirst()
  return eventos
}

const getEventoById = async (id) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_DETALLE(id))
    if (!response.cancelado) {
      response.espacioFisico = await HttpService.get(
        API_URLS.ESPACIOS_DETALLE(response.espacioFisico)
      )
    }
    return [response]
  } catch {
    throw new Error('Error al obtener el evento por ID')
  }
}

const getEventosByGestor = async (gestor) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_GESTOR(gestor))
    const eventos = await Promise.all(
      response._embedded.eventoResumenList.map((e) =>
        getEventoById(e.id)
      )
    )
    return eventos.flat()
  } catch {
    throw new Error('Error al obtener los eventos por gestor')
  }
}

const getEventosFirst = async (number = 2000) => {
  try {
    const response = await HttpService.get(API_URLS.EVENTOS_LISTAR(number))
    const eventos = await Promise.all(
      response._embedded.eventoResumenList.map((e) =>
        getEventoById(e.id)
      )
    )
    return eventos.flat()
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
    return  eventos
      .filter((evento) => evento.espacioFisico === espacio)
      .filter((e) => new Date(e.fechaInicio) >= new Date())
      .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
  } catch {
    throw new Error('Error al obtener los eventos por espacio')
  }
}

const addEvento = async (evento) => {
  try {
    const response = await HttpService.post(API_URLS.EVENTOS_CREAR, evento)
    return await getEventoById(response.headers.get('location').split('/').pop())
  } catch {
    throw new Error('Error al crear el evento')
  }
}

const updateEvento = async (id, evento) => {
  try {
    await HttpService.patch(
      API_URLS.EVENTOS_MODIFICAR(id),
      evento
    )
    return await getEventoById(id)
  } catch {
    throw new Error('Error al actualizar el evento')
  }
}

const updateEventoStatus = async (id) => {
  try {
    await HttpService.put(API_URLS.EVENTOS_CANCELAR(id))
    return await getEventoById(id)
  } catch {
    throw new Error('Error al cancelar el evento')
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
  addEvento,
  updateEvento,
  updateEventoStatus,
}
