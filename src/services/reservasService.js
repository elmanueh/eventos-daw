import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const getReservasByUsuario = async (id) => {
  const data = await HttpService.get(API_URLS.RESERVAS_USUARIO(id))
  const reservasDto = data._embedded.reservaResumenList
  const reservas = await Promise.all(
    reservasDto.map((r) => HttpService.get(API_URLS.RESERVAS_DETALLE(r.id)))
  )
  return reservas
}

export const ServicioReservas = {
  getReservasByUsuario
}
