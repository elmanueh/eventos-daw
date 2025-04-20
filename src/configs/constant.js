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
  RESERVAS: '/dashboard/reservas',
  EVENTOS: '/dashboard/eventos',
  ESPACIOS: '/dashboard/espacios'
}

// URL de la API
export const urls = {
  LOGIN: 'http://localhost:8080/api/auth/login',
  GITHUB: 'http://localhost:8080/api/oauth2/authorization/github',
  ESPACIOS: 'http://localhost:8080/api/espaciosfisicos',
  ESPACIOS_DET: (id) => `http://localhost:8080/api/espaciosfisicos/${id}`,
  EVENTOS: 'http://localhost:8080/api/eventos',
  EVENTOS_DET: (id) => `http://localhost:8080/api/eventos/${id}`,
  ESPACIOS_PRIVADOS: (name) =>
    `http://localhost:8080/api/espaciosfisicos/propietario/${name}`,
  EVENTOS_PRIVADOS: (name) =>
    `http://localhost:8080/api/eventos/gestor/${name}`,
  RESERVAS_PRIVADAS: (id) => `http://localhost:8080/api/reservas/usuario/${id}`
}
