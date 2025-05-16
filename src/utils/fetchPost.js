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
