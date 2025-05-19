import { ESTADOS } from '@/configs/constant'

export function statusEvento(evento) {
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
    case ESTADOS.CANCELADO:
      return 'danger'
  }
}

export const obtenerEventosEnCurso = (eventos) => {
  return eventos.filter((e) => {
    const inicio = new Date(e.fechaInicio);
    const fin = new Date(e.fechaFin);
    return !e.cancelado && inicio <= new Date() && new Date() <= fin;
  });
};

export const obtenerEventosFinalizados = (eventos) => {
  return eventos.filter((e) => {
    const fin = new Date(e.fechaFin);
    return !e.cancelado && fin < new Date();
  });
};

export const obtenerEventosActivos = (eventos) => {
  return eventos.filter((e) => {
    const inicio = new Date(e.fechaInicio);
    return !e.cancelado && inicio > new Date();
  });
};

export const obtenerEventosCancelados = (eventos) => {
  return eventos.filter((e) => e.cancelado);
};

export const esEventoMio = (evento, usuario) => {
  return evento.gestor === usuario._id;
};