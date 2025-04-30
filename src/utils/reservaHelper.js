import { ESTADOS } from '@/configs/constant'

export function getReservaStatus(reserva) {
  const ahora = new Date()

  if (reserva.cancelada) return ESTADOS.CANCELADA

  const fechaFin = new Date(reserva.fechaFin)
  return fechaFin <= ahora ? ESTADOS.FINALIZADA : ESTADOS.ACTIVA
}
