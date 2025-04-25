import { tipoTarjeta, urls } from '@/configs/constant'
import { fetchPost } from '@/utils/fetchPost'
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

  const handleCrearEspacio = async (data) => {
    console.log('Espacio creado:', data)
    const response = await fetchPost(urls.CREAR_ESPACIO, data)
    console.log(response.status)
    if (response.ok) {
      const newEspacio = await response.json()
      setEspacios((prevEspacios) => [...prevEspacios, newEspacio])
      setShowEspacioModal(false)
    }
  }

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <EspacioModal
        show={showEspacioModal}
        callback={handleCrearEspacio}
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

      <h3>Activos</h3>
      <GroupCards
        objetos={espaciosActivos}
        tipo={tipoTarjeta.ESPACIOS}
        visible={true}
      ></GroupCards>

      <h3>Cerrados Temporalmente</h3>
      <GroupCards
        objetos={espaciosCerrados}
        tipo={tipoTarjeta.ESPACIOS}
        visible={true}
      ></GroupCards>
    </Container>
  )
}
