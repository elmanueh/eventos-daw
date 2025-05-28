import { ESPACIOS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { TOAST_MESSAGES } from '@/configs/notifications'
import { useEspacios } from '@/hooks/useEspacios'
import { useToast } from '@/hooks/useToast'
import {
  obtenerEspaciosActivos,
  obtenerEspaciosCerrados
} from '@/utils/espacioHelper'
import FilterEspacios from '@components/filters/FilterEspacios'
import GroupCards from '@components/groups/GroupCards'
import EspacioModal from '@components/modals/EspacioModal'
import MyToast from '@components/MyToast'
import { EspacioActionContext } from '@context/EspacioActionContext'
import Loading from '@pages/Loading'

import { useCallback, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

export default function MisEspacios() {
  const { espacios, loading, addEspacio, updateEspacio, updateEspacioStatus } =
    useEspacios(ESPACIOS_REDUCER.BY_PROPIETARIO)
  const [espaciosFiltrados, setEspaciosFiltrados] = useState(espacios)
  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const { toasts, showToast, hideToast } = useToast()

  const handleFiltroChange = useCallback((espaciosFiltrados) => {
    setEspaciosFiltrados(espaciosFiltrados)
  }, [])

  const handleAddEspacio = async (espacio) => {
    try {
      await addEspacio(espacio)
      setShowEspacioModal(false)
      showToast(TOAST_MESSAGES.SPACE.CREATED)
    } catch {
      setShowEspacioModal(false)
      showToast(TOAST_MESSAGES.SPACE.CREATED_ERROR)
    }
  }

  const handleUpdateEspacio = async (id, espacio) => {
    try {
      await updateEspacio(id, espacio)
      showToast(TOAST_MESSAGES.SPACE.UPDATED)
    } catch {
      showToast(TOAST_MESSAGES.SPACE.UPDATED_ERROR)
    }
  }

  const handleUpdateEspacioEstado = async (id, status) => {
    try {
      await updateEspacioStatus(id, status)
      showToast(TOAST_MESSAGES.SPACE.STATUS_UPDATED)
    } catch {
      showToast(TOAST_MESSAGES.SPACE.STATUS_UPDATED_ERROR)
    }
  }

  const espaciosActivos = obtenerEspaciosActivos(espaciosFiltrados)
  const espaciosCerrados = obtenerEspaciosCerrados(espaciosFiltrados)
  if (loading) return <Loading />

  return (
    <Container className="d-flex flex-column p-0 gap-3">
      <MyToast toasts={toasts} hideToast={hideToast} />
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

      <EspacioActionContext.Provider
        value={{
          onUpdate: handleUpdateEspacio,
          onUpdateState: handleUpdateEspacioEstado
        }}
      >
        {espaciosFiltrados.length === 0 && (
          <div className="d-flex flex-column gap-4 w-100">
            <p>No hay espacios disponibles para mostrar.</p>
          </div>
        )}
        {espaciosActivos.length > 0 && (
          <>
            <h3>Activos</h3>
            <GroupCards
              items={espaciosActivos}
              type={TARJETA_TIPOS.ESPACIOS}
              paginator
              actions
            />
          </>
        )}

        {espaciosCerrados.length > 0 && (
          <>
            <h3>Cerrados Temporalmente</h3>
            <GroupCards
              items={espaciosCerrados}
              type={TARJETA_TIPOS.ESPACIOS}
              paginator
              actions
            />
          </>
        )}
      </EspacioActionContext.Provider>
    </Container>
  )
}
