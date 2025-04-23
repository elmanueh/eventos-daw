// Roles de usuario
export const roles = {
  USUARIO: 'USUARIO',
  GESTOR_EVENTOS: 'GESTOR_EVENTOS',
  PROPIETARIO_ESPACIOS: 'PROPIETARIO_ESPACIOS'
}

// Rutas de navegación
export const routes = {
  LOGIN: '/login',
  HOME: '/home',
  ESPACIOS: (id) => `/espacios/${id}`,
  EVENTOS: (id) => `/eventos/${id}`,
  MIS_ESPACIOS: '/dashboard/espacios',
  MIS_RESERVAS: '/dashboard/reservas',
  MIS_EVENTOS: '/dashboard/eventos'
}

// URL de la API
export const urls = {
  LOGIN: 'http://localhost:8080/api/auth/login',
  LOGOUT: 'http://localhost:8080/api/auth/logout',
  GITHUB: 'http://localhost:8080/api/oauth2/authorization/github',
  ESPACIOS: 'http://localhost:8080/api/espaciosfisicos',
  ESPACIOS_FILTRADOS: (fechaInicio, fechaFin, capacidad) =>
    `http://localhost:8080/api/espaciosfisicos/libre?fechainicio=${fechaInicio}&fechafin=${fechaFin}&capacidad=${capacidad}`,
  ESPACIOS_DET: (id) => `http://localhost:8080/api/espaciosfisicos/${id}`,
  MODIFICAR_ESPACIO: (id) => `http://localhost:8080/api/espaciosfisicos/${id}/estado`,
  EVENTOS: 'http://localhost:8080/api/eventos',
  EVENTOS_DET: (id) => `http://localhost:8080/api/eventos/${id}`,
  EVENTOS_FILTRADOS: (mes, ano) =>
    `http://localhost:8080/api/eventos?mes=${mes}&año=${ano}`,
  ESPACIOS_PRIVADOS: (name) =>
    `http://localhost:8080/api/espaciosfisicos/propietario/${name}`,
  EVENTOS_PRIVADOS: (name) =>
    `http://localhost:8080/api/eventos/gestor/${name}`,
  CANCELAR_EVENTO: (id) =>
    `http://localhost:8080/api/eventos/${id}/ocupacion`,
  RESERVAS_PRIVADAS: (id) => `http://localhost:8080/api/reservas/usuario/${id}`,
  RESERVAS_DET: (id) => `http://localhost:8080/api/reservas/${id}`,
}

// Tipos de tarjeta (cards)
export const tipoTarjeta = {
  ESPACIOS: 'espacios',
  RESERVAS: 'reservas',
  EVENTOS: 'eventos'
}

// Estados de los espacios y eventos
export const estado = {
  ACTIVO: 'ACTIVO',
  CERRADO_TEMPORALMENTE: 'CERRADO_TEMPORALMENTE',
  CERRADO: 'CERRADO'  
}