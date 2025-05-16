async function post(url, data) {
  try {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (data && Object.keys(data).length > 0) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const message =
        errorData.message || `Error ${response.status}: ${response.statusText}`
      throw new Error(message)
    }

    return response
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Error de conexión. Verifica tu red.')
    }
    throw new Error(error.message || 'Error de conexión o servidor')
  }
}

async function get(url) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  })

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error('No autorizado. Por favor, inicia sesión nuevamente.')
      case 403:
        throw new Error(
          'Acceso denegado. No tienes permisos para acceder a este recurso.'
        )
      case 404:
        throw new Error(
          'Recurso no encontrado. No se ha podido encontrar el recurso solicitado.'
        )
      case 500:
        throw new Error('Error interno del servidor. Inténtalo más tarde.')
      default:
        throw new Error(
          'Error desconocido. Por favor, intenta nuevamente más tarde.'
        )
    }
  }

  return response.json()
}

async function patch(url, data) {
  try {
    const options = {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (data && Object.keys(data).length > 0) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const message =
        errorData.message || `Error ${response.status}: ${response.statusText}`
      throw new Error(message)
    }

    return response
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Error de conexión. Verifica tu red.')
    }
    throw new Error(error.message || 'Error de conexión o servidor')
  }
}

async function put(url, data) {
  try {
    const options = {
      method: 'PUT',
      credentials: 'include',
      headers: {}
    }

    // Solo agregamos headers y body si data existe
    if (data && Object.keys(data).length > 0) {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.body = new URLSearchParams({ estado: data })
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const message =
        errorData.message || `Error ${response.status}: ${response.statusText}`
      throw new Error(message)
    }

    return response
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Error de conexión. Verifica tu red.')
    }
    throw new Error(error.message || 'Error de conexión o servidor')
  }
}

export const HttpService = { get, patch, post, put }
