import { RESERVAS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useReservas } from '@/hooks/useReservas'
import {
  obtenerReservasActivas,
  obtenerReservasCanceladas,
  obtenerReservasFinalizadas
} from '@/utils/reservaHelper'
import GroupCards from '@components/GroupCards'
import Loading from '@pages/Loading'
import { Container } from 'react-bootstrap'

export default function MisReservas() {
  const { reservas, loading } = useReservas(RESERVAS_REDUCER.BY_USUARIO)

  const idGroupReservasActivas = useId()
  const idGroupReservasCanceladas = useId()
  const idGroupReservasFinalizadas = useId()

  if (loading) return <Loading />

  const reservasActivas = obtenerReservasActivas(reservas)
  const reservasCanceladas = obtenerReservasCanceladas(reservas)
  const reservasFinalizadas = obtenerReservasFinalizadas(reservas)

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <h1 className="text-center">Mis Reservas</h1>

      <h3 id={idGroupReservasActivas}>Activas</h3>
      <GroupCards
        objetos={reservasActivas}
        tipo={TARJETA_TIPOS.RESERVAS}
        id={idGroupReservasActivas}
      ></GroupCards>

      {reservasCanceladas.length != 0 && (
        <>
          <h3 id={idGroupReservasCanceladas}>Canceladas</h3>
          <GroupCards
            objetos={reservasCanceladas}
            tipo={TARJETA_TIPOS.RESERVAS}
            id={idGroupReservasCanceladas}
          ></GroupCards>
        </>
      )}

      {reservasFinalizadas.length != 0 && (
        <>
          <h3 id={idGroupReservasFinalizadas}>Finalizadas</h3>
          <GroupCards
            objetos={reservasFinalizadas}
            tipo={TARJETA_TIPOS.RESERVAS}
            id={idGroupReservasFinalizadas}
          ></GroupCards>
        </>
      )}
    </Container>
  )
}
