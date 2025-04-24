import { tipoTarjeta } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEspacios() {
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

  const handleActualizarEspacios = (espacioActualizado) => {
    setEspacios((prevEspacios) =>
      prevEspacios.map((espacio) =>
        espacio.id === espacioActualizado.id ? espacioActualizado : espacio
      )
    )
  }

  const handleCrearEspacio = () => {
    // Implementar la lógica para crear un nuevo evento
  }

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Espacios</h1>

      <Button
        variant="primary"
        className="ms-auto"
        onClick={handleCrearEspacio}
      >
        Crear Espacio
      </Button>

      <h3>Activos</h3>
      <GroupCards
        objetos={espaciosActivos}
        tipo={tipoTarjeta.ESPACIOS}
        visible={true}
        onActualizar={handleActualizarEspacios}
      ></GroupCards>

      <h3>Cerrados Temporalmente</h3>
      <GroupCards
        objetos={espaciosCerrados}
        tipo={tipoTarjeta.ESPACIOS}
        visible={true}
        onActualizar={handleActualizarEspacios}
      ></GroupCards>
    </Container>
  )
}
