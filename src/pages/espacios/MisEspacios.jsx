import { tipoTarjeta } from '@/configs/constant'
import GroupCards from '@components/GroupCards'
import { Button, Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router'

export default function MisEspacios() {
  const espacios = useLoaderData().espacio.map((espacio) => espacio.espacioDTO)

  const espaciosActivos = espacios.filter(
    (espacio) => espacio.estado === 'ACTIVO'
  )
  const espaciosCerrados = espacios.filter(
    (espacio) => espacio.estado === 'CERRADO_TEMPORALMENTE'
  )

  return (
    <Container className="py-4 d-flex flex-column gap-2">
      <h1 className="text-center">Mis Espacios</h1>

      <Button variant="primary" className="ms-auto">
        Crear Espacio
      </Button>

      <h3>Activos</h3>
      <GroupCards
        objetos={espaciosActivos}
        tipoTarjeta={tipoTarjeta.ESPACIOS}
        visible={true}
      ></GroupCards>

      <h3>Cerrados Temporalmente</h3>
      <GroupCards
        objetos={espaciosCerrados}
        tipoTarjeta={tipoTarjeta.ESPACIOS}
        visible={true}
      ></GroupCards>
    </Container>
  )
}
