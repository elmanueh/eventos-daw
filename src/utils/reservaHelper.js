import { ESTADOS } from '@/configs/constant'

export function getReservaStatus(reserva) {
  const ahora = new Date()

  if (reserva.cancelada) return ESTADOS.CANCELADA

  const fechaFin = new Date(reserva.fechaFin)
  return fechaFin <= ahora ? ESTADOS.FINALIZADA : ESTADOS.ACTIVA
}

export const obtenerReservasActivas = (reservas) => {
  return reservas.filter((r) => {
    const fechaFin = new Date(r.evento.fechaFin);
    return !r.cancelada && fechaFin >= new Date();
  });
};

export const obtenerReservasCanceladas = (reservas) => {
  return reservas.filter((r) => r.cancelada);
};

export const obtenerReservasFinalizadas = (reservas) => {
  return reservas.filter((r) => {
    const fechaFin = new Date(r.evento.fechaFin);
    return !r.cancelada && fechaFin < new Date();
  });
};

export const obtenerReservaReciente = (reservas) => {
  return reservas
    .filter((r) => !r.cancelada)
    .sort((a, b) => new Date(a.evento.fechaInicio) - new Date(b.evento.fechaInicio))[0];
};