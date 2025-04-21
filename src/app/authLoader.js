import { routes } from '@/configs/constant'
import { redirect } from 'react-router'

export async function authLoader(url, url2 = null) {
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

    if (!url2) {
      return response.json()
    }

    const response2 = await fetch(url2, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response2.ok) {
      throw new Error('Error al cargar los datos')
    }

    return [await response.json(), await response2.json()]
  } catch {
    throw new Error('Error de conexión o servidor')
  }
}
