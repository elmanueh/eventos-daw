import { ESPACIOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import FilterEspacios from '@components/filters/FilterEspacios'
import GroupCards from '@components/GroupCards'
import Loading from '@pages/Loading'
import { useCallback, useEffect, useState } from 'react'

export default function Espacios() {
  const { espacios, loading } = useEspacios(ESPACIOS_REDUCER.ALL)
  const [espaciosFiltrados, setEspaciosFiltrados] = useState(espacios)

  useEffect(() => {
    setEspaciosFiltrados(espacios)
  }, [espacios])

  const handleFiltroChange = useCallback((espaciosFiltrados) => {
    setEspaciosFiltrados(espaciosFiltrados)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <header className="text-center">
        <h1 className="text-primary fw-bold">Espacios Físicos</h1>
      </header>

      <FilterEspacios espacios={espacios} callback={handleFiltroChange} />

      <GroupCards objetos={espaciosFiltrados} tipo={TARJETA_TIPOS.ESPACIOS} />
    </div>
  )
}
