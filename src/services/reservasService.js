import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const getReservasByIdUsuario = async (id) => {
  try {
    const response = await HttpService.get(API_URLS.RESERVAS_USUARIO(id))
    const reservas = await Promise.all(
      response._embedded.reservaResumenList.map(async (r) => {
        const reserva = await HttpService.get(API_URLS.RESERVAS_DETALLE(r.id))

        reserva.evento = await HttpService.get(API_URLS.EVENTOS_DETALLE(reserva.evento))

      if (!reserva.cancelada) {
        reserva.espacio = await HttpService.get(API_URLS.ESPACIOS_DETALLE(reserva.evento.espacioFisico))
      }

      return reserva
      })
    )
    
    return reservas
  } catch {
    throw new Error('Error al obtener las reservas por usuario')
  }
}

const getReservasByEvento = async (evento) => {
  try {
    const response = await HttpService.get(API_URLS.RESERVAS_EVENTO(evento))
    const reservas = await Promise.all(
      response._embedded.reservaResumenList.map((r) =>
        HttpService.get(API_URLS.RESERVAS_DETALLE(r.id))
      )
    )
    return reservas
  } catch {
    throw new Error('Error al obtener las reservas por evento')
  }
}

export const ServicioReservas = {
  getReservasByIdUsuario,
  getReservasByEvento
}
