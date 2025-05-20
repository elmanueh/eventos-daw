import { ESPACIOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useEspacios } from '@/hooks/useEspacios'
import {
  obtenerEspaciosActivos,
  obtenerEspaciosCerrados
} from '@/utils/espacioHelper'
import FilterEspacios from '@components/filters/FilterEspacios'
import GroupCards from '@components/GroupCards'
import EspacioModal from '@components/modals/EspacioModal'
import MyToast, { useToast } from '@components/toast/MyToast'
import Loading from '@pages/Loading'

import { useCallback, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

export default function MisEspacios() {
  const { espacios, loading, addEspacio, updateEspacio, updateEspacioStatus } =
    useEspacios(ESPACIOS_REDUCER.BY_PROPIETARIO)
  const [espaciosFiltrados, setEspaciosFiltrados] = useState(espacios)
  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const { addToast, toasts, removeToast } = useToast()

  useEffect(() => {
    setEspaciosFiltrados(espacios)
  }, [espacios])

  const handleFiltroChange = useCallback((espaciosFiltrados) => {
    setEspaciosFiltrados(espaciosFiltrados)
  }, [])

  const handleAddEspacio = (espacio) => {
    try {
      addEspacio(espacio)
      setShowEspacioModal(false)
      addToast(
        'Espacio creado',
        'El espacio ha sido creado correctamente',
        'success'
      )
    } catch {
      addToast('Error', `No se pudo crear el espacio`, 'error')
    }
  }

  const espaciosActivos = obtenerEspaciosActivos(espaciosFiltrados)
  const espaciosCerrados = obtenerEspaciosCerrados(espaciosFiltrados)
  if (loading) return <Loading />

  return (
    <Container className="d-flex flex-column p-0 gap-3">
      <MyToast toasts={toasts} removeToast={removeToast} />
      <EspacioModal
        show={showEspacioModal}
        onHide={() => setShowEspacioModal(false)}
        callback={handleAddEspacio}
      />

      <h1 className="text-center">Mis Espacios</h1>

      <Button className="ms-auto" onClick={() => setShowEspacioModal(true)}>
        Crear Espacio
      </Button>

      <FilterEspacios espacios={espacios} callback={handleFiltroChange} />

      {espaciosActivos.length > 0 && (
        <>
          <h3>Activos</h3>
          <GroupCards
            objetos={espaciosActivos}
            tipo={TARJETA_TIPOS.ESPACIOS}
            visible={true}
            action={{ updateEspacio, updateEspacioStatus }}
            addToast={addToast}
          />
        </>
      )}

      {espaciosCerrados.length > 0 && (
        <>
          <h3>Cerrados Temporalmente</h3>
          <GroupCards
            objetos={espaciosCerrados}
            tipo={TARJETA_TIPOS.ESPACIOS}
            visible={true}
          />
        </>
      )}
    </Container>
  )
}
