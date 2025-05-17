// Roles de usuario
export const AUTH_ROLES = {
  USUARIO: 'USUARIO',
  GESTOR_EVENTOS: 'GESTOR_EVENTOS',
  PROPIETARIO_ESPACIOS: 'PROPIETARIO_ESPACIOS'
}

// Rutas de navegación
export const NAV_ROUTES = {
  LOGIN: '/login',
  HOME: '/home',
  ESPACIOS_DET: (id) => `/espacios/${id}`,
  EVENTOS_DET: (id) => `/eventos/${id}`,
  MIS_ESPACIOS: '/dashboard/espacios',
  MIS_RESERVAS: '/dashboard/reservas',
  MIS_EVENTOS: '/dashboard/eventos'
}

// URL de la API
export const API_URLS = {
  AUTH_LOGIN: 'http://localhost:8080/api/auth/login',
  AUTH_LOGOUT: 'http://localhost:8080/api/auth/logout',
  AUTH_GITHUB_OAUTH: 'http://localhost:8080/api/oauth2/authorization/github',
  AUTH_GET_USER: 'http://localhost:8080/api/auth/user',

  // ----- ESPACIOS -----
  ESPACIOS_CREAR: 'http://localhost:8080/api/espaciosfisicos',
  ESPACIOS_LISTAR: 'http://localhost:8080/api/espaciosfisicos',
  ESPACIOS_DETALLE: (id) => `http://localhost:8080/api/espaciosfisicos/${id}`,
  ESPACIOS_FILTRADOS: (fechaInicio, fechaFin, capacidad) =>
    `http://localhost:8080/api/espaciosfisicos/libre?fechainicio=${fechaInicio}&fechafin=${fechaFin}&capacidad=${capacidad}`,
  ESPACIOS_CAMBIAR_ESTADO: (id) =>
    `http://localhost:8080/api/espaciosfisicos/${id}/estado`,
  ESPACIOS_PROPIETARIO: (name) =>
    `http://localhost:8080/api/espaciosfisicos/propietario/${name}`,
  ESPACIOS_MODIFICAR: (id) => `http://localhost:8080/api/espaciosfisicos/${id}`,

  // ----- EVENTOS -----
  EVENTOS_CREAR: 'http://localhost:8080/api/eventos',
  EVENTOS_LISTAR: 'http://localhost:8080/api/eventos',
  EVENTOS_DETALLE: (id) => `http://localhost:8080/api/eventos/${id}`,
  EVENTOS_CANCELAR: (id) => `http://localhost:8080/api/eventos/${id}/ocupacion`,
  EVENTOS_GESTOR: (name) => `http://localhost:8080/api/eventos/gestor/${name}`,
  EVENTOS_MODIFICAR: (id) => `http://localhost:8080/api/eventos/${id}`,

  // ----- RESERVAS -----
  RESERVAS_CREAR: 'http://localhost:8080/api/reservas',
  RESERVAS_DETALLE: (id) => `http://localhost:8080/api/reservas/${id}`,
  RESERVAS_USUARIO: (id) => `http://localhost:8080/api/reservas/usuario/${id}`,
  RESERVAS_EVENTO: (id) => `http://localhost:8080/api/reservas/evento/${id}`
}

// Tipos de tarjeta (cards)
export const TARJETA_TIPOS = {
  ESPACIOS: 'espacios',
  RESERVAS: 'reservas',
  EVENTOS: 'eventos'
}

// Estados de los espacios y eventos
export const ESTADOS = {
  ACTIVO: 'ACTIVO',
  CERRADO_TEMPORALMENTE: 'CERRADO_TEMPORALMENTE',
  CERRADO: 'CERRADO',

  EN_CURSO: 'EN CURSO',
  FINALIZADO: 'FINALIZADO',
  CANCELADO: 'CANCELADO',

  ACTIVA: 'ACTIVA',
  CANCELADA: 'CANCELADA',
  FINALIZADA: 'FINALIZADA'
}

// Categorías de eventos
export const CATEGORIA_EVENTOS = {
  ACADEMICOS: 'Academicos',
  CULTURALES: 'Culturales',
  ENTRETENIMIENTO: 'Entretenimiento',
  DEPORTES: 'Deportes',
  OTROS: 'Otros'
}

// Campos para modificar espacios
export const ESPACIO_MODIFICABLE = ['nombre', 'descripcion', 'capacidad']

// Campos para modificar eventos
export const EVENTO_MODIFICABLE = [
  'descripcion',
  'numPlazas',
  'categoria',
  'fechaInicio',
  'fechaFin',
  'espacioFisico'
]

// Número de elementos por página
export const GROUP_CARDS_SIZE = 6
export const GROUP_DETALLES_CARDS_SIZE = 5
