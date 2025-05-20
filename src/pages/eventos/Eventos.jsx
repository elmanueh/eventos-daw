import { EVENTOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useEventos } from '@/hooks/useEventos'
import FilterEventos from '@components/filters/FilterEventos'
import GroupCards from '@components/GroupCards'
import Loading from '@pages/Loading'
import { useCallback, useEffect, useState } from 'react'

export default function Eventos() {
  const { eventos, loading } = useEventos(EVENTOS_REDUCER.ALL)
  const [eventosFiltrados, setEventosFiltrados] = useState(eventos)

  useEffect(() => {
    setEventosFiltrados(eventos)
  }, [eventos])

  const handleFiltroChange = useCallback((eventosFiltrados) => {
    setEventosFiltrados(eventosFiltrados)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="d-flex flex-column align-items-center">
      <header className="text-center">
        <h1 className="text-primary fw-bold">Eventos</h1>
      </header>

      <FilterEventos eventos={eventos} callback={handleFiltroChange} />

      <GroupCards
        items={eventosFiltrados}
        type={TARJETA_TIPOS.EVENTOS}
        paginator
      />
    </div>
  )
}
