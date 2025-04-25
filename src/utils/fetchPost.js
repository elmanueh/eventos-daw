export async function fetchPost(url, data) {
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
      throw new Error('Error al enviar los datos')
    }

    return response
  } catch {
    throw new Error('Error de conexión o servidor')
  }
}
