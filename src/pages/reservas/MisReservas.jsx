import { RESERVAS_REDUCER, TARJETA_TIPOS } from '@/configs/constant'
import { useReservas } from '@/hooks/useReservas'
import {
  obtenerReservasActivas,
  obtenerReservasCanceladas,
  obtenerReservasFinalizadas
} from '@/utils/reservaHelper'
import GroupCards from '@components/groups/GroupCards'
import Loading from '@pages/Loading'
import { Container } from 'react-bootstrap'

export default function MisReservas() {
  const { reservas, loading } = useReservas(RESERVAS_REDUCER.BY_USUARIO)

  if (loading) return <Loading />

  const reservasActivas = obtenerReservasActivas(reservas)
  const reservasCanceladas = obtenerReservasCanceladas(reservas)
  const reservasFinalizadas = obtenerReservasFinalizadas(reservas)

  return (
    <Container className="d-flex flex-column gap-3 p-0">
      <h1 className="text-center">Mis Reservas</h1>
      {reservas.length === 0 && (
        <div className="d-flex flex-column gap-4 w-100">
          <p>No has realizado ninguna reserva.</p>
        </div>
      )}
      {reservasActivas.length != 0 && (
        <>
          <h3>Activas</h3>
          <GroupCards
            items={reservasActivas}
            type={TARJETA_TIPOS.RESERVAS}
            paginator
            actions
          />
        </>
      )}

      {reservasCanceladas.length != 0 && (
        <>
          <h3>Canceladas</h3>
          <GroupCards
            items={reservasCanceladas}
            type={TARJETA_TIPOS.RESERVAS}
            paginator
            actions
          />
        </>
      )}

      {reservasFinalizadas.length != 0 && (
        <>
          <h3>Finalizadas</h3>
          <GroupCards
            items={reservasFinalizadas}
            type={TARJETA_TIPOS.RESERVAS}
            paginator
            actions
          />
        </>
      )}
    </Container>
  )
}
