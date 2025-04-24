async function fetchData(url) {
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

export async function fetchGet(url, url2 = null) {
  const response = await fetchData(url)
  if (!url2) return response

  const response2 = await fetchData(url2)
  return [response, response2]
}
