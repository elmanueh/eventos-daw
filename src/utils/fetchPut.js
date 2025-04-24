async function fetchData(url) {
  // TODO: Implementar la lógica para obtener datos de la API
}

export async function fetchPut(url, data) {
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
      throw new Error('Error al actualizar los datos')
    }

    return response
  } catch {
    throw new Error('Error de conexión o servidor')
  }
}
