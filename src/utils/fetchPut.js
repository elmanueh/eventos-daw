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
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(message);
    }

    return response
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Error de conexión. Verifica tu red.');
    }
    throw new Error(error.message || 'Error de conexión o servidor');
    
  }
}
