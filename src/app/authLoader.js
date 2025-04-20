import { routes } from '@/configs/constant'
import { redirect } from 'react-router'

export async function authLoader(url) {
  const user = localStorage.getItem('user')

  if (!user) {
    return redirect(routes.LOGIN)
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Error al cargar los datos')
    }

    return response.json()
  } catch {
    throw new Error('Error de conexión o servidor')
  }
}
