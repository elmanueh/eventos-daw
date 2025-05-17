import { API_URLS } from '@/configs/constant'
import { HttpService } from '@/services/httpService'

const login = async (username, password) => {
  const response = await fetch(API_URLS.AUTH_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ usuario: username, contraseña: password }),
    credentials: 'include'
  })

  if (!response.ok) {
    const errorMessage =
      response.status === 401
        ? 'Credenciales incorrectas.'
        : 'Error en el servidor.'
    throw new Error(errorMessage)
  }

  const userData = await response.json()
  if (!userData) {
    throw new Error('Error al obtener los datos del usuario')
  }

  return {
    id: userData.idUsuario,
    username: userData.nombreUsuario,
    roles: userData.rolesUsuario.split(','),
    avatarUrl: userData.avatarUrl
  }
}

const logout = async () => {
  const response = await fetch(API_URLS.AUTH_LOGOUT, {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Error al cerrar sesión')
  }
}

const getUser = async () => {
  const user = await HttpService.get(API_URLS.AUTH_GET_USER)
  if (!user) {
    throw new Error('Error al obtener el usuario')
  }
  return {
    id: user.idUsuario,
    username: user.nombreUsuario,
    roles: user.rolesUsuario.split(','),
    avatarUrl: user.avatarUrl
  }
}

export const AuthService = {
  getUser,
  login,
  logout
}
