export async function fetchLoader(url, url2 = null) {
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
    // TODO: Manejar el error de manera adecuada
    throw new Error('Error de conexión o servidor')
  }
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
