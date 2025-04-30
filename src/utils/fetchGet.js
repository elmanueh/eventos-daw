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
  const res1 = await fetchAllPagesIfNeeded(url)
  if (!url2) return res1

  const res2 = await fetchAllPagesIfNeeded(url2)
  return [res1, res2]
}

async function fetchAllPagesIfNeeded(url) {
  const firstResponse = await fetchData(url)

  if (!firstResponse.page) return firstResponse

  let allItems = []
  const embeddedKey = firstResponse._embedded && Object.keys(firstResponse._embedded)[0]
  const items = embeddedKey ? firstResponse._embedded[embeddedKey] : []

  allItems = allItems.concat(items)

  const totalPages = firstResponse.page.totalPages || 1

  for (let page = 1; page < totalPages; page++) {
    const pagedUrl = new URL(url)
    pagedUrl.searchParams.set('page', page)
    pagedUrl.searchParams.set('size', firstResponse.page.size || 20)

    const pageResponse = await fetchData(pagedUrl.toString())
    const moreItems = embeddedKey ? pageResponse._embedded[embeddedKey] : []
    allItems = allItems.concat(moreItems)
  }

  return {
    _embedded: {
      [embeddedKey]: allItems
    }
  }
}