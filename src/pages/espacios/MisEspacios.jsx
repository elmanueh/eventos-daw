import { TARJETA_TIPOS } from '@/configs/constant'
import { handleCrearEspacio } from '@/utils/operations'
import GroupCards from '@components/GroupCards'
import EspacioModal from '@components/modals/EspacioModal'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEspacios() {
  const [showEspacioModal, setShowEspacioModal] = useState(false)
  const initialEspacios = useLoaderData().espacio.map(
    (espacio) => espacio.espacioDTO
  )
  const [espacios, setEspacios] = useState(initialEspacios)

  const espaciosActivos = espacios.filter(
    (espacio) => espacio.estado === 'ACTIVO'
  )
  const espaciosCerrados = espacios.filter(
    (espacio) => espacio.estado === 'CERRADO_TEMPORALMENTE'
  )

  return (
    <Container className="d-flex flex-column p-0 gap-3">
      <EspacioModal
        show={showEspacioModal}
        callback={(espacio) => handleCrearEspacio(espacio, setShowEspacioModal)}
        onHide={() => setShowEspacioModal(false)}
      />
      <h1 className="text-center text-primary fw-bold">Mis Espacios</h1>

      <Button
        variant="primary"
        className="ms-auto"
        onClick={() => setShowEspacioModal(true)}
      >
        Crear Espacio
      </Button>

      <h3 id="titulo1-groupCards">Activos</h3>
      <GroupCards
        objetos={espaciosActivos}
        tipo={TARJETA_TIPOS.ESPACIOS}
        visible={true}
        id="titulo1-groupCards"
      ></GroupCards>

      <h3 id="titulo2-groupCards">Cerrados Temporalmente</h3>
      <GroupCards
        objetos={espaciosCerrados}
        tipo={TARJETA_TIPOS.ESPACIOS}
        visible={true}
        id="titulo2-groupCards"
      ></GroupCards>
    </Container>
  )
}
