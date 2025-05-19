import { ESTADOS } from "@/configs/constant"

export function decimalToDMS(coordinate, isLongitude = false) {
  const degrees = Math.floor(coordinate)
  const minutes = Math.floor((coordinate - degrees) * 60)
  const seconds = ((coordinate - degrees - minutes / 60) * 3600).toFixed(1)

  let direction = ''

  if (isLongitude) {
    direction = coordinate < 0 ? 'W' : 'E'
  } else {
    direction = coordinate < 0 ? 'S' : 'N'
  }

  return `${Math.abs(degrees)}°${Math.abs(minutes)}'${Math.abs(
    seconds
  )}"${direction}`
}

export function isMio(espacio, user) {
  return espacio.propietario === user.username
}

export function statusEspacio(espacio) {
  return espacio.estado === ESTADOS.ACTIVO ? ESTADOS.ACTIVO : ESTADOS.CERRADO
}

export function obtenerEspaciosActivos(espacios) {
  return espacios.filter((e) => e.estado === ESTADOS.ACTIVO)
}

export function obtenerEspaciosCerrados(espacios) {
  return espacios.filter((e) => e.estado === ESTADOS.CERRADO_TEMPORALMENTE)
}