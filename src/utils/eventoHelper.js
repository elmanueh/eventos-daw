import { ESTADOS } from '@/configs/constant'

export function getEstadoEvento(evento) {
  const ahora = new Date()

  if (evento.cancelado) return ESTADOS.CANCELADO

  const inicio = new Date(evento.fechaInicio)
  const fin = new Date(evento.fechaFin)

  if (ahora < inicio) return ESTADOS.ACTIVO
  if (ahora >= inicio && ahora <= fin) return ESTADOS.EN_CURSO
  return ESTADOS.FINALIZADO
}

export function getEstadoColor(estado) {
  switch (estado) {
    case ESTADOS.EN_CURSO:
      return 'primary'
    case ESTADOS.ACTIVO:
      return 'success'
    case ESTADOS.FINALIZADO:
      return 'secondary'
    case ESTADOS.FINALIZADO:
      return 'danger'
  }
}