import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const getReservasByUsuario = async (username) => {
  const data = await HttpService.get(API_URLS.RESERVAS_USUARIO(username))
  const reservasDto = data._embedded.reservaResumenList
  const reservas = await Promise.all(
    reservasDto.map((r) => HttpService.get(API_URLS.RESERVAS_DETALLE(r.id)))
  )
  return reservas
}

const getReservasByEvento = async (evento) => {
  const data = await HttpService.get(API_URLS.RESERVAS_EVENTO(evento))
  return data._embedded.reservaResumenList
}

export const ServicioReservas = {
  getReservasByUsuario,
  getReservasByEvento
}
